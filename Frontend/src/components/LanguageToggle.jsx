// {Language toggle component for switching between English and Sinhala}

import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  // Normalize current language to 'en' | 'si'
  const current = (i18n.language || 'en').toLowerCase().startsWith('si') ? 'si' : 'en';

  const switchTo = (lng) => {
    if (lng !== current) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 justify-end">
      <button
        type="button"
        aria-pressed={current === 'en'}
        onClick={() => switchTo('en')}
        className={`text-sm transition-colors ${current === 'en' ? 'font-bold' : 'text-base-content/70 hover:text-base-content'}`}
      >
        EN
      </button>
      <span className="text-sm opacity-50">|</span>
      <button
        type="button"
        aria-pressed={current === 'si'}
        onClick={() => switchTo('si')}
        className={`text-sm transition-colors ${current === 'si' ? 'font-bold' : 'text-base-content/70 hover:text-base-content'}`}
      >
        SI
      </button>
    </div>
  );
};

export default LanguageToggle;