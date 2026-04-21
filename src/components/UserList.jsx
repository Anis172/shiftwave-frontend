import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from './useTranslations.jsx';
import { getErrorKey } from '../utils/errorKeyMap';
import { getRoleKey } from '../utils/translationHelpers';

function UserList() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', roleId: '', isActive: true
    });
    const [filters, setFilters] = useState({
        name: '', email: '', role: '', active: '',
    });

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString && userString !== 'undefined') {
            try {
                setCurrentUser(JSON.parse(userString));
            } catch (err) {
                console.error('Failed to parse user:', err);
            }
        }
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:9090/api/users', {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.sort((a, b) => b.id - a.id));
            }
        } catch (error) { console.error('Error:', error); }
    }, []);

    const fetchRoles = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:9090/api/roles', {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) { console.error('Error:', error); }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            await fetchUsers();
            await fetchRoles();
        };
        loadData();
    }, [fetchUsers, fetchRoles]);

    const resetForm = useCallback(() => {
        setFormData({ name: '', email: '', password: '', roleId: '', isActive: true });
        setError('');
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ FRONTEND VALIDATION (translated!)
        if (!formData.name || formData.name.trim().length < 2) {
            setError(t('nameTooShort'));
            return;
        }

        if (!formData.email) {
            setError(t('emailRequired'));
            return;
        }

        if (!formData.email.includes('@')) {
            setError(t('invalidEmailFormat'));
            return;
        }

        if (!formData.password) {
            setError(t('passwordRequired'));
            return;
        }

        if (formData.password.length < 8) {
            setError(t('passwordTooShort'));
            return;
        }

        if (!formData.roleId) {
            setError(t('roleRequired'));
            return;
        }

        // ✅ BACKEND CALL
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:9090/api/users', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, roleId: parseInt(formData.roleId) })
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            fetchUsers();
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
        if (!formData.name || formData.name.trim().length < 2) {
            setError(t('nameTooShort'));
            return;
        }

        if (!formData.email) {
            setError(t('emailRequired'));
            return;
        }

        if (!formData.email.includes('@')) {
            setError(t('invalidEmailFormat'));
            return;
        }

        if (formData.password && formData.password.length < 8) {
            setError(t('passwordTooShort'));
            return;
        }

        if (!formData.roleId) {
            setError(t('roleRequired'));
            return;
        }

        // ✅ BACKEND CALL
        const token = localStorage.getItem('token');
        const payload = { ...formData, roleId: parseInt(formData.roleId) };
        if (!formData.password) delete payload.password;

        try {
            const response = await fetch(`http://localhost:9090/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            fetchUsers();
            setEditingUser(null);
            resetForm();
        } catch (error) {
            console.error(error);
            setError(t('networkError'));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('confirmDeleteWorker'))) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:9090/api/users/${id}`, {
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

            fetchUsers();
        } catch (error) {
            console.error(error);
            alert(t('networkError'));
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:9090/api/users/${id}/toggle-active`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                alert(errorKey ? t(errorKey) : errorData.error);
                return;
            }

            fetchUsers();
        } catch (error) {
            console.error(error);
            alert(t('networkError'));
        }
    };

    const filteredUsers = useMemo(() => {
        return users
            .filter((u) => u.id !== currentUser?.id)
            .filter((u) => {
                return (filters.name === "" || u.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                    (filters.email === "" || u.email.toLowerCase().includes(filters.email.toLowerCase())) &&
                    (filters.role === "" || u.role.id.toString() === filters.role) &&
                    (filters.active === "" || (filters.active === "ACTIVE" && u.isActive) || (filters.active === "NOTACTIVE" && !u.isActive));
            });
    }, [users, filters, currentUser]);

    if (showCreateForm || editingUser) {
        return (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-white mb-6">
                    {editingUser ? `✏️ ${t('editWorker')}` : `👤 ${t('createNewWorker')}`}
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

                <form onSubmit={editingUser ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">{t('name')}</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">{t('email')}</label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">
                            {t('password')} {editingUser && <span className="opacity-50 text-[10px]">({t('passwordOptional')})</span>}
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest px-1">{t('role')}</label>
                        <select
                            value={formData.roleId}
                            onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                            className="w-full px-4 py-3 bg-primary-800 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                        >
                            <option value="">{t('selectRole')}</option>
                            {roles.map(r => <option key={r.id} value={r.id} className="bg-primary-800">{t(getRoleKey(r.name))}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-4 md:col-span-2 pt-4">
                        <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-success to-success/80 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                            {editingUser ? t('update') : t('create')}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setEditingUser(null); setShowCreateForm(false); resetForm(); }}
                            className="flex-1 py-4 bg-white/5 text-white/60 font-black rounded-2xl uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-success to-success/80 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-success/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                    {t('addNewWorker')}
                </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-2xl">
                <input type="text" placeholder={t('searchName')} value={filters.name} onChange={(e) => setFilters({...filters, name: e.target.value})} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                <input type="text" placeholder={t('searchEmail')} value={filters.email} onChange={(e) => setFilters({...filters, email: e.target.value})} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                <select
                    value={filters.role}
                    onChange={(e) => setFilters({...filters, role: e.target.value})}
                    className="px-5 py-3 bg-primary-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                    <option value="" className="bg-primary-800">{t('allRoles')}</option>
                    {roles.map(r => <option key={r.id} value={r.id} className="bg-primary-800">{t(getRoleKey(r.name))}</option>)}
                </select>
                <select
                    value={filters.active}
                    onChange={(e) => setFilters({...filters, active: e.target.value})}
                    className="px-5 py-3 bg-primary-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                    <option value="" className="bg-primary-800">{t('allStatus')}</option>
                    <option value="ACTIVE" className="bg-primary-800">{t('active')}</option>
                    <option value="NOTACTIVE" className="bg-primary-800">{t('inactive')}</option>
                </select>
            </div>

            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-[11px] font-black text-white/50 uppercase tracking-[0.2em]">
                    <tr>
                        <th className="px-8 py-6">{t('name')}</th>
                        <th className="px-8 py-6">{t('email')}</th>
                        <th className="px-8 py-6">{t('role')}</th>
                        <th className="px-8 py-6">{t('status')}</th>
                        <th className="px-8 py-6 text-right">{t('actions')}</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white">
                    {filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-white/5 transition-all">
                            <td className="px-8 py-5 font-bold">{u.name}</td>
                            <td className="px-8 py-5 text-glow-violet">{u.email}</td>
                            <td className="px-8 py-5 font-medium">{t(getRoleKey(u.role.name))}</td>
                            <td className="px-8 py-5">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${u.isActive ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'}`}>
                                    {u.isActive ? t('active') : t('inactive')}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-right flex justify-end gap-2">
                                <button onClick={() => { setEditingUser(u); setFormData({ name: u.name, email: u.email, password: '', roleId: u.role.id, isActive: u.isActive }); }} className="p-2.5 bg-warning/10 text-warning border border-warning/20 rounded-xl hover:bg-warning/20 transition-all">✏️</button>
                                <button onClick={() => handleToggleActive(u.id)} className="p-2.5 bg-dream-cyan/10 text-dream-cyan border border-dream-cyan/20 rounded-xl hover:bg-dream-cyan/20 transition-all">{u.isActive ? '🔒' : '🔓'}</button>
                                <button onClick={() => handleDelete(u.id)} className="p-2.5 bg-danger/10 text-danger border border-danger/20 rounded-xl hover:bg-danger/20 transition-all">🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {filteredUsers.map(u => (
                    <div key={u.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 space-y-4 shadow-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-xl font-bold text-white leading-none">{u.name}</h4>
                                <p className="text-glow-violet text-xs font-medium mt-1">{u.email}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${u.isActive ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'}`}>
                                {u.isActive ? t('active') : t('inactive')}
                            </span>
                        </div>
                        <div className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary-500/20 w-fit">
                            {t(getRoleKey(u.role.name))}
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button onClick={() => { setEditingUser(u); setFormData({ name: u.name, email: u.email, password: '', roleId: u.role.id, isActive: u.isActive }); }} className="flex-1 py-3 bg-warning/10 text-warning border border-warning/20 rounded-xl font-bold uppercase text-[10px] tracking-widest">{t('edit')}</button>
                            <button onClick={() => handleToggleActive(u.id)} className="flex-1 py-3 bg-dream-cyan/10 text-dream-cyan border border-dream-cyan/20 rounded-xl font-bold uppercase text-[10px] tracking-widest">{u.isActive ? t('deactivate') : t('activate')}</button>
                            <button onClick={() => handleDelete(u.id)} className="px-4 py-3 bg-danger/10 text-danger border border-danger/20 rounded-xl">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;