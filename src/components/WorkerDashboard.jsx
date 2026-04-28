import { useState, useEffect, useCallback } from 'react';
import BreakRequestForm from './BreakRequestForm';
import { useTranslation } from './useTranslations.jsx';
import { getRoleKey } from '../utils/translationHelpers';
import API_BASE_URL from '../config/api';


function WorkerDashboard() {
    const { t } = useTranslation();
    const [shifts, setShifts] = useState([]);
    const [user, setUser] = useState(null);
    const [showEarlyClockOutModal, setShowEarlyClockOutModal] = useState(false);
    const [showEarlyClockInModal, setShowEarlyClockInModal] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString && userString !== 'undefined') {
            try {
                setUser(JSON.parse(userString));
            } catch (err) {
                console.error('Failed to parse user:', err);
                localStorage.clear();
                window.location.reload();
            }
        }
    }, []);

    const fetchShifts = useCallback(async () => {
        if (!user) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/shifts/worker/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setShifts(data);
            }
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    }, [user]);

    useEffect(() => {
        fetchShifts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const calculateTimeUntilStart = (scheduledStart) => {
        const now = new Date();
        const start = new Date(scheduledStart);
        const diff = start - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { hours, minutes };
    };

    const handleClockIn = async (shift) => {
        const now = new Date();
        const scheduledStart = new Date(shift.scheduledStart);

        if (now < scheduledStart) {
            setSelectedShift(shift);
            setShowEarlyClockInModal(true);
            return;
        }

        await confirmClockIn(shift.id);
    };

    const confirmClockIn = async (shiftId) => {
        try {
            const token = localStorage.getItem('token');
            console.log('🔍 Attempting clock in...');
            console.log('Shift ID:', shiftId);
            console.log('URL:', `${API_BASE_URL}/api/shifts/${shiftId}/clock-in`);

            const response = await fetch(`${API_BASE_URL}/api/shifts/${shiftId}/clock-in`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response OK:', response.ok);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log('✅ Clock in successful!');
                fetchShifts();
            } else {
                console.error('❌ Clock in failed:', data);
                alert('Clock in failed: ' + (data.error || JSON.stringify(data)));
            }
        } catch (error) {
            console.error('❌ Error clocking in:', error);
            alert('Error: ' + error.message);
        }
    };

    const calculateTimeRemaining = (scheduledEnd) => {
        const now = new Date();
        const end = new Date(scheduledEnd);
        const diff = end - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { hours, minutes };
    };

    const handleClockOut = async (shift) => {
        const now = new Date();
        const scheduledEnd = new Date(shift.scheduledEnd);

        if (now < scheduledEnd) {
            setSelectedShift(shift);
            setShowEarlyClockOutModal(true);
            return;
        }

        await confirmClockOut(shift.id);
    };

    const confirmClockOut = async (shiftId) => {
        try {
            const token = localStorage.getItem('token');
            console.log('🔍 Attempting clock out...');
            console.log('Shift ID:', shiftId);
            console.log('URL:', `${API_BASE_URL}/api/shifts/${shiftId}/clock-out`);

            const response = await fetch(`${API_BASE_URL}/api/shifts/${shiftId}/clock-out`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response OK:', response.ok);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log('✅ Clock out successful!');
                fetchShifts();
            } else {
                console.error('❌ Clock out failed:', data);
                alert('Clock out failed: ' + (data.error || JSON.stringify(data)));
            }
        } catch (error) {
            console.error('❌ Error clocking out:', error);
            alert('Error: ' + error.message);
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        return new Date(dateTime).toLocaleString('en-GB', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dream-pink/80 p-6 flex items-center justify-center">
                <div className="text-white text-xl">{t('loading')}</div>
            </div>
        );
    }

    const scheduledShifts = shifts.filter(s => s.status === 'SCHEDULED');
    const activeShifts = shifts.filter(s => s.status === 'ACTIVE');

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dream-pink/80 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-dream-pink rounded-xl flex items-center justify-center animate-glow">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{t('workerDashboard')}</h1>
                            <p className="text-glow-violet">{t('welcomeBack')}, {user.name}!</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {scheduledShifts.length > 0 && (
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {t('yourScheduledShifts')}
                            </h3>
                            <div className="space-y-3">
                                {scheduledShifts.map(shift => (
                                    <div key={shift.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all duration-200">
                                        <div className="flex-1">
                                            <div className="text-white font-semibold text-lg">{t(getRoleKey(shift.role.name))}</div>
                                            <div className="text-glow-violet text-sm mt-1">
                                                {formatDateTime(shift.scheduledStart)} → {formatDateTime(shift.scheduledEnd)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleClockIn(shift)}
                                            className="bg-gradient-to-r from-success to-success/80 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-success/50 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('clockIn')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeShifts.length > 0 && (
                        <div className="bg-success/10 backdrop-blur-xl rounded-2xl border border-success/30 p-6 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                {t('currentlyWorking')}
                            </h3>
                            <div className="space-y-3">
                                {activeShifts.map(shift => (
                                    <div key={shift.id} className="bg-white/5 rounded-xl p-4 border border-success/20 flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="text-white font-semibold text-lg">{t(getRoleKey(shift.role.name))}</div>
                                            <div className="text-success text-sm mt-1">
                                                {t('clockedIn')}: {formatDateTime(shift.clockInTime)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleClockOut(shift)}
                                            className="bg-gradient-to-r from-warning to-warning/80 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-warning/50 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('clockOut')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {shifts.length === 0 && (
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center shadow-2xl">
                            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-white font-semibold mb-2">{t('noShiftsScheduled')}</p>
                            <p className="text-white/60">{t('checkBackLater')}</p>
                        </div>
                    )}

                    <BreakRequestForm workerId={user.id} />
                </div>
            </div>

            {/* ✅ Early Clock-IN Modal - MOBILE OPTIMIZED */}
            {showEarlyClockInModal && selectedShift && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-danger/20 rounded-xl flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-white">🚫 {t('cannotClockInYet')}</h3>
                        </div>

                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            <p className="text-white/90 text-sm sm:text-base">{t('pleaseWait')}</p>

                            <div className="bg-white/5 rounded-xl p-3 space-y-1.5 sm:space-y-2">
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('shiftStartsAt')}:</span>
                                    <span className="text-white font-semibold text-right">{formatDateTime(selectedShift.scheduledStart)}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('currentTime')}:</span>
                                    <span className="text-white font-semibold text-right">{formatDateTime(new Date())}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('timeUntilStart')}:</span>
                                    <span className="text-danger font-semibold">
                                        {(() => {
                                            const { hours, minutes } = calculateTimeUntilStart(selectedShift.scheduledStart);
                                            return `${hours}h ${minutes}min`;
                                        })()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowEarlyClockInModal(false);
                                setSelectedShift(null);
                            }}
                            className="w-full bg-gradient-to-r from-primary-500 to-dream-pink text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-200 text-sm sm:text-base"
                        >
                            {t('okIllWait')}
                        </button>
                    </div>
                </div>
            )}

            {/* ✅ Early Clock-OUT Modal - MOBILE OPTIMIZED */}
            {showEarlyClockOutModal && selectedShift && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning/20 rounded-xl flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-white">⚠️ {t('earlyClockOutWarning')}</h3>
                        </div>

                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            <p className="text-white/90 text-sm sm:text-base">{t('clockingOutEarly')}</p>

                            <div className="bg-white/5 rounded-xl p-3 space-y-1.5 sm:space-y-2">
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('scheduledEndTime')}:</span>
                                    <span className="text-white font-semibold text-right">{formatDateTime(selectedShift.scheduledEnd)}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('currentTime')}:</span>
                                    <span className="text-white font-semibold text-right">{formatDateTime(new Date())}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm gap-2">
                                    <span className="text-white/60">{t('timeRemaining')}:</span>
                                    <span className="text-warning font-semibold">
                                        {(() => {
                                            const { hours, minutes } = calculateTimeRemaining(selectedShift.scheduledEnd);
                                            return `${hours}h ${minutes}min`;
                                        })()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-white/70 text-xs sm:text-sm">{t('sureClockOutNow')}</p>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                            <button
                                onClick={() => {
                                    setShowEarlyClockOutModal(false);
                                    setSelectedShift(null);
                                }}
                                className="flex-1 bg-white/10 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-6 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm sm:text-base"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={() => {
                                    confirmClockOut(selectedShift.id);
                                    setShowEarlyClockOutModal(false);
                                    setSelectedShift(null);
                                }}
                                className="flex-1 bg-gradient-to-r from-warning to-warning/80 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-6 rounded-xl hover:shadow-lg hover:shadow-warning/50 transition-all duration-200 text-sm sm:text-base"
                            >
                                {t('clockOut')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkerDashboard;
