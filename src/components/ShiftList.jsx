import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CreateShift from './CreateShift';
import EditShift from './EditShift';
import ManagerActiveBreaks from './ManagerActiveBreaks';
import UserList from './UserList';
import CoverageRuleList from './CoverageRuleList';
import BreakHistory from "./BreakHistory.jsx";
import { useTranslation } from './useTranslations.jsx';
import { getStatusKey, getRoleKey } from '../utils/translationHelpers';
import API_BASE_URL from '../config/api';

function ShiftList() {
    const { t } = useTranslation();
    const [shifts, setShifts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingShift, setEditingShift] = useState(null);
    const [reusingShift, setReusingShift] = useState(null);
    const [activeTab, setActiveTab] = useState('shifts');
    const [filters, setFilters] = useState({
        worker: '',
        status: ''
    });

    const fetchShifts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}http://localhost:9090/api/shifts`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const sorted = data.sort((a, b) => b.id - a.id);
                setShifts(sorted);
            }
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    }, []);

    useEffect(() => {
        const loadShifts = async () => {
            await fetchShifts();
        };

        loadShifts();
    }, [fetchShifts]);
    const handleDelete = async (id) => {
        if (!window.confirm(t('confirmDelete') || 'Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/shifts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) fetchShifts();
        } catch (error) {
            console.error('Error deleting shift:', error);
        }
    };

    const handleFormClose = useCallback(() => {
        setShowCreateForm(false);
        setReusingShift(null);
        setEditingShift(null);
        fetchShifts();
    }, [fetchShifts]);

    const filteredShifts = useMemo(() => {
        return shifts.filter((shift) => {
            const matchesWorker = filters.worker === "" || shift.worker.name.toLowerCase().includes(filters.worker.toLowerCase());
            const matchesStatus = filters.status === "" || shift.status === filters.status;
            return matchesWorker && matchesStatus;
        });
    }, [shifts, filters]);

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '--:--';
        return new Date(dateTime).toLocaleString('en-US', {
            month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
        });
    };

    const getStatusBadgeClasses = (status) => {
        const baseClasses = "px-3 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 uppercase tracking-wider border";
        switch (status) {
            case 'ACTIVE': return `${baseClasses} bg-success/20 text-success border-success/30`;
            case 'COMPLETED': return `${baseClasses} bg-gray-500/20 text-gray-400 border-gray-500/30`;
            case 'SCHEDULED': return `${baseClasses} bg-primary-500/20 text-primary-400 border-primary-500/30`;
            case 'CANCELLED': return `${baseClasses} bg-danger/20 text-danger border-danger/30`;
            case 'MISSED': return `${baseClasses} bg-warning/20 text-warning border-warning/30`;
            default: return `${baseClasses} bg-gray-500/20 text-gray-400 border-gray-500/30`;
        }
    };

    if (showCreateForm || reusingShift) {
        return <CreateShift onCancel={() => { setShowCreateForm(false); setReusingShift(null); }} onShiftCreated={handleFormClose} reuseData={reusingShift} />;
    }

    if (editingShift) {
        return <EditShift shift={editingShift} onCancel={() => setEditingShift(null)} onShiftUpdated={handleFormClose} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dream-pink/80 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-dream-pink rounded-xl flex items-center justify-center shadow-lg animate-glow shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{t('managerDashboard')}</h1>
                        <p className="text-glow-violet text-sm">{t('manageAll')}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                    {[
                        {id: 'shifts', label: t('shifts'), icon: '📅'},
                        {id: 'users', label: t('workers'), icon: '👥'},
                        {id: 'coverage', label: t('coverage'), icon: '📏'},
                        {id: 'breaks', label: t('breakHistory'), icon: '⏸️'}
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'bg-white/20 text-white backdrop-blur-xl border border-white/30 shadow-lg'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                            }`}
                        >
                            <span>{tab.icon}</span>{tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'shifts' && (
                    <div className="space-y-6">
                        <ManagerActiveBreaks/>

                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="w-full md:w-auto bg-gradient-to-r from-success to-success/80 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-success/50 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                            {t('createNewShift')}
                        </button>

                        {/* Filters */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder={t('searchWorker')}
                                value={filters.worker}
                                onChange={(e) => setFilters({...filters, worker: e.target.value})}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-400 outline-none transition-all"
                            />
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({...filters, status: e.target.value})}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                            >
                                <option value="" className="bg-primary-900">{t('allStatus')}</option>
                                <option value="SCHEDULED" className="bg-primary-900">{t('statusScheduled')}</option>
                                <option value="ACTIVE" className="bg-primary-900">{t('statusActive')}</option>
                                <option value="COMPLETED" className="bg-primary-900">{t('statusCompleted')}</option>
                                <option value="CANCELLED" className="bg-primary-900">{t('statusCancelled')}</option>
                                <option value="MISSED" className="bg-primary-900">{t('statusMissed')}</option>
                            </select>
                        </div>

                        {/* --- DESKTOP TABLE (Hidden on Mobile) --- */}
                        <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10 font-bold text-white/70 uppercase text-xs tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">{t('worker')}</th>
                                    <th className="px-6 py-4">{t('role')}</th>
                                    <th className="px-6 py-4">{t('start')}</th>
                                    <th className="px-6 py-4">{t('end')}</th>
                                    <th className="px-6 py-4">{t('status')}</th>
                                    <th className="px-6 py-4 text-right">{t('actions')}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white">
                                {filteredShifts.map((shift) => (
                                    <tr key={shift.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-bold">{shift.worker.name}</td>
                                        <td className="px-6 py-4 text-glow-violet">{t(getRoleKey(shift.role.name))}</td>
                                        <td className="px-6 py-4 text-sm">{formatDateTime(shift.clockInTime || shift.scheduledStart)}</td>
                                        <td className="px-6 py-4 text-sm">{formatDateTime(shift.clockOutTime || shift.scheduledEnd)}</td>
                                        <td className="px-6 py-4"><span className={getStatusBadgeClasses(shift.status)}>{t(getStatusKey(shift.status))}</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                {(shift.status === 'SCHEDULED' || shift.status === 'COMPLETED') && (
                                                    <button onClick={() => setReusingShift(shift)} className="p-2 bg-dream-cyan/20 text-dream-cyan rounded-lg border border-dream-cyan/30 hover:bg-dream-cyan/30 transition-all">{t('reuse')}</button>
                                                )}
                                                {shift.status === 'SCHEDULED' && (
                                                    <>
                                                        <button onClick={() => setEditingShift(shift)} className="p-2 bg-primary-500/20 text-primary-300 rounded-lg border border-primary-500/30 hover:bg-primary-500/30 transition-all">{t('edit')}</button>
                                                        <button onClick={() => handleDelete(shift.id)} className="p-2 bg-danger/20 text-danger rounded-lg border border-danger/30 hover:bg-danger/30 transition-all">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --- MOBILE CARDS (Hidden on PC) --- */}
                        <div className="lg:hidden space-y-4">
                            {filteredShifts.map((shift) => (
                                <div key={shift.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white leading-tight">{shift.worker.name}</h3>
                                            <p className="text-glow-violet text-xs font-bold uppercase">{t(getRoleKey(shift.role.name))}</p>
                                        </div>
                                        <span className={getStatusBadgeClasses(shift.status)}>{t(getStatusKey(shift.status))}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-black">{t('start')}</p>
                                            <p className="text-white font-mono font-bold text-sm">{formatDateTime(shift.clockInTime || shift.scheduledStart)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-black">{t('end')}</p>
                                            <p className="text-white font-mono font-bold text-sm">{formatDateTime(shift.clockOutTime || shift.scheduledEnd)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {(shift.status === 'SCHEDULED' || shift.status === 'COMPLETED') && (
                                            <button onClick={() => setReusingShift(shift)} className="flex-1 py-3 bg-dream-cyan/20 text-dream-cyan border border-dream-cyan/30 rounded-xl text-xs font-bold uppercase">{t('reuse')}</button>
                                        )}
                                        {shift.status === 'SCHEDULED' && (
                                            <>
                                                <button onClick={() => setEditingShift(shift)} className="flex-1 py-3 bg-primary-500/20 text-primary-300 border border-primary-500/30 rounded-xl text-xs font-bold uppercase">{t('edit')}</button>
                                                <button onClick={() => handleDelete(shift.id)} className="px-4 py-3 bg-danger/20 text-danger border border-danger/30 rounded-xl">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'users' && <UserList/>}
                {activeTab === 'coverage' && <CoverageRuleList/>}
                {activeTab === 'breaks' && <BreakHistory/>}
            </div>
        </div>
    );
}

export default ShiftList;