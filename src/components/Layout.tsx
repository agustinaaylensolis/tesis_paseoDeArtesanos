import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, AtSign, Instagram, MapPin, User, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BrandLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass =
    size === 'lg'
      ? 'h-16 md:h-20'
      : size === 'sm'
      ? 'h-9 md:h-10'
      : 'h-11 md:h-12';

  return (
    <svg
      viewBox="220 220 1510 560"
      className={`w-auto select-none text-[#EFE2D0] ${heightClass} ${className}`}
      fill="currentColor"
      aria-label="Corriente Artesanal"
    >
      <path d="M473.73,352.64c0-63.32,51.15-115.73,114.05-115.73,7.12,0,15.93.84,23.05,2.52l2.52,21.8c-6.71-2.93-15.09-3.77-23.47-3.77-48.23.42-93.09,40.25-93.09,95.18s40.25,95.18,91,95.18c11.32,0,18.86-.84,25.99-4.61l-2.94,22.64c-7.12,1.68-15.93,2.52-23.05,2.52-65.84,0-114.05-52.83-114.05-115.72Z" />
      <path d="M718.41,239.01c45.29,0,82.19,37.32,82.19,82.6s-36.9,82.6-82.19,82.6-81.76-36.9-81.76-82.6,36.89-82.6,81.76-82.6ZM718.41,383.25c33.54,0,59.97-26.84,59.97-61.64s-26.43-61.64-59.97-61.64-59.54,27.26-59.54,61.64,25.99,61.64,59.54,61.64Z" />
      <path d="M816.26,238.59h32.71c48.21,0,82.6,34.8,82.6,77.57,0,30.61-19.72,60.38-52.84,74.63,1.69,43.61,33.97,55.35,49.9,55.35,1.67,0,4.19-.42,5.87-2.52v23.07c-3.35,2.1-6.71,2.1-10.9,2.1-25.57,0-68.34-27.26-66.24-83.44.42-5.03,1.25-9.23,2.94-13.83,25.99-1.68,49.47-26.84,49.47-54.93,0-23.48-18.44-56.19-56.18-56.19h-14.26v187.85c0,6.71.84,12.58,2.1,16.77h-25.16c1.26-4.61,1.67-9.23,1.67-16.77v-192.88c0-7.12-.41-12.16-1.67-16.77Z" />
      <path d="M973.98,238.59h32.71c48.21,0,82.6,34.8,82.6,77.57,0,30.61-19.72,60.38-52.84,74.63,1.69,43.61,33.97,55.35,49.9,55.35,1.67,0,4.19-.42,5.87-2.52v23.07c-3.35,2.1-6.71,2.1-10.9,2.1-25.57,0-68.34-27.26-66.24-83.44.42-5.03,1.25-9.23,2.94-13.83,25.99-1.68,49.47-26.84,49.47-54.93,0-23.48-18.44-56.19-56.18-56.19h-14.26v187.85c0,6.71.84,12.58,2.1,16.77h-25.16c1.26-4.61,1.67-9.23,1.67-16.77v-192.88c0-7.12-.41-12.16-1.67-16.77Z" />
      <path d="M1120.34,240.27h25.16c-1.25,4.19-2.1,10.06-2.1,16.77v191.2c0,6.71.84,12.58,2.1,16.77h-25.16c1.26-4.61,1.67-9.23,1.67-16.77v-191.2c0-7.13-.41-12.16-1.67-16.77Z" />
      <path d="M1268.35,443.2l-4.61,22.64c-2.52-.42-7.13-.84-10.9-.84h-78.41c1.26-4.19,1.67-9.64,1.67-16.77v-192.88c0-5.45-.41-10.9-1.67-15.09h74.64c4.19,0,7.54-.42,10.06-.84l4.19,22.64c-4.19-.84-7.96-1.25-11.31-1.25h-54.51v108.18h41.93c4.19,0,7.97-.84,11.32-2.1v23.9c-3.35-.84-7.13-1.26-11.32-1.26h-41.93v54.93h59.11c2.94,0,7.55-.42,11.74-1.26Z" />
      <path d="M1296.04,240.27h24.73c-1.25,4.19-2.1,10.06-2.1,16.77v11.74l78,103.99v-115.73c0-7.13-.42-12.16-1.69-16.77h25.16c-1.25,4.19-2.1,10.06-2.1,16.77v191.2c0,6.71.84,12.58,2.1,16.77h-25.16c1.26-4.61,1.69-9.23,1.69-16.77v-40.67l-78-103.56v144.24c0,6.71.84,12.58,2.1,16.77h-24.73c1.25-4.61,1.25-9.64,1.25-16.77v-191.2c0-7.13,0-12.16-1.25-16.77Z" />
      <path d="M1517.98,448.24c0,6.71.83,12.58,2.1,16.77h-25.16c1.25-4.61,1.67-9.23,1.67-16.77v-187.42h-41.93c-3.36,0-7.13.42-11.32,1.67l3.77-23.06c2.52.42,6.71.84,10.49.84h99.37c3.77,0,7.55-.42,10.07-.84l4.19,23.06c-4.19-1.26-7.97-1.67-11.32-1.67h-41.93v187.42Z" />
      <path d="M1707.34,443.2l-4.61,22.64c-2.52-.42-7.13-.84-10.9-.84h-78.41c1.26-4.19,1.67-9.64,1.67-16.77v-192.88c0-5.45-.41-10.9-1.67-15.09h74.64c4.19,0,7.54-.42,10.06-.84l4.19,22.64c-4.19-.84-7.96-1.25-11.31-1.25h-54.51v108.18h41.93c4.19,0,7.97-.84,11.32-2.1v23.9c-3.35-.84-7.13-1.26-11.32-1.26h-41.93v54.93h59.11c2.94,0,7.55-.42,11.74-1.26Z" />
      <path d="M449.4,411.9c-1.37,6.44-2.3,19.78-2.3,29.9v293.53c0,7.36.93,13.8,2.3,18.4h-27.59c1.37-5.06,1.84-10.12,1.84-18.4v-28.06h-93.4v9.2c0,80.06-16.56,162.87-98.46,162.87-51.53,0-74.08-32.67-74.08-60.27,0-24.85,17.95-40.95,35.89-40.95,15.17,0,23.92,11.5,23.92,21.17v1.38c-3.22-2.76-8.29-4.61-12.89-4.61-9.66,0-19.78,8.29-19.78,23.01,0,15.64,11.96,35.88,46.47,35.88,58.89,0,75.45-57.51,75.45-137.56v-99.84c.46-141.7,46.93-207.5,120.09-207.5,5.97,0,14.72.46,22.53,1.84ZM330.24,686.11h93.4v-252.12h-8.29c-45.08,0-85.11,56.59-85.11,186.79v65.33Z" />
      <path d="M495.46,504.28h35.88c52.92,0,90.64,38.18,90.64,85.11,0,33.59-21.62,66.25-57.97,81.89,1.84,47.85,37.27,60.73,54.74,60.73,1.85,0,4.61-.46,6.45-2.76v25.31c-3.69,2.3-7.36,2.3-11.96,2.3-28.07,0-75-29.91-72.7-91.56.46-5.52,1.39-10.12,3.22-15.18,28.52-1.84,54.29-29.45,54.29-60.27,0-25.76-20.25-61.65-61.65-61.65h-15.65v206.12c0,7.36.93,13.8,2.3,18.4h-27.59c1.37-5.06,1.84-10.12,1.84-18.4v-211.64c0-7.82-.46-13.34-1.84-18.4Z" />
      <path d="M730.36,735.93c0,7.36.91,13.8,2.3,18.4h-27.61c1.37-5.06,1.84-10.12,1.84-18.4v-205.65h-46c-3.69,0-7.82.46-12.42,1.84l4.14-25.3c2.76.46,7.36.92,11.51.92h109.03c4.14,0,8.29-.46,11.05-.92l4.6,25.3c-4.6-1.38-8.75-1.84-12.42-1.84h-46v205.65Z" />
      <path d="M919.32,730.41l-5.06,24.85c-2.76-.46-7.82-.92-11.96-.92h-86.04c1.39-4.6,1.84-10.58,1.84-18.4v-211.64c0-5.98-.45-11.96-1.84-16.56h81.9c4.6,0,8.27-.46,11.04-.92l4.6,24.84c-4.6-.92-8.74-1.37-12.41-1.37h-59.82v118.7h46c4.6,0,8.75-.92,12.42-2.3v26.22c-3.67-.92-7.82-1.38-12.42-1.38h-46v60.27h64.86c3.22,0,8.29-.46,12.89-1.38Z" />
      <path d="M984.67,558.8c0,18.4,15.17,33.13,32.66,50.15,21.62,20.7,46.93,46,46.93,82.35,0,40.95-31.28,69.48-68.09,69.48s-57.97-26.23-57.97-54.29c0-24.38,17.47-40.02,35.42-40.02,14.26,0,23.01,10.12,23.01,19.78v1.38c-3.22-2.76-8.29-4.6-12.42-4.6-10.12,0-21.17,9.2-21.17,23.46,0,15.19,12.42,30.36,34.06,30.36,24.83,0,43.24-19.78,43.24-46s-19.32-46.47-40.03-65.33c-19.78-17.94-39.57-36.81-39.57-64.87s19.78-55.21,51.53-55.21c5.52,0,11.51.92,16.11,1.84,5.52.93,8.27,1.38,10.57,0v31.74c-3.21-6.9-11.04-11.96-22.08-11.96-18.4,0-32.19,14.27-32.19,31.74Z" />
      <path d="M1103.84,754.34h-28.52c2.76-4.6,5.06-10.58,6.9-17.02,17.95-69.01,36.81-140.78,55.22-209.8,1.84-6.44,2.76-15.19,2.3-19.78h32.67c-.93,4.6,0,11.5,2.3,19.78,17.93,69.01,35.42,140.78,53.83,209.8,1.84,6.44,4.14,12.42,6.9,17.02h-28.53c.93-5.06.46-11.5-1.84-19.78l-7.36-26.68h-84.65l-7.36,26.68c-2.3,8.74-2.76,14.72-1.85,19.78ZM1119.95,686.7h70.85l-34.04-153.67h-.46l-36.34,153.67Z" />
      <path d="M1263.51,507.73h27.13c-1.37,4.6-2.3,11.04-2.3,18.4v12.88l85.59,114.11v-126.99c0-7.82-.46-13.34-1.85-18.4h27.61c-1.37,4.6-2.3,11.04-2.3,18.4v209.8c0,7.36.93,13.8,2.3,18.4h-27.61c1.39-5.06,1.85-10.12,1.85-18.4v-44.63l-85.59-113.64v158.27c0,7.36.93,13.8,2.3,18.4h-27.13c1.37-5.06,1.37-10.58,1.37-18.4v-209.8c0-7.82,0-13.34-1.37-18.4Z" />
      <path d="M1455.75,754.34h-28.52c2.76-4.6,5.06-10.58,6.9-17.02,17.95-69.01,36.81-140.78,55.22-209.8,1.84-6.44,2.76-15.19,2.3-19.78h32.67c-.93,4.6,0,11.5,2.3,19.78,17.93,69.01,35.42,140.78,53.83,209.8,1.84,6.44,4.14,12.42,6.9,17.02h-28.53c.93-5.06.46-11.5-1.84-19.78l-7.36-26.68h-84.65l-7.36,26.68c-2.3,8.74-2.76,14.72-1.85,19.78ZM1471.86,686.7h70.85l-34.04-153.67h-.46l-36.34,153.67Z" />
      <path d="M1697.62,731.79c10.11,0,15.63-2.3,19.32-5.52-1.85,11.04-3.22,20.7-4.6,29.45-3.22-.92-7.82-1.38-12.42-1.38h-86.04c1.37-5.06,1.84-10.12,1.84-18.4v-211.64c0-5.52-.93-11.5-2.3-16.56h27.61c-1.85,5.52-1.85,10.58-1.85,16.56v207.5h58.44Z" />
      <path d="M652.64,433.89c-1.88,0-3.78.57-5.41,1.75-4.14,2.99-5.11,8.74-2.14,12.9.58.81,14.4,19.83,36.58,19.83.09,0,.19,0,.28,0,11.9-.09,18.25-5.17,22.89-8.88,4.08-3.27,6.78-5.42,13.9-5.61,7.42-.19,10.33,2.17,14.78,5.76,4.73,3.81,10.62,8.55,20.9,8.73,15.64.26,29.46-10.88,36.28-17.55l.12-.12c3.53-3.18,4.11-8.58,1.21-12.45-3.07-4.1-8.89-4.95-13-1.87-.14.1-.62.48-1.32,1.17-7.87,7.69-16.35,12.26-22.76,12.26-.08,0-.15,0-.23,0-3.76-.06-5.65-1.46-9.57-4.62-5.36-4.32-12.73-10.21-26.91-9.86-13.37.35-20.1,5.74-25.02,9.68-3.84,3.08-5.96,4.77-11.42,4.81-.05,0-.09,0-.14,0-12.52,0-21.41-11.97-21.5-12.09-1.82-2.49-4.66-3.82-7.53-3.82Z" />
    </svg>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const { userRole } = useApp();

  // Según el rol activo, el icono de Mi Perfil dirige a la página de Cliente (/mi-perfil) o al panel CRUD de Artesano (/mi-perfil-artesano)
  const profilePath =
    userRole === 'artesano'
      ? '/mi-perfil-artesano'
      : userRole === 'cliente'
      ? '/mi-perfil'
      : '/crear-cuenta';

  // En las pantallas de registro/crear cuenta (o cuando el usuario es guest) se muestra "Crear cuenta"; cuando está logueado como cliente o artesano se muestra el icono de perfil tal como en las capturas
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isAuthFormPage =
    location.pathname === '/crear-cuenta' ||
    location.pathname === '/registro-artesano' ||
    location.pathname === '/gracias-registro';

  return (
    <header className="bg-[#340E07] text-[#E6CEAC] sticky top-0 z-50 shadow-md border-b border-[#4C1910]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-14 h-16 sm:h-20 flex items-center justify-between relative">
        <Link
          to="/"
          className="hover:opacity-90 transition-opacity"
          aria-label="Inicio Corriente Artesanal"
        >
          <img
            src="/assets/ui/signo_marcario.svg"
            alt="Corriente Artesanal"
            className="h-[72px] md:h-[80px] -my-3 w-auto object-contain select-none"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Cerrar men�' : 'Abrir men�'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 rounded hover:bg-[#4E180E] transition-colors"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        <nav
          className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 right-0 flex-col md:flex-row items-start md:items-center gap-5 md:gap-11 px-6 py-5 md:p-0 bg-[#340E07] md:bg-transparent border-b border-[#4C1910] md:border-0 shadow-md md:shadow-none text-xl md:text-[22px] font-display-serif tracking-wide`}
        >
          <Link
            to="/puntos-fisicos"
            className={`hover:text-white transition-colors ${
              location.pathname === '/puntos-fisicos'
                ? 'underline underline-offset-8 decoration-[#D8923E]'
                : ''
            }`}
          >
            Puntos físicos
          </Link>

          <Link
            to="/catalogo"
            className={`hover:text-white transition-colors ${
              location.pathname.startsWith('/catalogo') ||
              location.pathname.startsWith('/producto')
                ? 'underline underline-offset-8 decoration-[#D8923E]'
                : ''
            }`}
          >
            Catálogo
          </Link>

          {userRole === 'guest' || isAuthFormPage ? (
            <Link
              to="/crear-cuenta"
              className={`hover:text-white transition-colors ${
                location.pathname === '/crear-cuenta'
                  ? 'underline underline-offset-8 decoration-[#D8923E]'
                  : ''
              }`}
            >
              Crear cuenta
            </Link>
          ) : (
            <Link
              to={profilePath}
              className={`p-1.5 rounded-full hover:bg-[#4E180E] transition-colors flex items-center justify-center ${
                location.pathname === '/mi-perfil' ||
                location.pathname === '/mi-perfil-artesano'
                  ? 'text-white ring-2 ring-[#D8923E]'
                  : 'text-[#DFC4A6]'
              }`}
              title={
                userRole === 'artesano'
                  ? 'Mi Perfil de Artesano (Catálogo y Curso)'
                  : 'Mi Perfil de Cliente (Compras y Favoritos)'
              }
            >
              <User className="w-6 h-6 fill-current" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 -mt-10 md:-mt-16 bg-transparent overflow-hidden">
      <div
        className="text-[#E6CEAC] pt-16 md:pt-28 pb-10 md:pb-12 px-4 sm:px-6 md:px-16 relative bg-[#2B0C08]"
        style={{
          backgroundImage: "url('/assets/ui/footerlanding.jpg')",
          backgroundSize: '104% 110%',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          clipPath: 'ellipse(95% 96% at 55% 98%)',
        }}
      >
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 grid grid-cols-2 gap-6 items-center justify-items-center md:justify-items-start">
            <Link to="/puntos-fisicos" className="text-center group">
              <div className="text-white font-display-serif text-3xl md:text-4xl font-bold tracking-wider leading-none">
                MAT
              </div>
              <div className="text-[10px] md:text-[11px] text-[#E6CEAC]/90 tracking-tight mt-1">
                Museo de Artesanías Tradicionales
              </div>
            </Link>

            <Link to="/conocenos" title="Conocé sobre Corriente Artesanal">
              <BrandLogo size="sm" />
            </Link>

            <div className="flex flex-col items-center">
              <img
                src="/assets/ui/logo-cultura.png"
                alt="Instituto de Cultura de Corrientes"
                className="h-11 md:h-12 w-auto object-contain"
              />
              <span className="text-[8px] uppercase tracking-wider text-white/90 font-sans mt-0.5 leading-tight text-center">
                INSTITUTO DE CULTURA
                <br />
                PROVINCIA DE CORRIENTES
              </span>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="/assets/ui/logo-gobierno.png"
                alt="Gobierno Provincial de Corrientes"
                className="h-14 md:h-16 w-auto object-contain"
              />
              <span className="text-[10px] font-bold tracking-wider text-white uppercase font-sans -mt-1">
                CORRIENTES
              </span>
              <span className="text-[7px] tracking-widest text-white/80 uppercase font-sans">
                GOBIERNO PROVINCIAL
              </span>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-3.5 text-sm sm:text-base md:text-lg min-w-0 text-[#EAD5B8] md:pl-12">
            <a
              href="https://wa.me/5493794880175"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 text-[#EAD5B8] fill-[#EAD5B8] shrink-0" />
              <span>54 9 0379 4880175</span>
            </a>

            <a
              href="mailto:museodeartesaniastradicionales@gmail.com"
              className="flex items-center gap-3.5 hover:text-white transition-colors break-all"
            >
              <AtSign className="w-5 h-5 text-[#EAD5B8] shrink-0" />
              <span>museodeartesaniastradicionales@gmail.com</span>
            </a>

            <a
              href="https://instagram.com/museodeartesaniastradicionales"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5 text-[#EAD5B8] shrink-0" />
              <span>museodeartesaniastradicionales</span>
            </a>

            <Link
              to="/puntos-fisicos"
              className="flex items-center gap-3.5 hover:text-white transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#EAD5B8] shrink-0" />
              <span>Fray José de la Quintana 905</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
