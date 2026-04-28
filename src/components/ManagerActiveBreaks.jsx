import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from './useTranslations.jsx';
import API_BASE_URL from '../config/api';

function ManagerActiveBreaks() {
    const { t } = useTranslation();
    const [activeBreaks, setActiveBreaks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActiveBreaks = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/status/ACTIVE`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setActiveBreaks(data);  // ← SIMPLIFIED!
            }
        } catch (error) {
            console.error('Error fetching active breaks:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchActiveBreaks();

        const interval = setInterval(fetchActiveBreaks, 30000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl">
                <div className="flex items-center justify-center gap-2 text-white">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('loadingActiveBreaks')}
                </div>
            </div>
        );
    }

    if (activeBreaks.length === 0) {
        return (
            <div className="bg-success/10 backdrop-blur-xl rounded-2xl border border-success/30 p-6 mb-6 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{t('noActiveBreaks')}</h3>
                        <p className="text-success text-sm">{t('allWorkersOnDuty')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-warning/10 backdrop-blur-xl rounded-2xl border border-warning/30 p-6 mb-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                {t('activeBreaks')} ({activeBreaks.length})
            </h3>

            <div className="space-y-3">
                {activeBreaks.map((breakReq) => (
                    <div key={breakReq.id} className="bg-white/5 rounded-xl p-4 border border-warning/20 flex items-center justify-between hover:bg-white/10 transition-all duration-200">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{getBreakIcon(breakReq.breakType)}</span>
                            <div>
                                <div className="text-white font-semibold">
                                    {breakReq.worker.name}
                                </div>
                                <div className="text-warning text-sm">
                                    {breakReq.breakType} {t('break')}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/60 text-xs">{t('endsAt')}</div>
                            <div className="text-warning font-bold text-lg">
                                {formatTime(breakReq.endTime)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagerActiveBreaks;
