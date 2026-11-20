import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* Guarda escalonada tradicional correntina/guaraní para el lateral derecho del Hero */
const GuaraniPatternStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center justify-around h-full select-none pointer-events-none ${className}`}>
    {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
      <svg
        key={idx}
        viewBox="0 0 120 120"
        className="w-24 md:w-36 lg:w-44 h-auto -my-3"
        fill="none"
      >
        <path
          d="M60 0 H80 V20 H100 V40 H120 V80 H100 V100 H80 V120 H40 V100 H20 V80 H0 V40 H20 V20 H40 V0 Z"
          fill="#9E2113"
          fillOpacity="0.88"
        />
        <path
          d="M52 28 H68 V48 H88 V72 H68 V92 H52 V72 H32 V48 H52 Z"
          fill="#3E0C06"
        />
      </svg>
    ))}
  </div>
);

/* Media cruz escalonada clara en el borde izquierdo de la franja amarilla mostaza */
const MustardLeftMotif: React.FC = () => (
  <svg
    viewBox="0 0 90 180"
    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-16 lg:w-24 h-auto pointer-events-none select-none opacity-65"
    fill="none"
  >
    <path
      d="M0 0 H30 V30 H60 V60 H90 V120 H60 V150 H30 V180 H0 V120 H30 V60 H0 Z"
      fill="#F3CE98"
    />
  </svg>
);

export const HomePage: React.FC = () => {
  const { materials } = useApp();

  return (
    <div
      className="w-full overflow-x-hidden bg-no-repeat bg-top bg-[#D3B99C]"
      style={{
        backgroundImage: "url('/assets/ui/fondo-landing-unido.webp')",
        backgroundSize: '100% auto',
      }}
    >
      {/* 1. HERO SECTION — Calibrado exactamente a la zona roja (0..2280 de 1921x6522) */}
      <section className="relative text-[#E6A34B] md:aspect-[1921/2280] flex flex-col justify-between pt-14 md:pt-[8vw] pb-16 md:pb-[10vw] px-6 md:px-[13vw] overflow-hidden">
        {/* Guarda geométrica derecha a lo largo de toda la zona roja */}
        <div className="absolute top-0 right-4 md:right-[11vw] bottom-[4vw] opacity-90 hidden sm:flex">
          <GuaraniPatternStrip />
        </div>

        {/* Bloque 1: Título PASEO DE ARTESANOS DIGITAL */}
        <div className="relative z-10">
          <h1
            className="text-4xl sm:text-6xl md:text-[5.2vw] font-light text-[#E49B3E] leading-[1.08] tracking-[0.04em] uppercase"
            style={{
              fontFamily:
                '"kit-sans", "KitSans-Light", "broadsheet", "Cormorant Garamond", Georgia, serif',
            }}
          >
            Paseo de
            <br />
            artesanos
            <br />
            digital
          </h1>
        </div>

        {/* Bloque 2: Una plataforma para : + 3 viñetas con estrella roja */}
        <div className="relative z-10 my-10 md:my-0">
          <p className="font-serif italic text-xl sm:text-2xl md:text-[2.1vw] text-[#E49B3E] mb-4 md:mb-[1.8vw]">
            Una plataforma para :
          </p>

          <ul className="space-y-3 md:space-y-[1.3vw] font-serif italic text-lg sm:text-xl md:text-[1.85vw] text-[#E5A956] leading-snug">
            <li className="flex items-center gap-3">
              <span className="text-[#C82515] text-xl md:text-[1.8vw] leading-none">
                ✵
              </span>
              <span>Conocer a los artesanos</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#C82515] text-xl md:text-[1.8vw] leading-none">
                ✵
              </span>
              <span>Descubrir sus productos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C82515] text-xl md:text-[1.8vw] leading-none mt-1">
                ✵
              </span>
              <span>
                Acercarte a las historias
                <br />
                que existen detrás
              </span>
            </li>
          </ul>
        </div>

        {/* Bloque 3: Lema inferior en cursiva */}
        <div className="relative z-10">
          <p className="font-serif italic text-2xl sm:text-3xl md:text-[2.55vw] text-[#EED9BF] leading-[1.22]">
            Revaloricemos juntos la
            <br />
            producción tradicional correntina
          </p>
        </div>
      </section>

      {/* 2. FRANJA AMARILLA MOSTAZA — Calibrada exactamente a (2280..2690 de 1921x6522) */}
      <section className="relative md:aspect-[1921/410] flex items-center py-10 md:py-0 px-6 md:px-[13vw]">
        <MustardLeftMotif />

        <div className="w-full relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[2.2vw] font-bold text-[#4A140C] leading-tight">
              ¿Sos artesano tradicional?
            </h2>
            <p className="font-serif italic text-base md:text-[1.25vw] text-[#4A140C] mt-1.5 font-semibold">
              Tu oficio forma parte de la cultura correntina.
            </p>
            <p className="text-xs sm:text-sm md:text-[1.02vw] text-[#3A120A] mt-2 leading-relaxed">
              Registrá tu perfil para mostrar tu trabajo, contar tu
              <br className="hidden sm:inline" /> historia y sumate a la Corriente Artesanal.
            </p>
          </div>

          {/* Flecha manuscrita con rulo + botón ¡REGISTRATE! */}
          <div className="relative flex flex-col items-center md:items-end pr-2 md:pr-[2vw] -mt-2 md:-mt-[2.5vw]">
            <svg
              viewBox="0 0 260 130"
              className="w-40 md:w-[16vw] h-auto -mb-2 md:-mr-[4vw] text-[#23110B]"
              fill="none"
            >
              <path
                d="M252 120 C244 82, 212 46, 168 42 C128 38, 96 54, 88 82"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M74 66 L86 88 L106 74"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link
              to="/registro-artesano"
              className="btn-artesanal px-6 md:px-[2.2vw] py-2 md:py-[0.65vw] text-base md:text-[1.35vw] uppercase tracking-wider font-bold"
            >
              ¡REGISTRATE!
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ARCO CURVO MARRÓN OSCURO — Calibrado exactamente a (2690..2945 de 1921x6522) */}
      <section className="relative md:aspect-[1921/255] flex items-center py-6 md:py-0 px-6 md:px-[13vw]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center text-[#F3E3CE] md:-mt-[1.4vw]">
          <Link
            to="/artesanos"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform"
          >
            <User className="w-9 h-9 md:w-[2.8vw] md:h-[2.8vw] text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-2xl md:text-[2.3vw] font-bold text-[#E59849] leading-none">
                +80
              </div>
              <div className="italic text-base md:text-[1.25vw] mt-0.5">Artesanos</div>
            </div>
          </Link>

          <Link
            to="/catalogo?exclusivos=1"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform"
          >
            <Star className="w-9 h-9 md:w-[2.8vw] md:h-[2.8vw] text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-2xl md:text-[2.3vw] font-bold text-[#E59849] leading-none">
                +50
              </div>
              <div className="italic text-xs md:text-[1vw] leading-tight mt-0.5">
                Diseños
                <br />
                exclusivos
              </div>
            </div>
          </Link>

          <Link
            to="/catalogo"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform"
          >
            <ShoppingBag className="w-9 h-9 md:w-[2.8vw] md:h-[2.8vw] text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-2xl md:text-[2.3vw] font-bold text-[#E59849] leading-none">
                +600
              </div>
              <div className="italic text-base md:text-[1.25vw] mt-0.5">Productos</div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. CUERPO BEIGE TEXTURIZADO — Empieza exactamente debajo del arco marrón (y >= 2945) */}
      <div className="pt-8 md:pt-[2.5vw] pb-20 px-6 md:px-[13vw] space-y-16 md:space-y-20">
        <section className="max-w-[980px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-[2.5vw] font-light text-[#4A170E] uppercase leading-snug tracking-wide"
              style={{
                fontFamily:
                  '"kit-sans", "KitSans-Light", "broadsheet", "Cormorant Garamond", Georgia, serif',
              }}
            >
              Descubrí que tiene
              <br />
              para contarte cada pieza
            </h2>
            <p className="text-xs sm:text-sm md:text-[1.05vw] text-[#3D1B12] mt-3 leading-relaxed">
              Explorá una selección exclusiva de productos cuyos materiales provienen
              directamente del <strong>entorno natural</strong> correntino y de nuestros{' '}
              <strong>conocimientos tradicionales.</strong>
            </p>
          </div>

          {/* 2 grandes fotografías superiores (Decorativas a la izquierda, Utilitarias a la derecha) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group overflow-hidden shadow-lg aspect-[4/4.2] bg-[#3A1B14]">
              <img
                src="/assets/places/home-decorativas-new.jpg"
                alt="Artesanías decorativas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=decorativo"
                  className="btn-artesanal px-7 py-2 text-base md:text-lg text-center leading-tight"
                >
                  Ver artesanías
                  <br />
                  decorativas
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden shadow-lg aspect-[4/4.2] bg-[#3A1B14]">
              <img
                src="/assets/places/home-utilitarias-new.jpg"
                alt="Artesanías utilitarias"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=utilitario"
                  className="btn-artesanal px-7 py-2 text-base md:text-lg text-center leading-tight"
                >
                  Ver artesanías
                  <br />
                  utilitarias
                </Link>
              </div>
            </div>
          </div>

          {/* 7 Columnas Verticales de Materiales conectadas debajo de las 2 fotos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 mt-2">
            {materials.map((mat, idx) => (
              <Link
                key={mat.id}
                to={`/catalogo?material=${mat.id}`}
                className="group relative overflow-hidden bg-[#5B221D] aspect-[1/2.25] flex flex-col justify-end shadow hover:brightness-110 transition-all"
              >
                <img
                  src={`/assets/ui/home-mat-col-${idx + 1}.jpg`}
                  alt={mat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* 5. BLOQUES ALTERNADOS CON BORDE CURVO: LOS MAESTROS DETRÁS DE LAS PIEZAS & PUNTOS FÍSICOS */}
        <section className="max-w-[980px] mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-[#D6BFA6]/45 rounded-xl overflow-hidden shadow-sm">
            <div className="md:col-span-6 p-8 md:p-12 space-y-4">
              <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] leading-tight">
                Los maestros detrás
                <br />
                de las piezas
              </h2>
              <p className="text-sm md:text-[15.5px] text-[#3D1B12] leading-relaxed max-w-sm">
                Te invitamos a conocer de cerca a quienes mantienen vivos los oficios más
                auténticos de nuestra región.
              </p>
              <div className="pt-2">
                <Link
                  to="/artesanos"
                  className="btn-artesanal-dark px-6 py-2 text-sm md:text-base"
                  style={{ transform: 'rotate(0deg)' }}
                >
                  Conocer a los artesanos
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 h-64 md:h-72 relative overflow-hidden">
              <img
                src="/assets/places/home-artesanos.jpg"
                alt="Conocer a los artesanos"
                className="w-full h-full object-cover md:rounded-l-[140px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-[#D6BFA6]/45 rounded-xl overflow-hidden shadow-sm">
            <div className="md:col-span-6 h-64 md:h-72 relative overflow-hidden order-2 md:order-1">
              <img
                src="/assets/places/museo-mat.jpg"
                alt="Museo de Artesanías Tradicionales"
                className="w-full h-full object-cover md:rounded-r-[140px]"
              />
            </div>

            <div className="md:col-span-6 p-8 md:p-12 space-y-4 order-1 md:order-2">
              <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] leading-tight">
                Puntos físicos
                <br />
                donde encontrarlos
              </h2>
              <p className="text-sm md:text-[15.5px] text-[#3D1B12] leading-relaxed max-w-sm">
                Si deseas conocerlos personalmente o encontralos en ferias tenés que conocer
                estos luugares.
              </p>
              <div className="pt-2">
                <Link
                  to="/puntos-fisicos"
                  className="btn-artesanal-dark px-7 py-2 text-sm md:text-base"
                  style={{ transform: 'rotate(0deg)' }}
                >
                  Ver puntos físicos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
