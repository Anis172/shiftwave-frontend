import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from './useTranslations.jsx';
import API_BASE_URL from '../config/api';

function BreakRequestForm({ workerId }) {
    const { t } = useTranslation();
    const [shifts, setShifts] = useState([]);
    const [activeBreaks, setActiveBreaks] = useState([]);
    const [formData, setFormData] = useState({
        shiftId: '',
        breakType: 'LUNCH'
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const fetchActiveShifts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/shifts/worker/${workerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const active = data.filter(s => s.status === 'ACTIVE');
                setShifts(active);

                if (active.length > 0) {
                    setFormData(prev => ({ ...prev, shiftId: active[0].id }));
                }
            }
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    }, [workerId]);

    const fetchMyActiveBreaks = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/worker/${workerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                const activeBreaks = data.filter(breakReq => {
                    if (breakReq.status === 'PENDING') return true;
                    if (breakReq.status === 'ACTIVE') return true;
                    if (breakReq.status === 'APPROVED') return true;
                    return false;
                });

                setActiveBreaks(activeBreaks);
            }
        } catch (error) {
            console.error('Error fetching breaks:', error);
        }
    }, [workerId]);

    useEffect(() => {
        fetchActiveShifts();
        fetchMyActiveBreaks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (shifts.length === 0) {
            setMessage(t('mustBeClockedIn'));
            setMessageType('error');
            return;
        }

        const requestBody = {
            workerId: workerId,
            shiftId: formData.shiftId,
            breakType: formData.breakType
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();

                if (data.status === 'APPROVED') {
                    setMessage(t('breakApproved'));
                    setMessageType('success');
                } else if (data.status === 'DENIED') {
                    setMessage(t('breakDenied'));
                    setMessageType('error');
                }

                fetchMyActiveBreaks();
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Request failed');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error requesting break:', error);
            setMessage(t('networkError'));
            setMessageType('error');
        }
    };

    const handleStartBreak = async (breakId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/${breakId}/start`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMessage(t('breakStarted'));
                setMessageType('success');
                fetchMyActiveBreaks();
            }
        } catch (error) {
            console.error('Error starting break:', error);
        }
    };

    const handleCompleteBreak = async (breakId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/${breakId}/complete`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMessage(t('breakCompleted'));
                setMessageType('success');
                fetchMyActiveBreaks();
            }
        } catch (error) {
            console.error('Error completing break:', error);
        }
    };

    const handleDeleteBreak = async (breakId) => {
        if (!window.confirm(t('confirmDeleteBreak'))) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/${breakId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMessage(t('breakRequestDeleted'));
                setMessageType('success');
                fetchMyActiveBreaks();
            } else {
                const error = await response.text();
                setMessage('❌ ' + error);
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error deleting break:', error);
            setMessage(t('errorDeletingBreak'));
            setMessageType('error');
        }
    };

    const formatTime = (dateTime) => {
        if (!dateTime) return '';
        return new Date(dateTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getBreakIcon = (breakType) => {
        switch (breakType) {
            case 'LUNCH': return '🍽️';
            case 'SHORT': return '☕';
            case 'EMERGENCY': return '🚨';
            case 'SICK_LEAVE': return '🤒';
            case 'PERSONAL': return '🚶';
            default: return '⏸️';
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('requestBreak')}
            </h3>

            {activeBreaks.length > 0 && (
                <div className="bg-primary-500/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-primary-500/20">
                    <h4 className="text-white font-semibold mb-3">{t('yourCurrentBreaks')}</h4>
                    <div className="space-y-3">
                        {activeBreaks.map(breakReq => (
                            <div key={breakReq.id} className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-2xl">{getBreakIcon(breakReq.breakType)}</span>
                                    <div>
                                        <div className="text-white font-medium">{breakReq.breakType} {t('break')}</div>
                                        <div className="text-glow-violet text-sm mt-1">
                                            {breakReq.status === 'PENDING' && <>⏳ {t('waitingApproval')}</>}
                                            {breakReq.status === 'ACTIVE' && <>⏰ {t('endsAt')} {formatTime(breakReq.endTime)}</>}
                                            {breakReq.status === 'APPROVED' && <>✅ {t('approvedReadyStart')}</>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {breakReq.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleDeleteBreak(breakReq.id)}
                                            className="px-3 py-1.5 bg-danger/20 text-danger border border-danger/30 rounded-lg text-sm font-medium hover:bg-danger/30 transition-all duration-150"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                    {breakReq.status === 'APPROVED' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleStartBreak(breakReq.id)}
                                                className="px-4 py-2 bg-gradient-to-r from-success to-success/80 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-success/50 transition-all duration-200"
                                            >
                                                ▶️ {t('startButton')}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBreak(breakReq.id)}
                                                className="px-3 py-1.5 bg-danger/20 text-danger border border-danger/30 rounded-lg text-sm font-medium hover:bg-danger/30 transition-all duration-150"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    )}
                                    {breakReq.status === 'ACTIVE' && (
                                        <button
                                            onClick={() => handleCompleteBreak(breakReq.id)}
                                            className="px-4 py-2 bg-gradient-to-r from-warning to-warning/80 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-warning/50 transition-all duration-200"
                                        >
                                            ✅ {t('complete')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {message && (
                <div className={`px-4 py-3 rounded-xl backdrop-blur-sm mb-4 ${
                    messageType === 'success'
                        ? 'bg-success/20 border border-success/50 text-white'
                        : 'bg-danger/20 border border-danger/50 text-white'
                }`}>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                    </div>
                </div>
            )}
            
            {activeBreaks.length > 0 && (
                <div className="px-4 py-3 bg-warning/20 border border-warning/50 text-white rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t('cannotRequestMultipleBreaks')}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {t('yourActiveShift')}
                    </label>
                    {shifts.length === 0 ? (
                        <div className="px-4 py-3 bg-danger/20 border border-danger/50 text-white rounded-xl">
                            {t('mustBeClockedIn')}
                        </div>
                    ) : (
                        <select
                            value={formData.shiftId}
                            onChange={(e) => setFormData({ ...formData, shiftId: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                        >
                            {shifts.map(shift => (
                                <option key={shift.id} value={shift.id} className="bg-primary-900 text-white">
                                    {shift.role.name} - {new Date(shift.scheduledStart).toLocaleDateString()}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {t('breakType')}
                    </label>
                    <select
                        value={formData.breakType}
                        onChange={(e) => setFormData({ ...formData, breakType: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                    >
                        <option value="LUNCH" className="bg-primary-900 text-white">🍽️ {t('lunchBreak')}</option>
                        <option value="SHORT" className="bg-primary-900 text-white">☕ {t('shortBreak')}</option>
                        <option value="EMERGENCY" className="bg-primary-900 text-white">🚨 {t('emergency')}</option>
                        <option value="SICK_LEAVE" className="bg-primary-900 text-white">🤒 {t('sickLeave')}</option>
                        <option value="PERSONAL" className="bg-primary-900 text-white">🚶 {t('personal')}</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={shifts.length === 0 || activeBreaks.length > 0}
                    className="w-full bg-gradient-to-r from-primary-500 to-dream-pink text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                >
                    ✓ {t('requestBreak')}
                </button>
            </form>
        </div>
    );
}

export default BreakRequestForm;
