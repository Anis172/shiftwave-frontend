import { useState, useCallback } from 'react';
import Login from './components/Login';
import ShiftList from './components/ShiftList';
import WorkerDashboard from './components/WorkerDashboard';
import RestaurantSignup from "./components/RestaurantSignup.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import { useTranslation } from './components/useTranslations.jsx';

function App() {
    const { t } = useTranslation();

    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        if (userString && userString !== 'undefined') {
            try {
                return JSON.parse(userString);
            } catch (err) {
                console.error('Failed to parse user:', err);
                return null;
            }
        }
        return null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        const userStored = localStorage.getItem('user');
        return !!token && !!userStored && userStored !== 'undefined';
    });

    const [showSignup, setShowSignup] = useState(false);

    const handleLoginSuccess = useCallback((userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        setShowSignup(false);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    }, []);

    if (!isLoggedIn && !showSignup) {
        return <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setShowSignup(true)}
        />;
    }

    if (!isLoggedIn && showSignup) {
        return <RestaurantSignup onBackToLogin={() => setShowSignup(false)} />;
    }

    return (
        <div className="min-h-screen bg-primary-900 selection:bg-dream-pink/30">
            <nav className="bg-gradient-to-r from-primary-900 via-primary-800 to-dream-pink/80 border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex justify-between items-center gap-2">

                        {/* LEFT: Branding & User Info */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="shrink-0 group">
                                <img
                                    src="/logo.png"
                                    alt="ShiftWave"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl group-hover:rotate-12 transition-transform duration-300"
                                />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-bold text-white leading-none">ShiftWave</h1>
                                <p className="text-[10px] sm:text-sm text-glow-violet truncate font-medium">
                                    {user?.name} <span className="hidden xs:inline opacity-50">•</span> <span className="hidden xs:inline opacity-80">{user?.role}</span>
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Actions */}
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            <div className="scale-90 sm:scale-100">
                                <LanguageSwitcher />
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 p-2 sm:px-4 sm:py-2 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-95 group"
                                title={t('logout')}
                            >
                                <svg className="w-5 h-5 shrink-0 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden md:inline uppercase text-[11px] tracking-widest">{t('logout')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-0 animate-in fade-in duration-500">
                {user && (user.role === 'Manager' || user.role === 'Shift Supervisor') ? (
                    <ShiftList />
                ) : (
                    <WorkerDashboard />
                )}
            </main>
        </div>
    );
}

export default App;