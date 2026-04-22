import { useState } from 'react';
import { useTranslation } from './useTranslations.jsx';
import { getErrorKey } from '../utils/errorKeyMap';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import API_BASE_URL from '../config/api';
function RestaurantSignup({ onBackToLogin }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        phone: '',
        ownerName: '',
        ownerEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // ✅ FRONTEND VALIDATION (translated!)

        // Restaurant name
        if (!formData.restaurantName || formData.restaurantName.trim().length < 2) {
            setError(t('restaurantNameLength'));
            setLoading(false);
            return;
        }

        // Address
        if (!formData.address || formData.address.trim().length < 5) {
            setError(t('addressLength'));
            setLoading(false);
            return;
        }

        // Phone
        if (!formData.phone) {
            setError(t('phoneRequired'));
            setLoading(false);
            return;
        }

        // Owner name
        if (!formData.ownerName || formData.ownerName.trim().length < 2) {
            setError(t('nameTooShort'));
            setLoading(false);
            return;
        }

        // Email
        if (!formData.ownerEmail) {
            setError(t('emailRequired'));
            setLoading(false);
            return;
        }

        if (!formData.ownerEmail.includes('@')) {
            setError(t('invalidEmailFormat'));
            setLoading(false);
            return;
        }

        // Password
        if (!formData.password) {
            setError(t('passwordRequired'));
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError(t('passwordTooShort'));
            setLoading(false);
            return;
        }

        // ✅ BACKEND CALL
        try {
            const response = await fetch(`${API_BASE_URL}/api/public/register-restaurant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // ✅ HANDLE BACKEND ERRORS (translated!)
            if (!response.ok) {
                const errorData = await response.json();
                const errorKey = getErrorKey(errorData.error);
                setError(errorKey ? t(errorKey) : errorData.error);
                setLoading(false);
                return;
            }

            // ✅ SUCCESS!
            setSuccess(true);
            setTimeout(() => {
                onBackToLogin();
            }, 3000);

        } catch (err) {
            console.error('Signup error:', err);
            setError(t('networkError'));
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-dreamy-purple flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-dream-pink/20"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('registrationSuccess')}</h2>
                    <p className="text-white/80 mb-4">{t('restaurantRegistered')}</p>
                    <p className="text-glow-violet">{t('redirectingLogin')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dreamy-purple flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-dream-pink/20"></div>

            <div className="relative w-full max-w-2xl">
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
                        <h2 className="text-3xl font-bold text-white mb-2">{t('registerRestaurant')}</h2>
                        <p className="text-glow-violet">{t('joinShiftWave')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">{t('restaurantName')}</label>
                                <input
                                    type="text"
                                    value={formData.restaurantName}
                                    onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                    placeholder="Pizza Palace"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-2">{t('phone')}</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                    placeholder="555-1234"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">{t('address')}</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                placeholder="123 Main Street, City"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">{t('ownerInfo')}</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-2">{t('yourName')}</label>
                                    <input
                                        type="text"
                                        value={formData.ownerName}
                                        onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-2">{t('email')}</label>
                                    <input
                                        type="text"
                                        value={formData.ownerEmail}
                                        onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                        placeholder="owner@restaurant.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-2">{t('password')}</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
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
                                    <span>{t('creatingAccount')}</span>
                                </div>
                            ) : (
                                t('registerButton')
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={onBackToLogin}
                                className="text-white/80 hover:text-white transition-colors duration-200"
                            >
                                {t('alreadyHaveAccount')} <span className="font-semibold">{t('signIn')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantSignup;



