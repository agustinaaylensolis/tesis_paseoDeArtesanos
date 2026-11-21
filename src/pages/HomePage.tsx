import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* Nombres exactos de las 7 columnas en el modelo PDF (con sus saltos de línea originales) */
const MATERIAL_COLUMN_LABELS: Record<number, React.ReactNode> = {
  1: (
    <>
      Cuero
      <br />o suela
    </>
  ),
  2: (
    <>
      Lana y
      <br />
      algodón
    </>
  ),
  3: (
    <>
      Fibra
      <br />
      Vegetal
    </>
  ),
  4: (
    <>
      Plata y
      <br />
      minerales
    </>
  ),
  5: <>Madera</>,
  6: <>Asta</>,
  7: <>Arcilla</>,
};

export const HomePage: React.FC = () => {
  const { materials } = useApp();

  return (
    <div
      className="w-full overflow-x-hidden bg-no-repeat bg-top bg-[#D3B99C] bg-[url('/assets/ui/fondo-beige-textura.webp')] bg-[length:100%_auto] bg-repeat-y md:bg-no-repeat md:bg-[url('/assets/ui/fondo-landing-unido.webp')]"
    >
      {/* 1. HERO SECTION — Calibrado exactamente a la zona roja (0..2280 de 1921x6522) */}
      <section className="relative text-[#E6A34B] bg-[#3A0F08] bg-[url('/assets/ui/fondo-bordo-textura.webp')] bg-cover md:bg-none md:bg-transparent md:aspect-[1921/2280] flex flex-col justify-between pt-10 sm:pt-14 md:pt-[8vw] pb-12 sm:pb-16 md:pb-[10vw] px-4 sm:px-6 md:px-[13.5vw] overflow-hidden">
        {/* Guarda oficial de cruz andina/guaraní en el lateral derecho (coordenadas exactas x=1374..1730, y=48..2174 en 1921x2280) */}
        <div
          className="hidden sm:block absolute pointer-events-none select-none"
          style={{
            top: '2.1%',
            right: '9.94%',
            width: '18.58%',
            height: '93.3%',
          }}
        >
          <img
            src="/assets/ui/cruz-andina-guarda-crop.png"
            alt="Guarda Cruz Andina"
            className="w-full h-full object-contain"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(2650%) hue-rotate(352deg) brightness(82%) contrast(98%)',
              opacity: 0.9,
            }}
          />
        </div>

        {/* Bloque 1: Título PASEO DE ARTESANOS DIGITAL */}
        <div className="relative z-10">
          <h1
            className="text-5xl sm:text-6xl md:text-[8.5vw] font-normal text-[#E49B3E] leading-[1.2] tracking-[0.04em]"
            style={{
              fontFamily: '"lubaline", Georgia, serif',
            }}
          >
            Paseo de
            <br />
            artesanos
            <br />
            digital
          </h1>
        </div>

        {/* Bloque 2: Una plataforma para : + 3 viñetas con la estrella roja oficial recortada */}
        <div
          className="relative z-10 my-10 md:my-0 italic text-[#E5A956]"
          style={{ fontFamily: '"broadsheet", Georgia, serif' }}
        >
          <p className="text-lg sm:text-xl md:text-[3.5vw] leading-snug mb-4 md:mb-[3.5vw]">
            Una plataforma para :
          </p>

          <ul className="space-y-3 md:space-y-[1.3vw] text-lg sm:text-xl md:text-[3.5vw] leading-snug">
            <li className="flex items-center gap-3.5">
              <img
                src="/assets/ui/icon-estrella-roja-crop.png"
                alt=""
                className="w-4 h-4 md:w-[3.5vw] md:h-[3.5vw] object-contain shrink-0"
              />
              <span>Conocer a los artesanos</span>
            </li>
            <li className="flex items-center gap-3.5">
              <img
                src="/assets/ui/icon-estrella-roja-crop.png"
                alt=""
                className="w-4 h-4 md:w-[2.5vw] md:h-[2.5vw] object-contain shrink-0"
              />
              <span>Descubrir sus productos</span>
            </li>
            <li className="flex items-start gap-3.5">
              <img
                src="/assets/ui/icon-estrella-roja-crop.png"
                alt=""
                className="w-4 h-4 md:w-[2.5vw] md:h-[2.5vw] object-contain shrink-0 mt-1.5"
              />
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
          <p className="italic text-2xl sm:text-4xl md:text-[4vw] text-[#EED9BF] leading-[1.6] sm:leading-[2]"
            style={{ fontFamily: '"broadsheet", Georgia, serif' }}>
            Revaloricemos juntos la
            <br />
            producción tradicional correntina
          </p>
        </div>
      </section>

      {/* 2. FRANJA AMARILLA MOSTAZA — Calibrada exactamente a (2280..2690 de 1921x6522) */}
      <section className="relative bg-[#E59838] md:bg-transparent md:aspect-[1921/410] flex items-center py-10 md:py-0 px-4 sm:px-6 md:px-[14vw]">
        {/* Media cruz andina oficial */}
        <img
          src="/assets/ui/cruz-andina-izq-crop.png"
          alt="Motivo Cruz Andina"
          className="hidden md:block absolute left-0 pointer-events-none select-none opacity-45"
          style={{
            top: '-6.83%',
            height: '131.22%',
            width: '12.44%',
          }}
        />

        {/* Quitamos "relative" de acá para que la flecha y el botón tomen referencia del <section> */}
        <div className="w-full z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Bloque de texto: más grande y sin max-w-lg que lo corte en escritorio */}
          <div className="max-w-lg md:max-w-[44vw]">
            <h2 className="font-display-serif text-3xl sm:text-5xl md:text-[3.1vw] font-bold text-[#4A140C] leading-tight">
              ¿Sos artesano tradicional?
            </h2>
            <p className="font-serif italic text-base md:text-[1.55vw] text-[#4A140C] mt-5 font-semibold">
              Tu oficio forma parte de la cultura correntina.
            </p>
            <p className="text-xs sm:text-sm md:text-[1.3vw] text-[#3A120A] mt-5 leading-relaxed">
              Registrá tu perfil para mostrar tu trabajo, contar tu
              <br className="hidden sm:inline" /> historia y sumate a la Corriente Artesanal.
            </p>
          </div>

          {/* Flecha pegada al borde derecho + Botón más arriba, a la derecha y más robusto */}
          <div className="relative md:static flex items-center mt-4 md:mt-0">
            <img
              src="/assets/ui/flecha-registrate-horizontal.png"
              alt=""
              className="hidden md:block absolute right-0 top-[2vw] w-[24vw] h-auto object-contain pointer-events-none select-none"
            />

            <Link
              to="/registro-artesano"
              className="btn-artesanal md:absolute md:right-[20vw] md:top-[11.5vw] z-10 px-4 sm:px-6 md:px-[2.2vw] py-2.5 md:py-[1.15vw] text-sm md:text-[1.85vw] uppercase tracking-[0.06em] font-bold"
            >
              ¡REGISTRATE!
            </Link>
          </div>
        </div>
      </section>
      {/* 3. ARCO CURVO MARRÓN OSCURO — Calibrado exactamente a (2690..2945 de 1921x6522) */}
      <section className="relative bg-[#2E0805] rounded-b-[50%_40px] md:rounded-none md:bg-transparent md:aspect-[1921/255] flex items-center py-6 md:py-0 px-4 sm:px-6 md:px-[13.5vw]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center text-[#F3E3CE] md:-mt-[1.4vw]">
          <Link
            to="/artesanos"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform md:translate-y-[2.2vw]"
          >
            <img
              src="/assets/ui/icon-artesanos-crop.png"
              alt="Artesanos"
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-[5vw] md:h-[4.7vw] object-contain shrink-0"
            />
            <div>
              <div className="font-display-serif text-2xl md:text-[3vw] font-bold text-[#E59849] leading-none">
                +80
              </div>
              <div className="italic text-base md:text-[1.5vw] mt-0.5">Artesanos</div>
            </div>
          </Link>

          <Link
            to="/catalogo?exclusivos=1"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform md:-translate-y-[0.5vw]"

          >
            <img
              src="/assets/ui/icon-estrella-beige-crop.png"
              alt="Diseños exclusivos"
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-[5vw] md:h-[4.7vw] object-contain shrink-0"
            />
            <div>
              <div className="font-display-serif text-2xl md:text-[3vw] font-bold text-[#E59849] leading-none">
                +50
              </div>
              <div className="italic text-xs md:text-[1.5vw] leading-tight mt-0.5">
                Diseños
                <br />
                exclusivos
              </div>
            </div>
          </Link>

          <Link
            to="/catalogo"
            className="flex items-center gap-3.5 hover:scale-105 transition-transform md:translate-y-[2.2vw]"
          >
            <img
              src="/assets/ui/icon-bolsa-crop.png"
              alt="Productos"
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-[5vw] md:h-[4.7vw] object-contain shrink-0"
            />
            <div>
              <div className="font-display-serif text-2xl md:text-[3vw] font-bold text-[#E59849] leading-none">
                +600
              </div>
              <div className="italic text-base md:text-[1.5vw] mt-0.5">Productos</div>
            </div>
          </Link>
        </div>
      </section>
      {/* 4. CUERPO BEIGE TEXTURIZADO — Empieza exactamente debajo del arco marrón (y >= 2945) */}
      <div className="pt-8 md:pt-[2.8vw] pb-16 px-4 sm:px-6 md:px-[13.5vw]">
        <section className="w-full mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-[2.4vw]">
            <h2
              className="text-3xl sm:text-4xl md:text-[4vw] font-normal text-[#4A170E] leading-[1.15] tracking-wide"
              style={{
                fontFamily: '"lubaline", Georgia, serif',
              }}
            >
              Descubrí que tiene
              <br />
              para contarte cada pieza
            </h2>
            <p className="max-w-md md:max-w-[36vw] mx-auto text-xs sm:text-sm md:text-[1.1vw] text-[#3D1B12] mt-4 leading-relaxed">
              Explorá una selección exclusiva de productos cuyos materiales provienen
              directamente del <strong>entorno natural</strong> correntino y de nuestros{' '}
              <strong>conocimientos tradicionales.</strong>
            </p>
          </div>

          {/* 2 grandes fotografías superiores recortadas sin márgenes transparentes (688x844 cada una) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[1.6vw] items-start">
            <div className="relative group">
              <img
                src="/assets/ui/home-img-decorativas-crop.png"
                alt="Artesanías decorativas"
                className="w-full h-auto block"
              />
              <div className="absolute bottom-[14%] left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=decorativo"
                  className="inline-flex flex-col items-center justify-center bg-[#7D1110]/85 hover:bg-[#7D1110] px-4 md:px-[1.15vw] py-1.5 md:py-[0.4vw] text-sm sm:text-base md:text-[1.25vw] font-semibold text-center leading-[1.15] tracking-[0.02em] shadow-[0_4px_12px_rgba(40,8,4,0.5)] transition-colors"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                >
                  <span className="text-[#F3E3CE]">Ver artesanías</span>
                  <span className="text-[#E59849]">decorativas</span>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <img
                src="/assets/ui/home-img-utilitarias-crop.png"
                alt="Artesanías utilitarias"
                className="w-full h-auto block"
              />
              <div className="absolute bottom-[14%] left-0 right-0 flex justify-center">
                <Link
                  to="/catalogo?tipo=utilitario"
                  className="inline-flex flex-col items-center justify-center bg-[#7D1110]/85 hover:bg-[#7D1110] px-4 md:px-[1.15vw] py-1.5 md:py-[0.4vw] text-sm sm:text-base md:text-[1.25vw] font-semibold text-center leading-[1.15] tracking-[0.02em] shadow-[0_4px_12px_rgba(40,8,4,0.5)] transition-colors"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                >
                  <span className="text-[#F3E3CE]">Ver artesanías</span>
                  <span className="text-[#E59849]">utilitarias</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 7 Columnas Verticales de Materiales */}
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-7 gap-1.5 md:gap-[0.65vw] mt-4 md:-mt-[3.4vw] relative z-10 pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {materials.map((mat, idx) => (
              <Link
                key={mat.id}
                to={`/catalogo?material=${mat.id}`}
                title={`Explorar ${mat.name}`}
                className="group relative flex flex-col items-center justify-end overflow-hidden hover:brightness-110 transition-all shrink-0 w-[40%] sm:w-[24%] md:w-auto snap-start"
              >
                <img
                  src={`/assets/ui/home-mat-${idx + 1}-crop.png`}
                  alt={mat.name}
                  className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-300"
                />
                {/* Contenedor con altura fija + flex para centrar verticalmente textos de 1 y 2 líneas */}
                <div className="absolute bottom-[4%] left-1 right-1 h-[15%] flex items-center justify-center text-center pointer-events-none">
                  <span
                    className="text-xs sm:text-sm md:text-[1.22vw] font-medium text-[#F4E6D4] leading-[1.15] block drop-shadow"
                    style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  >
                    {MATERIAL_COLUMN_LABELS[mat.id] || mat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. BLOQUES ALTERNADOS SIN COLOR SÓLIDO DE FONDO */}
        <section className="w-full mx-auto mt-10 md:mt-[3.2vw] space-y-8 md:space-y-0">
          {/* Fila 1: Los maestros detrás de las piezas */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 pr-0 md:pr-[3vw] py-4 md:py-0 space-y-3 md:space-y-[1.2vw]">
              <h2
                className="text-2xl sm:text-3xl md:text-[2.6vw] font-normal text-[#5E2A22] leading-[1.12]"
                style={{ fontFamily: '"broadsheet", Georgia, serif' }}
              >
                Los maestros detrás
                <br />
                de las piezas
              </h2>
              <p
                className="text-sm md:text-[1.12vw] text-[#4A261B] leading-[1.35] max-w-sm md:max-w-[27vw]"
                style={{ fontFamily: '"sitka-text", Georgia, serif' }}
              >
                Te invitamos a conocer de cerca a quienes mantienen vivos los oficios más
                auténticos de nuestra región.
              </p>
              <div className="pt-2 md:pt-[0.8vw]">
                <Link
                  to="/artesanos"
                  className="inline-block bg-[#4A2A18] hover:bg-[#5E3620] text-[#E6D2B5] px-8 md:px-[2.2vw] py-2 md:py-[0.5vw] text-sm md:text-[1.15vw] font-medium tracking-[0.02em] shadow-[0_6px_14px_rgba(30,15,5,0.45)] transition-colors"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                >
                  Conocer a los artesanos
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 flex items-center justify-end">
              <img
                src="/assets/ui/home-maestros-crop.png"
                alt="Conocer a los artesanos"
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Fila 2: Puntos físicos donde encontrarlos */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 flex items-center justify-start order-2 md:order-1">
              <img
                src="/assets/ui/home-puntos-fisicos-crop.png"
                alt="Museo de Artesanías Tradicionales"
                className="w-full h-auto block"
              />
            </div>

            <div className="md:col-span-6 pl-0 md:pl-[3.5vw] py-4 md:py-0 space-y-3 md:space-y-[1.2vw] order-1 md:order-2">
              <h2
                className="text-2xl sm:text-3xl md:text-[2.6vw] font-normal text-[#5E2A22] leading-[1.12]"
                style={{ fontFamily: '"broadsheet", Georgia, serif' }}
              >
                Puntos físicos
                <br />
                donde encontrarlos
              </h2>
              <p
                className="text-sm md:text-[1.12vw] text-[#4A261B] leading-[1.35] max-w-sm md:max-w-[27vw]"
                style={{ fontFamily: '"sitka-text", Georgia, serif' }}
              >
                Si deseas conocerlos personalmente o encontrarlos en ferias tenés que conocer
                estos lugares.
              </p>
              <div className="pt-2 md:pt-[0.8vw]">
                <Link
                  to="/puntos-fisicos"
                  className="inline-block bg-[#4A2A18] hover:bg-[#5E3620] text-[#E6D2B5] px-10 md:px-[3vw] py-2 md:py-[0.5vw] text-sm md:text-[1.15vw] font-medium tracking-[0.02em] shadow-[0_6px_14px_rgba(30,15,5,0.45)] transition-colors"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
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