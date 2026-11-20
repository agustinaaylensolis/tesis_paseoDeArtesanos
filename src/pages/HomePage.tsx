import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* Guarda escalonada tradicional correntina/guaraní para el Hero */
const GuaraniPatternStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center select-none pointer-events-none ${className}`}>
    {[0, 1, 2, 3, 4, 5].map((idx) => (
      <svg
        key={idx}
        viewBox="0 0 120 120"
        className="w-24 md:w-36 h-24 md:h-36 -my-2"
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

export const HomePage: React.FC = () => {
  const { materials } = useApp();

  return (
    <div
      className="w-full overflow-x-hidden bg-no-repeat bg-top"
      style={{
        backgroundImage: "url('/assets/ui/fondo-landing-unido.webp')",
        backgroundSize: '100% 100%',
      }}
    >
      {/* 1. HERO SECTION (SOBRE LA PARTE ROJA DEL FONDO UNIDO) */}
      <section className="relative text-[#E6A34B] pt-14 md:pt-20 pb-24 md:pb-36 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-4 md:right-16 bottom-0 opacity-90 hidden sm:flex items-start">
          <GuaraniPatternStrip />
        </div>

        <div className="max-w-[1060px] mx-auto relative z-10">
          <h1 className="font-display-serif text-5xl sm:text-6xl md:text-[72px] font-bold text-[#DF9B43] leading-[1.06] tracking-wide max-w-xl uppercase">
            Paseo de
            <br />
            artesanos
            <br />
            digital
          </h1>

          <div className="mt-12 md:mt-16 max-w-lg">
            <p className="italic text-2xl md:text-[28px] text-[#DF9B43] mb-6">
              Una plataforma para :
            </p>

            <ul className="space-y-5 text-xl md:text-[25px] italic text-[#E5A956]">
              <li className="flex items-start gap-3">
                <span className="text-[#B82918] text-2xl leading-none mt-1">✵</span>
                <span>Conocer a los artesanos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B82918] text-2xl leading-none mt-1">✵</span>
                <span>Descubrir sus productos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B82918] text-2xl leading-none mt-1">✵</span>
                <span>
                  Acercarte a las historias
                  <br />
                  que existen detrás
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-16 md:mt-24 font-display-serif italic text-2xl sm:text-3xl md:text-[36px] text-[#F1DEC4] leading-snug max-w-lg">
            Revaloricemos juntos la
            <br />
            producción tradicional correntina
          </p>
        </div>
      </section>

      {/* 2. FRANJA MOSTAZA: ¿SOS ARTESANO TRADICIONAL? */}
      <section className="relative pt-8 md:pt-12 pb-12 md:pb-16 px-6 md:px-16">
        <div className="max-w-[1060px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-[#47140C]">
              ¿Sos artesano tradicional?
            </h2>
            <p className="italic text-lg md:text-xl text-[#47140C] mt-2 font-medium">
              Tu oficio forma parte de la cultura correntina.
            </p>
            <p className="text-sm md:text-base text-[#3A120A] mt-3 leading-relaxed max-w-md">
              Registrá tu perfil para mostrar tu trabajo, contar tu
              <br className="hidden sm:inline" /> historia y sumate a la Corriente Artesanal.
            </p>
          </div>

          <div className="relative flex flex-col items-center md:items-end pr-4 md:pr-16 pt-2">
            <svg
              viewBox="0 0 260 130"
              className="w-48 md:w-60 h-24 md:h-28 -mb-3 md:-mr-10 text-[#23110B]"
              fill="none"
            >
              <path
                d="M250 55 C205 62, 165 42, 172 18 C178 0, 205 6, 198 28 C190 52, 120 44, 72 58 C45 66, 36 88, 35 112"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M22 96 L35 116 L49 97"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link
              to="/registro-artesano"
              className="btn-artesanal px-8 py-3 text-lg md:text-xl uppercase tracking-wider font-bold"
            >
              ¡REGISTRATE!
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FRANJA CURVA MARRÓN OSCURO CON LOS 3 CONTADORES (+80, +50, +600) */}
      <section className="relative py-6 md:py-10 px-6 md:px-16">
        <div className="max-w-[920px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center text-[#F3E3CE]">
          <Link
            to="/artesanos"
            className="flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <User className="w-11 h-11 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                +80
              </div>
              <div className="italic text-lg md:text-xl">Artesanos</div>
            </div>
          </Link>

          <Link
            to="/catalogo?exclusivos=1"
            className="flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <Star className="w-11 h-11 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                +50
              </div>
              <div className="italic text-sm md:text-base leading-tight">
                Diseños
                <br />
                exclusivos
              </div>
            </div>
          </Link>

          <Link
            to="/catalogo"
            className="flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <ShoppingBag className="w-11 h-11 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
            <div>
              <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                +600
              </div>
              <div className="italic text-lg md:text-xl">Productos</div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. CUERPO BEIGE: DESCUBRÍ QUE TIENE PARA CONTARTE CADA PIEZA (Pantalla principal de la web final .pdf) */}
      <div className="pt-12 md:pt-16 pb-20 px-6 md:px-16 space-y-20">
        <section className="max-w-[980px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#4A170E] uppercase leading-tight">
              Descubrí que tiene
              <br />
              para contarte cada pieza
            </h2>
            <p className="text-sm md:text-base text-[#3D1B12] mt-3 leading-relaxed">
              Explorá una selección exclusiva de productos cuyos materiales provienen
              directamente del <strong>entorno natural</strong> correntino y de nuestros{' '}
              <strong>conocimientos tradicionales.</strong>
            </p>
          </div>

          {/* 2 grandes fotografías superiores (Decorativas a la izquierda, Utilitarias a la derecha) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Decorativas */}
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

            {/* Utilitarias */}
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

          {/* 7 Columnas Verticales de Materiales conectadas debajo de las 2 fotos tal como en Pantalla principal de la web final .pdf */}
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
          {/* Fila 1: Texto a la izquierda + Foto con curva izquierda a la derecha */}
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

          {/* Fila 2: Foto con curva derecha a la izquierda + Texto a la derecha */}
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
