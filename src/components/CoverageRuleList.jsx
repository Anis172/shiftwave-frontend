import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from './useTranslations.jsx';
import { getErrorKey } from '../utils/errorKeyMap';
import { getRoleKey } from '../utils/translationHelpers';
import API_BASE_URL from '../config/api';

function CoverageRuleList() {
    const { t } = useTranslation();
    const [rules, setRules] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        roleId: '',
        minimumWorkers: 1
    });

    const fetchRules = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/coverage-rules`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                setRules(data);
            }
        } catch (error) { console.error('Error fetching rules:', error); }
    }, []);

    const fetchRoles = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/roles`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) { console.error('Error fetching roles:', error); }
    }, []);

    useEffect(() => {
        const initializeData = async () => {
            setLoading(true);
            await Promise.all([fetchRules(), fetchRoles()]);
            setLoading(false);
        };
        initializeData();
    }, [fetchRules, fetchRoles]);

    const sortedRules = useMemo(() => {
        return [...rules].sort((a, b) => b.id - a.id);
    }, [rules]);

    const resetForm = useCallback(() => {
        setFormData({ roleId: '', minimumWorkers: 1 });
        setError('');
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ FRONTEND VALIDATION (translated!)
        if (!formData.roleId) {
            setError(t('roleRequired'));
            return;
        }

        if (!formData.minimumWorkers || formData.minimumWorkers < 1) {
            setError(t('minimumWorkersMin'));
            return;
        }

        // ✅ BACKEND CALL
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/api/coverage-rules`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roleId: parseInt(formData.roleId),
                    minimumWorkers: parseInt(formData.minimumWorkers)
                })
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            await fetchRules();
            setShowCreateForm(false);
            resetForm();
        } catch (error) {
            console.error(error);
            setError(t('networkError'));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ FRONTEND VALIDATION (translated!)
        if (!formData.roleId) {
            setError(t('roleRequired'));
            return;
        }

        if (!formData.minimumWorkers || formData.minimumWorkers < 1) {
            setError(t('minimumWorkersMin'));
            return;
        }

        // ✅ BACKEND CALL
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/api/coverage-rules/${editingRule.id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roleId: parseInt(formData.roleId),
                    minimumWorkers: parseInt(formData.minimumWorkers)
                })
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            await fetchRules();
            setEditingRule(null);
            resetForm();
        } catch (error) {
            console.error(error);
            setError(t('networkError'));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('confirmDeleteCoverageRule'))) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/coverage-rules/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                alert(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            await fetchRules();
        } catch (error) {
            console.error(error);
            alert(t('networkError'));
        }
    };

    const startEdit = (rule) => {
        setEditingRule(rule);
        setFormData({ roleId: rule.role.id, minimumWorkers: rule.minimumWorkers });
        setShowCreateForm(false);
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-12 shadow-2xl flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-12 h-12 border-4 border-t-success border-white/10 rounded-full animate-spin"></div>
                <p className="text-white/60 font-black uppercase tracking-widest text-xs">{t('loading')}</p>
            </div>
        );
    }

    if (showCreateForm || editingRule) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-6 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-500">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    {editingRule ? `✏️ ${t('editCoverageRule')}` : `🛡️ ${t('createCoverageRule')}`}
                </h3>

                {error && (
                    <div className="bg-danger/20 border border-danger/50 text-white px-4 py-3 rounded-xl mb-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={editingRule ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">{t('role')}</label>
                        <select
                            value={formData.roleId}
                            onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                            className="w-full px-4 py-3 bg-primary-800 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                        >
                            <option value="" className="bg-primary-800">{t('selectRole')}</option>
                            {roles.map(r => <option key={r.id} value={r.id} className="bg-primary-800">{t(getRoleKey(r.name))}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">{t('minimumWorkersRequired')}</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.minimumWorkers}
                            onChange={(e) => setFormData({...formData, minimumWorkers: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-4 md:col-span-2 pt-4">
                        <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-success to-success/80 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                            {editingRule ? t('update') : t('create')}
                        </button>
                        <button type="button" onClick={() => { setEditingRule(null); setShowCreateForm(false); resetForm(); }} className="flex-1 py-4 bg-white/5 text-white/60 font-black rounded-2xl uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                            {t('cancel')}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="flex justify-between items-center">
                <button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-success to-success/80 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-success/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                    {t('addNewRule')}
                </button>
            </div>

            {sortedRules.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-20 text-center shadow-2xl animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-white text-xl font-bold">{t('noCoverageRules')}</p>
                    <p className="text-white/40 mt-2">{t('clickAddNewRule')}</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10 text-[11px] font-black text-white/50 uppercase tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-6">{t('role')}</th>
                                <th className="px-8 py-6">{t('minimumWorkers')}</th>
                                <th className="px-8 py-6 text-right">{t('actions')}</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white">
                            {sortedRules.map(rule => (
                                <tr key={rule.id} className="hover:bg-white/5 transition-all">
                                    <td className="px-8 py-5 font-bold">{t(getRoleKey(rule.role.name))}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-4 py-1.5 bg-dream-cyan/20 text-dream-cyan border border-dream-cyan/30 rounded-full text-xs font-black uppercase tracking-wider">
                                            {rule.minimumWorkers} {rule.minimumWorkers === 1 ? t('worker') : t('workers')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                                        <button onClick={() => startEdit(rule)} className="p-2.5 bg-warning/10 text-warning border border-warning/20 rounded-xl hover:bg-warning/20 transition-all">✏️</button>
                                        <button onClick={() => handleDelete(rule.id)} className="p-2.5 bg-danger/10 text-danger border border-danger/20 rounded-xl hover:bg-danger/20 transition-all">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden space-y-4">
                        {sortedRules.map(rule => (
                            <div key={rule.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 space-y-4 shadow-xl animate-in slide-in-from-right-4 duration-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('role')}</p>
                                        <h4 className="text-xl font-bold text-white leading-none">{t(getRoleKey(rule.role.name))}</h4>
                                    </div>
                                    <span className="px-3 py-1 bg-dream-cyan/20 text-dream-cyan border border-dream-cyan/30 rounded-full text-[10px] font-black uppercase">
                                        {rule.minimumWorkers} {rule.minimumWorkers === 1 ? t('worker') : t('workers')}
                                    </span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button onClick={() => startEdit(rule)} className="flex-1 py-3 bg-warning/10 text-warning border border-warning/20 rounded-xl font-bold uppercase text-[10px] tracking-widest">{t('edit')}</button>
                                    <button onClick={() => handleDelete(rule.id)} className="px-4 py-3 bg-danger/10 text-danger border border-danger/20 rounded-xl">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoverageRuleList;
