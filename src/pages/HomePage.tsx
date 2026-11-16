import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CarouselArrow, MaterialTimeline } from '../components/ui';

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
        {/* Rombo escalonado exterior rojo terracota */}
        <path
          d="M60 0 H80 V20 H100 V40 H120 V80 H100 V100 H80 V120 H40 V100 H20 V80 H0 V40 H20 V20 H40 V0 Z"
          fill="#9E2113"
          fillOpacity="0.88"
        />
        {/* Centro cruciforme oscuro */}
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
  const navigate = useNavigate();
  const [activeMatIndex, setActiveMatIndex] = useState(0);
  const [showMoreMatInfo, setShowMoreMatInfo] = useState(false);

  const currentMaterial = materials[activeMatIndex] || materials[0];

  const handlePrevMat = () => {
    setActiveMatIndex((prev) => (prev === 0 ? materials.length - 1 : prev - 1));
  };

  const handleNextMat = () => {
    setActiveMatIndex((prev) => (prev === materials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION OSCURO CON GUARDA GUARANÍ */}
      <section
        className="relative bg-[#431008] text-[#E6A34B] pt-12 pb-28 md:pb-36 px-6 md:px-16 overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 26% 28%, rgba(138, 45, 18, 0.55) 0%, rgba(67, 16, 8, 0.96) 55%, #2D0904 100%)',
        }}
      >
        {/* Guarda geométrica derecha */}
        <div className="absolute top-0 right-4 md:right-16 bottom-0 opacity-90 hidden sm:flex items-start">
          <GuaraniPatternStrip />
        </div>

        <div className="max-w-[1060px] mx-auto relative z-10">
          <h1 className="font-display-serif text-5xl sm:text-6xl md:text-[72px] font-bold text-[#DF9B43] leading-[1.06] tracking-wide max-w-xl">
            Paseo de
            <br />
            artesanos
            <br />
            digital
          </h1>

          <div className="mt-10 md:mt-14 max-w-lg">
            <p className="italic text-2xl md:text-[28px] text-[#DF9B43] mb-5">
              Una plataforma para :
            </p>

            <ul className="space-y-4 text-xl md:text-[25px] italic text-[#E5A956]">
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

          <p className="mt-12 md:mt-16 font-display-serif italic text-2xl sm:text-3xl md:text-[36px] text-[#F1DEC4] leading-snug max-w-lg">
            Revaloricemos juntos
            <br />
            la producción
            <br />
            tradicional correntina
          </p>
        </div>

        {/* Corte curvo inferior hacia la sección mostaza */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 md:h-28"
            preserveAspectRatio="none"
          >
            <path
              d="M0 90C460 145 980 85 1440 0V130H0V90Z"
              fill="#D8923E"
            />
          </svg>
        </div>
      </section>

      {/* 2. FRANJA MOSTAZA: ¿SOS ARTESANO TRADICIONAL? + FLECHA MANUSCRITA + ¡REGISTRATE! */}
      <section className="relative bg-mustard-texture pt-4 pb-20 md:pb-24 px-6 md:px-16 overflow-hidden">
        {/* Detalle de guarda lateral izquierda suave */}
        <div className="absolute left-0 top-6 bottom-6 w-8 md:w-12 opacity-35 pointer-events-none flex flex-col justify-center">
          <div className="w-full h-40 bg-[#F3CBA0]/40" />
        </div>

        <div className="max-w-[1060px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-[#47140C]">
              ¿Sos artesano tradicional?
            </h2>
            <p className="italic text-lg md:text-xl text-[#47140C] mt-2 font-medium">
              Tu oficio forma parte de la cultura correntina.
            </p>
            <p className="text-sm md:text-base text-[#3A120A] mt-3 leading-relaxed max-w-md">
              Registrá tu perfil para mostrar tu trabajo, contar tu historia
              <br className="hidden sm:inline" /> y sumate a la Corriente Artesanal.
            </p>
          </div>

          {/* Contenedor de flecha con rulo y botón ¡REGISTRATE! */}
          <div className="relative flex flex-col items-center md:items-end pr-4 md:pr-16 pt-6 md:pt-10">
            {/* SVG Flecha manuscrita con rulo idéntica al PDF */}
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

        {/* Corte curvo inferior hacia la textura de papel Kraft */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 md:h-16"
            preserveAspectRatio="none"
          >
            <path
              d="M0 35C480 -15 980 -10 1440 55V80H0V35Z"
              fill="#D3B99C"
            />
          </svg>
        </div>
      </section>

      {/* 3. CUERPO PRINCIPAL SOBRE TEXTURA DE PAPEL KRAFT */}
      <div className="bg-kraft-texture pt-8 pb-16 px-6 md:px-16 space-y-20">
        {/* 3.1 ¿Qué vas a encontrar? */}
        <section className="max-w-[1020px] mx-auto">
          <h2 className="font-display-serif text-3xl md:text-[38px] font-bold text-[#4A170E] mb-8">
            ¿Qué vas a encontrar?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
            {/* Badge +80 Artesanos */}
            <Link
              to="/artesanos"
              className="bg-[#4E120B] text-[#F3E3CE] px-6 py-7 flex items-center justify-center gap-5 shadow-lg hover:scale-[1.02] transition-transform"
              style={{
                borderRadius: '50% 50% 12% 12% / 18% 18% 0% 0%',
              }}
            >
              <User className="w-12 h-12 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
              <div>
                <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                  +80
                </div>
                <div className="italic text-lg md:text-xl">Artesanos</div>
              </div>
            </Link>

            {/* Badge +600 Productos */}
            <Link
              to="/catalogo"
              className="bg-[#4E120B] text-[#F3E3CE] px-6 py-7 flex items-center justify-center gap-5 shadow-lg hover:scale-[1.02] transition-transform"
              style={{
                borderRadius: '50% 50% 12% 12% / 18% 18% 0% 0%',
              }}
            >
              <ShoppingBag className="w-12 h-12 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
              <div>
                <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                  +600
                </div>
                <div className="italic text-lg md:text-xl">Productos</div>
              </div>
            </Link>

            {/* Badge +50 Productos únicos */}
            <Link
              to="/catalogo"
              className="bg-[#4E120B] text-[#F3E3CE] px-6 py-7 flex items-center justify-center gap-5 shadow-lg hover:scale-[1.02] transition-transform"
              style={{
                borderRadius: '50% 50% 12% 12% / 18% 18% 0% 0%',
              }}
            >
              <Star className="w-12 h-12 text-[#DFC4A6] fill-[#DFC4A6] shrink-0" />
              <div>
                <div className="font-display-serif text-3xl md:text-4xl font-bold text-[#E59849]">
                  +50
                </div>
                <div className="italic text-sm md:text-base leading-tight">
                  Productos
                  <br />
                  únicos
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 3.2 ¡Conocé nuestros productos! (Utilitarias vs Decorativas) */}
        <section className="max-w-[1020px] mx-auto">
          <h2 className="font-display-serif text-3xl md:text-[38px] font-bold text-[#4A170E]">
            ¡Conocé nuestros productos!
          </h2>
          <p className="text-sm md:text-base text-[#4A251B] mt-1 mb-8 max-w-lg leading-snug">
            Explorá una selección exclusiva de productos que
            <br />
            representan la riqueza natural y las técnicas tradicionales
            <br />
            de nuestra región
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Utilitarias */}
            <div className="relative group overflow-hidden shadow-lg aspect-[4/3.6] bg-[#3A1B14]">
              <img
                src="/assets/places/home-utilitarias.jpg"
                alt="Artesanías utilitarias"
                className="w-full h-full object-cover sepia-[0.25] contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=utilitario"
                  className="btn-artesanal px-7 py-2.5 text-base md:text-lg text-center leading-tight"
                >
                  Ver artesanías
                  <br />
                  utilitarias
                </Link>
              </div>
            </div>

            {/* Decorativas */}
            <div className="relative group overflow-hidden shadow-lg aspect-[4/3.6] bg-[#3A1B14]">
              <img
                src="/assets/places/home-decorativas.jpg"
                alt="Artesanías decorativas"
                className="w-full h-full object-cover sepia-[0.25] contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=decorativo"
                  className="btn-artesanal px-7 py-2.5 text-base md:text-lg text-center leading-tight"
                >
                  Ver artesanías
                  <br />
                  decorativas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3.3 Materiales utilizados + Carrusel + Línea 1..7 */}
        <section className="max-w-[1020px] mx-auto">
          <h2 className="font-display-serif text-3xl md:text-[38px] font-bold text-[#4A170E]">
            Materiales utilizados
          </h2>
          <p className="text-sm md:text-base text-[#4A251B] mt-1 mb-6 max-w-lg leading-snug">
            Provienen directamente del entorno natural correntino
            <br />
            y constituyen la base de sus tradiciones ¡Conocé la
            <br />
            clasificación de artesanías según el material que
            <br />
            ofrece el catálogo!
          </p>

          {/* Tarjeta destacada del material activo con flechas laterales */}
          <div className="relative bg-[#C5A98C]/85 rounded-md p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <CarouselArrow
              direction="left"
              onClick={handlePrevMat}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
            />

            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md shrink-0 border-2 border-[#8C6245]/40">
              <img
                src={currentMaterial.image_url}
                alt={currentMaterial.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-[#4A170E]">
                {currentMaterial.title}
              </h3>
              <p className="text-sm md:text-base text-[#3D1B12] mt-2 max-w-xl leading-relaxed">
                {currentMaterial.description}
              </p>

              {showMoreMatInfo && (
                <p className="text-xs md:text-sm text-[#4A170E] bg-[#DFCBB2]/70 p-3 rounded mt-3">
                  En el Paseo de Artesanos Digital podés filtrar tanto el Catálogo de piezas como
                  el Directorio de Maestros Artesanos por{' '}
                  <strong>{currentMaterial.name}</strong>.
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => navigate(`/catalogo?material=${currentMaterial.id}`)}
                  className="btn-artesanal px-5 py-1.5 text-sm md:text-base"
                >
                  Ver catálogo
                </button>
                <button
                  type="button"
                  onClick={() => setShowMoreMatInfo((v) => !v)}
                  className="btn-artesanal-dark px-5 py-1.5 text-sm md:text-base"
                >
                  {showMoreMatInfo ? 'Ocultar info' : 'Más información'}
                </button>
              </div>
            </div>

            <CarouselArrow
              direction="right"
              onClick={handleNextMat}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
            />
          </div>

          {/* Línea de tiempo numerada 1 al 7 */}
          <MaterialTimeline
            materials={materials}
            selectedMaterialId={currentMaterial.id}
            allowToggleAll={false}
            onSelect={(id) => {
              if (id) {
                const idx = materials.findIndex((m) => m.id === id);
                if (idx >= 0) setActiveMatIndex(idx);
              }
            }}
          />
        </section>

        {/* 3.4 Los maestros detrás de las piezas & Puntos físicos donde encontrarlos */}
        <section className="max-w-[1020px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-4">
          {/* Los maestros detrás de las piezas */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] leading-tight">
                Los maestros detrás
                <br />
                de las piezas
              </h2>
              <p className="text-sm md:text-base text-[#4A251B] mt-2 mb-5">
                Cada artesanía cuenta la historia del maestro
                <br />
                artesano que la realizo.
              </p>
            </div>

            <div className="relative group overflow-hidden shadow-lg aspect-[16/10] bg-[#3A1B14]">
              <img
                src="/assets/places/home-artesanos.jpg"
                alt="Conocer a los artesanos"
                className="w-full h-full object-cover sepia-[0.25] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <Link
                  to="/artesanos"
                  className="btn-artesanal px-7 py-2 text-base md:text-lg text-center leading-tight"
                >
                  Conocer a
                  <br />
                  los artesanos
                </Link>
              </div>
            </div>
          </div>

          {/* Puntos físicos donde encontrarlos */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] leading-tight">
                Puntos físicos
                <br />
                donde encontrarlos
              </h2>
              <p className="text-sm md:text-base text-[#4A251B] mt-2 mb-5">
                Si deseas conocerlos personalmente o encontralos en
                <br />
                ferias tenés que conocer estos luugares.
              </p>
            </div>

            <div className="relative group overflow-hidden shadow-lg aspect-[16/10] bg-[#3A1B14]">
              <img
                src="/assets/places/museo-mat.jpg"
                alt="Ver puntos físicos"
                className="w-full h-full object-cover sepia-[0.25] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <Link
                  to="/puntos-fisicos"
                  className="btn-artesanal px-7 py-2 text-base md:text-lg text-center leading-tight"
                >
                  Ver puntos
                  <br />
                  físicos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

