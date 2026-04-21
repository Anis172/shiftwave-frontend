import { useState } from 'react';
import { translations } from './translations';

export function useTranslation() {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('lang') || 'en';
    });

    const t = (key) => {
        return translations[lang]?.[key] || key;
    };

    const changeLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('lang', newLang);
        window.location.reload(); // Reload to apply new language
    };

    return { t, lang, changeLang };
}