import { useState, useEffect } from 'react';
import { useTranslation } from './useTranslations.jsx';
import { getErrorKey } from '../utils/errorKeyMap';
import { getRoleKey } from '../utils/translationHelpers';

function EditShift({ shift, onShiftUpdated, onCancel }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        workerId: shift.worker.id,
        roleId: shift.role.id,
        scheduledStart: shift.scheduledStart,
        scheduledEnd: shift.scheduledEnd,
        status: shift.status
    });
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsersAndRoles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUsersAndRoles = async () => {
        try {
            const token = localStorage.getItem('token');

            const [usersRes, rolesRes] = await Promise.all([
                fetch('http://localhost:9090/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:9090/api/roles', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            const usersData = await usersRes.json();
            const rolesData = await rolesRes.json();

            setUsers(usersData);
            setRoles(rolesData);
        } catch {
            setError(t('networkError'));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // ✅ FRONTEND VALIDATION (translated!)
        if (!formData.workerId) {
            setError(t('workerRequired'));
            setLoading(false);
            return;
        }

        if (!formData.roleId) {
            setError(t('roleRequired'));
            setLoading(false);
            return;
        }

        if (!formData.scheduledStart) {
            setError(t('startTimeRequired'));
            setLoading(false);
            return;
        }

        if (!formData.scheduledEnd) {
            setError(t('endTimeRequired'));
            setLoading(false);
            return;
        }

        // Check end time is after start time
        const start = new Date(formData.scheduledStart);
        const end = new Date(formData.scheduledEnd);

        if (end <= start) {
            setError(t('endTimeBeforeStart'));
            setLoading(false);
            return;
        }

        // ✅ BACKEND CALL
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:9090/api/shifts/${shift.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workerId: formData.workerId,
                    roleId: formData.roleId,
                    scheduledStart: formData.scheduledStart,
                    scheduledEnd: formData.scheduledEnd,
                    status: formData.status
                })
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                setLoading(false);
                return;
            }

            onShiftUpdated();
        } catch (err) {
            console.error('Edit shift error:', err);
            setError(t('networkError'));
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dream-pink/80 p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-xl flex items-center justify-center animate-glow">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{t('editShift')}</h3>
                    </div>

                    {error && (
                        <div className="bg-danger/20 border border-danger/50 text-white px-4 py-3 rounded-xl backdrop-blur-sm mb-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('worker')}
                            </label>
                            <select
                                value={formData.workerId}
                                onChange={(e) => setFormData({ ...formData, workerId: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                            >
                                {users.map(user => (
                                    <option key={user.id} value={user.id} className="bg-primary-900 text-white">
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('role')}
                            </label>
                            <select
                                value={formData.roleId}
                                onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                            >
                                {roles.map(role => (
                                    <option key={role.id} value={role.id} className="bg-primary-900 text-white">
                                        {t(getRoleKey(role.name))}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('startTime')}
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.scheduledStart}
                                onChange={(e) => setFormData({ ...formData, scheduledStart: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors [color-scheme:dark]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('endTime')}
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.scheduledEnd}
                                onChange={(e) => setFormData({ ...formData, scheduledEnd: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors [color-scheme:dark]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('status')}
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                            >
                                <option value="SCHEDULED" className="bg-primary-900 text-white">{t('statusScheduled')}</option>
                                <option value="ACTIVE" className="bg-primary-900 text-white">{t('statusActive')}</option>
                                <option value="COMPLETED" className="bg-primary-900 text-white">{t('statusCompleted')}</option>
                                <option value="CANCELLED" className="bg-primary-900 text-white">{t('statusCancelled')}</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-success to-success/80 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-success/50 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>{t('updating')}</span>
                                    </div>
                                ) : (
                                    `✓ ${t('updateShift')}`
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 bg-white/10 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 border border-white/20"
                            >
                                ✕ {t('cancel')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditShift;