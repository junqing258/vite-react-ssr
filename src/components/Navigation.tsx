import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";
import { useI18n } from "../hooks/useI18n";
import LanguageSwitch from "./LanguageSwitch";

const NavigationDesktop: React.FC = () => {
  const { t } = useI18n();
  
  // 在服务器端渲染时安全处理 location
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // 在服务器端创建一个默认的 location 对象
    location = { pathname: "/" };
  }

  return (
    <nav className="px-8 py-4 bg-gray-50 border-b border-gray-200 mb-8 dark:bg-gray-800 dark:border-gray-700">
      <ul className="flex list-none m-0 p-0 gap-8 items-center">
        <li>
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 no-underline mr-auto dark:text-blue-400"
          >
            Vite + React
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              location.pathname === "/"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.home')}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              location.pathname === "/about"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.about')}
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              location.pathname === "/contact"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.contact')}
          </Link>
        </li>
        <li>
          <Link
            to="/unocss"
            className={`no-underline px-4 py-2 rounded transition-all duration-200 ${
              location.pathname === "/unocss"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.unocss')}
          </Link>
        </li>
        <li className="ml-auto">
          <LanguageSwitch />
        </li>
      </ul>
    </nav>
  );
};

const NavigationMobile: React.FC = () => {
  const { t } = useI18n();
  
  // 在服务器端渲染时安全处理 location
  let location;
  try {
    location = useLocation();
  } catch (error) {
    location = { pathname: "/" };
  }

  return (
    <nav className="px-4 py-3 bg-gray-50 border-b border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <Link
          to="/"
          className="text-lg font-bold text-blue-600 no-underline dark:text-blue-400"
        >
          Vite + React
        </Link>
        <LanguageSwitch />
      </div>
      <ul className="flex list-none m-0 p-0 gap-2 items-center overflow-x-auto">
        <li>
          <Link
            to="/"
            className={`no-underline px-3 py-1 rounded text-sm transition-all duration-200 whitespace-nowrap ${
              location.pathname === "/"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.home')}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`no-underline px-3 py-1 rounded text-sm transition-all duration-200 whitespace-nowrap ${
              location.pathname === "/about"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.about')}
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`no-underline px-3 py-1 rounded text-sm transition-all duration-200 whitespace-nowrap ${
              location.pathname === "/contact"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.contact')}
          </Link>
        </li>
        <li>
          <Link
            to="/unocss"
            className={`no-underline px-3 py-1 rounded text-sm transition-all duration-200 whitespace-nowrap ${
              location.pathname === "/unocss"
                ? "text-blue-600 font-bold bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
            }`}
          >
            {t('navigation.unocss')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default function () {
  const { isSmOrMd } = useResponsive();
  return isSmOrMd ? <NavigationMobile /> : <NavigationDesktop />;
}
