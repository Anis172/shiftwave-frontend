import { useState } from 'react';
import { useTranslation } from './useTranslations.jsx';
import { getErrorKey } from '../utils/errorKeyMap';  // ← ADD THIS!
import LanguageSwitcher from './LanguageSwitcher.jsx';
import API_BASE_URL from '../config/api';


function Login({ onLoginSuccess, onSwitchToSignup }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                throw new Error(errorKey ? t(errorKey) : errorData.error);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };
            localStorage.setItem('user', JSON.stringify(userData));
            onLoginSuccess(userData);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dreamy-purple flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-dream-pink/20"></div>

            <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-glow-violet rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-dream-pink rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="flex justify-end mb-4">
                        <LanguageSwitcher />
                    </div>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
                            <img src="/logo.png" alt="ShiftWave" className="w-20 h-20 animate-float" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{t('welcome')}</h2>
                        <p className="text-glow-violet">{t('manageShifts')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('email')}
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                {t('password')}
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-danger/20 border border-danger/50 text-white px-4 py-3 rounded-xl backdrop-blur-sm animate-shake">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-500 to-dream-pink text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-600 hover:to-dream-pink/90 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{t('signingIn')}</span>
                                </div>
                            ) : (
                                t('signIn')
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-white/80 hover:text-white transition-colors duration-200"
                            >
                                {t('noAccount')} <span className="font-semibold">{t('registerHere')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;