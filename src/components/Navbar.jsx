import BrandLogo from '../assets/img/BrandLogo.avif'
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar sm:px-10 p-4">
      {/* Start: Logo */}
      <div className="navbar-start">
        <a href="#" className="inline-flex items-center">
          <img src={BrandLogo} alt="Brand logo" className="rounded-badge w-14 sm:w-20" />
        </a>
      </div>

      {/* End: Sign in button (visible on all breakpoints) */}
      <div className="navbar-end">
        <button className="btn btn-sm sm:btn-md">
          {/* User icon shown on lg+ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hidden lg:block size-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span>{t('signin')}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;