import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from './useTranslations.jsx';
import API_BASE_URL from '../config/api';

function BreakHistory() {
    const { t } = useTranslation();
    const [breaks, setBreaks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Stable Fetcher to satisfy the linter
    const fetchBreakHistory = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/break-requests/history`, {  // ← CHANGE THIS LINE
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setBreaks(data);
            }
        } catch (error) {
            console.error('Error fetching break history:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // ... rest of the file stays the same
    useEffect(() => {
        fetchBreakHistory();
    }, [fetchBreakHistory]);

    // 2. Formatting Helpers
    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        return new Date(dateTime).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const calculateDuration = (start, end) => {
        if (!start || !end) return 'N/A';
        const startTime = new Date(start);
        const endTime = new Date(end);
        const diffMs = endTime - startTime;
        const diffMins = Math.round(diffMs / 60000);

        if (diffMins < 60) {
            return `${diffMins} ${t('min')}`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return `${hours}${t('h')} ${mins}${t('m')}`;
        }
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

    const getBreakTypeColor = (breakType) => {
        switch (breakType) {
            case 'LUNCH': return 'bg-success/20 text-success border-success/30';
            case 'SHORT': return 'bg-dream-cyan/20 text-dream-cyan border-dream-cyan/30';
            case 'EMERGENCY': return 'bg-danger/20 text-danger border-danger/30';
            case 'SICK_LEAVE': return 'bg-warning/20 text-warning border-warning/30';
            case 'PERSONAL': return 'bg-primary-500/20 text-primary-400 border-primary-500/30';
            default: return 'bg-white/20 text-white border-white/30';
        }
    };

    // LOADING STATE
    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-12 shadow-2xl flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-12 h-12 border-4 border-t-primary-500 border-white/10 rounded-full animate-spin"></div>
                <p className="text-white/60 font-black uppercase tracking-widest text-xs">{t('loadingBreakHistory')}</p>
            </div>
        );
    }

    // EMPTY STATE
    if (breaks.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-20 text-center shadow-2xl">
                <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-white text-xl font-bold">{t('noBreakHistory')}</p>
                <p className="text-white/40 mt-2">{t('noCompletedBreaks')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 px-2">
                <span className="p-3 bg-white/10 rounded-2xl">🕒</span>
                {t('breakHistoryTitle')} <span className="text-primary-400">({breaks.length})</span>
            </h3>

            {/* PC TABLE VIEW */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 border-b border-white/10 text-[11px] font-black text-white/50 uppercase tracking-[0.2em]">
                    <tr>
                        <th className="px-8 py-6">{t('worker')}</th>
                        <th className="px-8 py-6">{t('type')}</th>
                        <th className="px-8 py-6">{t('startTime')}</th>
                        <th className="px-8 py-6">{t('endTime')}</th>
                        <th className="px-8 py-6 text-right">{t('duration')}</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white">
                    {breaks.map((breakReq) => (
                        <tr key={breakReq.id} className="hover:bg-white/5 transition-all">
                            <td className="px-8 py-5 font-bold">{breakReq.workerName}</td>
                            <td className="px-8 py-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-2 w-fit ${getBreakTypeColor(breakReq.breakType)}`}>
                                        <span>{getBreakIcon(breakReq.breakType)}</span>
                                        {t(breakReq.breakType.toLowerCase())}
                                    </span>
                            </td>
                            <td className="px-8 py-5 text-white/60 text-sm font-medium">{formatDateTime(breakReq.startTime)}</td>
                            <td className="px-8 py-5 text-white/60 text-sm font-medium">{formatDateTime(breakReq.endTime)}</td>
                            <td className="px-8 py-5 text-right font-black text-glow-violet text-lg">
                                {calculateDuration(breakReq.startTime, breakReq.endTime)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {breaks.map((breakReq) => (
                    <div key={breakReq.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 space-y-4 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold text-white">{breakReq.workerName}</h4>
                                <span className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase border flex items-center gap-2 w-fit ${getBreakTypeColor(breakReq.breakType)}`}>
                                    <span>{getBreakIcon(breakReq.breakType)}</span>
                                    {t(breakReq.breakType.toLowerCase())}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t('duration')}</p>
                                <p className="text-glow-violet font-black text-lg">{calculateDuration(breakReq.startTime, breakReq.endTime)}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-white/40 font-bold uppercase">{t('start')}</span>
                                <span className="text-white/80 font-medium">{formatDateTime(breakReq.startTime)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-white/40 font-bold uppercase">{t('end')}</span>
                                <span className="text-white/80 font-medium">{formatDateTime(breakReq.endTime)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BreakHistory;