import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, AtSign, Instagram, MapPin, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BrandLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const scaleClass =
    size === 'lg'
      ? 'text-3xl md:text-4xl'
      : size === 'sm'
      ? 'text-lg'
      : 'text-xl md:text-2xl';

  return (
    <div
      className={`inline-flex flex-col leading-none select-none text-[#EFE2D0] ${className}`}
      style={{ fontFamily: '"kit-sans", "KitSans-Light", "Kit Sans", "Cormorant Garamond", Georgia, serif' }}
    >
      <div className={`tracking-[0.14em] uppercase font-light ${scaleClass} flex items-center`}>
        <span>C</span>
        <span className="relative inline-block mx-[1px]">
          O
          <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 text-[0.55em] leading-none">
            ~
          </span>
        </span>
        <span>RRIENTE</span>
      </div>
      <div className={`tracking-[0.12em] uppercase font-light ${scaleClass} -mt-1 flex items-baseline`}>
        <span
          className="inline-block mr-[1px] text-[1.28em] leading-none"
          style={{ fontFamily: '"broadsheet", "Broadsheet", "Playfair Display", serif' }}
        >
          A
        </span>
        <span>RTESANAL</span>
      </div>
    </div>
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
  const isAuthFormPage =
    location.pathname === '/crear-cuenta' ||
    location.pathname === '/registro-artesano' ||
    location.pathname === '/gracias-registro';

  return (
    <header className="bg-[#340E07] text-[#E6CEAC] sticky top-0 z-50 shadow-md border-b border-[#4C1910]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-14 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="hover:opacity-90 transition-opacity"
          aria-label="Inicio Corriente Artesanal"
        >
          <BrandLogo size="md" />
        </Link>

        <nav className="flex items-center gap-6 md:gap-11 text-lg md:text-[22px] font-display-serif tracking-wide">
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
    <footer className="relative bg-transparent pt-10 overflow-hidden">
      <div className="relative w-full overflow-hidden leading-none -mb-1">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-20"
          preserveAspectRatio="none"
        >
          <path d="M0 68C380 12 960 -12 1440 52V96H0V68Z" fill="#340E07" />
        </svg>
      </div>

      <div
        className="bg-[#340E07] text-[#E6CEAC] pt-6 pb-12 px-6 md:px-16 relative"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(92, 26, 14, 0.45) 0%, rgba(52, 14, 7, 0.96) 70%)',
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

          <div className="md:col-span-7 flex flex-col gap-3.5 text-base md:text-lg text-[#EAD5B8] md:pl-12">
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
