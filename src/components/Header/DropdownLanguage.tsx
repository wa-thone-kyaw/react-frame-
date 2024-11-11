import { useEffect, useState } from 'react';
import ClickOutside from '../ClickOutside';
import us from '../../images/icon/us.svg';
import mm from '../../images/icon/mm.svg';
import ch from '../../images/icon/ch.svg';
import { useTranslation } from 'react-i18next';

const DropdownLanguage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { i18n } = useTranslation();

   // Get language from localStorage or default to 'en'
   useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);  // Save language to localStorage
    setDropdownOpen(false);
  }

  // Set the flag based on the current language
  const getFlagIcon = () => {
    switch (i18n.language) {
      case 'mm':
        return mm;
      case 'ch':
        return ch;
      default:
        return us;
    }
  }
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      {/* changle icon according to drop_down */}
      <img  src={getFlagIcon()} alt="Logo" className='cursor-pointer md:w-11 md:h-11 h-7 w-7' onClick={() => setDropdownOpen(!dropdownOpen)}/>
      
      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute mt-4 flex w-45 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer" onClick={() => changeLanguage('en')}> 
               <img src={us} alt="US" className='w-8 h-8' />
               English
            </li>
            <li className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer" onClick={() => changeLanguage('mm')}> 
               <img src={mm} alt="US" className='w-8 h-8' />
               Myanmar
            </li>
            <li className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer" onClick={() => changeLanguage('ch')}> 
               <img src={ch} alt="US" className='w-8 h-8' />
               Chinese
            </li>
          </ul>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownLanguage;
