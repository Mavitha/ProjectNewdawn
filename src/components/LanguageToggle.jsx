// {Lanuge toggle component for switching between English and Sinhala}

import  { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(i18n.language === 'si');

  const handleLanguageChange = () => {
    const newLang = isChecked ? 'en' : 'si';
    setIsChecked(!isChecked);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 justify-end">
      <span className={`text-sm ${!isChecked ? 'font-bold' : ''}`}>EN</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleLanguageChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-[#FFBF78] rounded-full peer 
                      peer-checked:after:translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute 
                      after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                      after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                      peer-checked:bg-[#FFBF78]">
        </div>
      </label>
      <span className={`text-sm ${isChecked ? 'font-bold' : ''}`}>සිංහල</span>
    </div>
  );
};

export default LanguageToggle;