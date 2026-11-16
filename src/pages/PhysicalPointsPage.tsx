import React, { useState } from 'react';
import { MapPin, Clock, Phone, AtSign } from 'lucide-react';
import { CarouselArrow } from '../components/ui';

export const PhysicalPointsPage: React.FC = () => {
  const matPhotos = [
    '/assets/places/museo-mat.jpg',
    '/assets/places/novedad-inscripcion.jpg',
    '/assets/places/novedad-magia-criolla.jpg',
  ];
  const feriaPhotos = [
    '/assets/places/feria-itabera.jpg',
    '/assets/places/home-utilitarias.jpg',
    '/assets/places/home-decorativas.jpg',
  ];

  const [matIdx, setMatIdx] = useState(0);
  const [feriaIdx, setFeriaIdx] = useState(0);

  return (
    <div className="bg-kraft-texture min-h-screen py-12 md:py-16 px-6 md:px-16">
      <div className="max-w-[980px] mx-auto space-y-16">
        {/* 1. MUSEO DE ARTESANÍAS TRADICIONALES */}
        <section className="space-y-8">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#4A170E]">
            Museo de Artesanías Tradicionales
          </h1>

          {/* Texto + Carrusel de foto */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-4 text-sm md:text-[15.5px] text-[#33130C] leading-relaxed">
              <p>
                El Museo de Artesanías Tradicionales de Corrientes, inaugurado el 11 de agosto de
                1981, depende del Instituto de Cultura de la provincia.
              </p>
              <p>
                Declarado <strong>Monumento Histórico</strong> en 1989, es uno de los pocos
                ejemplos arquitectónicos coloniales de la ciudad. La casa, construida en 1806,
                cuenta con una fachada sencilla, ocho ventanas con rejas de hierro y puertas de
                madera originales.
              </p>
              <p>
                Exhibe piezas de artesanías tradicionales como cuero crudo, tejido, cestería,
                alfarería, platería y más.
              </p>
              <p className="italic font-bold text-[#7C1B15]">
                Su misión es mantener vivas estas expresiones populares, reflejando la cultura
                regional
              </p>
              <p>
                Transmitiendo de generación en generación técnicas artesanales con un estilo
                típico regional, logrando un equilibrio entre lo utilitario y lo artístico
              </p>
            </div>

            <div className="md:col-span-6 relative">
              <CarouselArrow
                direction="left"
                onClick={() =>
                  setMatIdx((i) => (i === 0 ? matPhotos.length - 1 : i - 1))
                }
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
              />
              <div className="overflow-hidden rounded shadow-md aspect-[4/3] bg-[#2D110A]">
                <img
                  src={matPhotos[matIdx]}
                  alt="Museo de Artesanías Tradicionales"
                  className="w-full h-full object-cover"
                />
              </div>
              <CarouselArrow
                direction="right"
                onClick={() =>
                  setMatIdx((i) => (i === matPhotos.length - 1 ? 0 : i + 1))
                }
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
              />
            </div>
          </div>

          {/* Ficha de dirección/horarios + Mapa */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-6 bg-[#D6BFA6]/85 rounded-lg p-6 shadow-sm space-y-3.5 text-sm md:text-[15px] text-[#33130C]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4A170E] mt-1 shrink-0" />
                <div>
                  Fray José de la Quintana 905
                  <br />
                  Corrientes, Argentina.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#4A170E] mt-1 shrink-0" />
                <div>
                  Horario de Atención:
                  <br />
                  Mañana: 9:00 a 20:00 hs. | Sábado, domingo y feriados de 9:00 a 21 hs.
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4A170E] shrink-0" />
                <span>3794292608</span>
              </div>

              <div className="flex items-center gap-2.5 break-all">
                <AtSign className="w-4 h-4 text-[#4A170E] shrink-0" />
                <span>museodeartesaniastradicionales@gmail.com</span>
              </div>
            </div>

            <div className="md:col-span-6 overflow-hidden rounded shadow-md">
              <img
                src="/assets/places/mapa-corrientes.jpg"
                alt="Mapa ubicación Museo de Artesanías Tradicionales"
                className="w-full h-full object-cover min-h-[190px]"
              />
            </div>
          </div>
        </section>

        {/* 2. FERIA ITA BERA */}
        <section className="space-y-8">
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-[40px] font-bold text-[#4A170E]">
            Feria Ita Bera
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-4 text-sm md:text-[15.5px] text-[#33130C] leading-relaxed">
              <p>
                El Espacio Itá Berá se fundó en el año 2000 (Paseo de Artesanos) se encuentra en
                Punta Tacuaru
              </p>
              <p className="font-medium">Qué vas a encontrar</p>
              <ul className="space-y-1.5">
                <li>• Productos artesanales y regionales de Corrientes.</li>
                <li>• Souvenirs, regalería personalizada y decoración para el hogar.</li>
                <li>• Artesanías en cerámica, macramé y accesorios.</li>
                <li>
                  • Gastronomía local (como chipá y alfajores de yerba mate) e infusiones.
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 relative">
              <CarouselArrow
                direction="left"
                onClick={() =>
                  setFeriaIdx((i) => (i === 0 ? feriaPhotos.length - 1 : i - 1))
                }
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
              />
              <div className="overflow-hidden rounded shadow-md aspect-[4/3] bg-[#2D110A]">
                <img
                  src={feriaPhotos[feriaIdx]}
                  alt="Feria Ita Bera"
                  className="w-full h-full object-cover"
                />
              </div>
              <CarouselArrow
                direction="right"
                onClick={() =>
                  setFeriaIdx((i) => (i === feriaPhotos.length - 1 ? 0 : i + 1))
                }
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-6 bg-[#D6BFA6]/85 rounded-lg p-6 shadow-sm space-y-3.5 text-sm md:text-[15px] text-[#33130C]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4A170E] mt-1 shrink-0" />
                <div>
                  Costanera General San Martín y calle Chaco
                  <br />
                  Corrientes, Argentina.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#4A170E] mt-1 shrink-0" />
                <div>
                  Horario de Atención:
                  <br />
                  Sábados y domingos: a partir de las 14:00
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4A170E] shrink-0" />
                <span>3794292608</span>
              </div>

              <div className="flex items-center gap-2.5">
                <AtSign className="w-4 h-4 text-[#4A170E] shrink-0" />
                <span>Feriaitabera@gmail.com</span>
              </div>
            </div>

            <div className="md:col-span-6 overflow-hidden rounded shadow-md">
              <img
                src="/assets/places/mapa-corrientes.jpg"
                alt="Mapa ubicación Feria Ita Bera"
                className="w-full h-full object-cover min-h-[190px]"
              />
            </div>
          </div>
        </section>

        {/* 3. OTRAS NOVEDADES */}
        <section className="space-y-6 pt-2">
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#4A170E]">
            Otras Novedades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Novedad 1 */}
            <div className="flex flex-col">
              <h3 className="font-display-serif text-xl md:text-2xl font-semibold text-[#4A170E] mb-2">
                Inscripción a ferias
              </h3>
              <div className="bg-[#D6BFA6]/85 rounded-b-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
                <img
                  src="/assets/places/novedad-inscripcion.jpg"
                  alt="Inscripción a ferias"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 text-xs md:text-sm text-[#33130C] leading-relaxed">
                  El Museo de Artesanías Tradicionales (MAT) y el Instituto de Cultura de
                  Corrientes han extendido...
                </div>
              </div>
            </div>

            {/* Novedad 2 */}
            <div className="flex flex-col">
              <h3 className="font-display-serif text-xl md:text-2xl font-semibold text-[#4A170E] mb-2">
                Feria Navideña
              </h3>
              <div className="bg-[#D6BFA6]/85 rounded-b-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
                <img
                  src="/assets/places/novedad-navidena.jpg"
                  alt="Feria Navideña Artesanal"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 text-xs md:text-sm text-[#33130C] leading-relaxed">
                  Se acerca una de las épocas más bellas y significativas del año, y queremos
                  invitarlos...
                </div>
              </div>
            </div>

            {/* Novedad 3 */}
            <div className="flex flex-col">
              <h3 className="font-display-serif text-xl md:text-2xl font-semibold text-[#4A170E] mb-2">
                La magia criolla
              </h3>
              <div className="bg-[#D6BFA6]/85 rounded-b-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
                <img
                  src="/assets/places/novedad-magia-criolla.jpg"
                  alt="La magia criolla"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 text-xs md:text-sm text-[#33130C] leading-relaxed">
                  El Instituto de Cultura de Corrientes invita a visitar el Museo de Artesanías
                  Tradicionales (MAT),...
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

