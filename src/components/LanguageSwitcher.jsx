import { useTranslation } from './useTranslations.jsx'

function LanguageSwitcher() {
    const { lang, changeLang } = useTranslation();

    const languages = [
        { code: 'en', label: 'English', flag: 'gb' },
        { code: 'es', label: 'Español', flag: 'es' },
        { code: 'fr', label: 'Français', flag: 'fr' },
        { code: 'ar', label: 'العربية', flag: 'sa' }
    ];

    const currentLang = languages.find(l => l.code === lang);

    return (
        <div className="relative inline-block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <img
                    src={`https://flagcdn.com/w20/${currentLang?.flag}.png`}
                    alt={currentLang?.label}
                    className="w-5 h-4 rounded-sm"
                />
            </div>
            <select
                value={lang}
                onChange={(e) => changeLang(e.target.value)}
                className="pl-11 pr-10 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 backdrop-blur-sm transition-all cursor-pointer font-medium appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem'
                }}
            >
                {languages.map(({ code, label }) => (
                    <option key={code} value={code} className="bg-primary-900 text-white">
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LanguageSwitcher;

