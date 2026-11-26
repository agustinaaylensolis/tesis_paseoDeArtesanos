import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* CURSO DE COMUNICACIÓN PARA ARTESANOS — 100% TEXTO Y DIAGRAMAS HTML/SVG NÍTIDOS (curso de comunicación.pdf y Parte de la web Andrés págs. 9 y 10) */
export const CoursePage: React.FC = () => {
  const [unit, setUnit] = useState<0 | 1 | 2 | 3 | 4>(0);
  const navigate = useNavigate();

  const selectUnit = (u: 0 | 1 | 2 | 3 | 4) => {
    setUnit(u);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-course-editorial min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-16 text-[#34120E] overflow-x-hidden">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* COLUMNA PRINCIPAL (8 cols) */}
        <div className="lg:col-span-8">
          {/* ================= VISTA 0: ÍNDICE DEL CURSO ================= */}
          {unit === 0 && (
            <div className="space-y-7">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#34120E]">
                Curso de comunicación para artesanos
              </h1>

              {/* Tarjeta U1 */}
              <div
                onClick={() => selectUnit(1)}
                className="bg-[#D5C9B8] rounded-xl p-4 sm:p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#34120E] text-xs font-bold flex items-center justify-center shrink-0">
                    U1
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">Unidad 1: Presentación</h2>
                </div>
                <div className="pl-0 sm:pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
                  <p className="font-bold">Conocé sobre el curso | Duración 10 min.</p>
                  <p>¿Qué es Corriente artesanal?</p>
                  <p>¿Qué se puede aprender del curso?</p>
                  <p>Rol esperado del artesano</p>
                </div>
              </div>

              {/* Tarjeta U2 */}
              <div
                onClick={() => selectUnit(2)}
                className="bg-[#D5C9B8] rounded-xl p-4 sm:p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#34120E] text-xs font-bold flex items-center justify-center shrink-0">
                    U2
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 2: Comunicación efectiva
                  </h2>
                </div>
                <div className="pl-0 sm:pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
                  <p className="font-bold">
                    Contar historias que vendan | Duración 20 min.
                  </p>
                  <p>Comunicar lo cultural: ¿Cómo y por qué?</p>
                  <p>Comunicación estratégica: Mostrar - contar - conectar</p>
                </div>
              </div>

              {/* Tarjeta U3 */}
              <div
                onClick={() => selectUnit(3)}
                className="bg-[#D5C9B8] rounded-xl p-4 sm:p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#34120E] text-xs font-bold flex items-center justify-center shrink-0">
                    U3
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 3: Introducción a la fotografía
                  </h2>
                </div>
                <div className="pl-0 sm:pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
                  <p className="font-bold">
                    Como fotografiar tus piezas | Duración 25 min.
                  </p>
                  <p>Usar el celular para fotos y vídeos</p>
                  <p>Fondos</p>
                  <p>Sobre la pieza a fotografíar</p>
                  <p>Conceptos básicos de fotografía (ángulos, encuadres, etc)</p>
                </div>
              </div>

              {/* Tarjeta U4 */}
              <div
                onClick={() => selectUnit(4)}
                className="bg-[#D5C9B8] rounded-xl p-4 sm:p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#34120E] text-xs font-bold flex items-center justify-center shrink-0">
                    U4
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 4: Optimizar la vidriera digital
                  </h2>
                </div>
                <div className="pl-0 sm:pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
                  <p className="font-bold">
                    Tu vidriera digital lista | Duración 15 minutos
                  </p>
                  <p>Conocé el perfil para artesanos</p>
                  <p>Redacción de copys</p>
                  <p>Carga de stock</p>
                  <p>Personalización</p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => selectUnit(1)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_primer_unidad.svg"
                    alt="Ir a la primer unidad"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
              </div>

              <div className="pt-4 text-sm md:text-[15px] leading-relaxed max-w-xl">
                <p>
                  ¿Preferís leerlo impreso?, tenemos también una opción para vos,{' '}
                  <a
                    href="/assets/course/manual-comunicacion-artesanos.pdf"
                    download="Manual-Curso-Comunicacion-Artesanos.pdf"
                    className="underline font-bold text-[#741712] hover:text-[#4A170E]"
                  >
                    descargando el siguiente archivo PDF
                  </a>{' '}
                  vas a tener el manual en la versión imprimible en formato A4.
                </p>
              </div>
            </div>
          )}

          {/* ================= VISTA 1: UNIDAD 1 - PRESENTACIÓN ================= */}
          {unit === 1 && (
            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-normal"
                style={{ fontFamily: '"broadsheet", Georgia, serif' }}>
                Presentación</h1>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>
                  ¿Qué es Corriente artesanal?
                </h2>

                <img
                  src="/assets/ui/signo_marcario_marroncito.svg"
                  alt="Corriente Artesanal"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain py-1"
                />

                <p className="text-sm md:text-[15px] leading-relaxed">
                  Este proyecto social tiene el objetivo de fortalecer desde la comunicación
                  visual y el diseño gráfico la presencia de los artesanos tradicionales en
                  canales digitales para que puedan acceder a un importante medio de
                  comercialización, además de trabajar sobre los conceptos e ideas percibidas
                  por el púbico adulto jóven de la ciudad de Corrientes.
                </p>
              </div>

              <div className="space-y-4">
                <h2
                  className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                >
                  ¿Qué se puede aprender de este manual?
                </h2>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  Con este manual esperamos transmitir de forma sencilla los siguientes
                  conocimientos y habilidades para una comunicación más óptima.
                </p>

                <ul className="space-y-2.5 pl-3 text-base md:text-[17px]">
                  <li className="flex items-center gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Adquirir saberes sobre comunicación estrátegica</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Adentrarse en nociones básicas del diseño gráfico</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Comprender lo que abarca la identidad visual</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Tomar fotografías con el celular</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Como crear una vidriera digital óptima</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>
                  ¿Qué esperamos del usuario de este manual?
                </h2>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  La estrategia del proyecto se enmarca en la implementación de un
                  “ecosistema comunicacional” donde a través de diferentes canales de
                  comunicación tanto físicos como digitales se forma un red interconectada por
                  la que se pueda transitar para conectar a los artesanos tradicionales con el
                  público objetivo.
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  Para lograr esto planteamos el uso de identificadores impresos que podrás
                  retirar en el Museo de Artesanías tradicionales, el cual dirigirá mediante un
                  código QR a tu perfil del sitio web y tu catálogo digital.
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  Por eso esperamos contar con tu participación activa en la lectura y
                  aplicación de los conocimientos volcados en este manual para lograr un medio
                  atractivo, centralizado y optimizado para fortalecer el desarrollo económico
                  de la elaboración artesanal y así mantener vivos nuestros oficios
                  tradicionales.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(0)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_inicio.svg"
                    alt="Volver al inicio"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(2)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_siguiente_unidad.svg"
                    alt="Siguiente unidad"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 2: UNIDAD 2 - COMUNICACIÓN EFECTIVA ================= */}
          {unit === 2 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h1
                  className="text-3xl md:text-4xl font-normal"
                  style={{ fontFamily: '"broadsheet", Georgia, serif' }}>
                  ¿Qué es la comunicación?
                </h1>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  Para ser breves podemos decir que La comunicación es el proceso mediante el
                  cual se transmite e intercambia información, ideas, opiniones o sentimientos
                  entre un emisor y un receptor, no hay un concepto universal ni tampoco una
                  sola forma de abarcarlo, pero para lo que vamos a desarrollar a continuación
                  esta definición nos resulta suficiente.
                </p>
              </div>

              <div className="space-y-3 text-sm md:text-[15px] leading-relaxed">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>
                  ¿Por qué comunicar adecuadamente?
                </h2>
                <p>
                  Ya sea en el aspecto personal, social, laboral, político o en cualquier otro
                  ámbito donde interactuemos con otras personas es indispensable poder
                  transmitir de forma adecuada lo que sea que queramos comunicar. Los ámbitos
                  en los que nos centraremos con este manual son:
                </p>
                <p>
                  <strong>Comunicación cultural:</strong> entendida como la rama de la
                  comunicación enfocada en difundir, visibilizar y conectar al público con las
                  industrias culturales y creativas.
                </p>
                <p>
                  <strong>Comunicación estratégica:</strong> es el uso planificado y coherente
                  de la información por parte de una organización para alcanzar sus objetivos
                  institucionales o de negocio.
                </p>
                <p>
                  <strong>Comunicación visual:</strong> es una transmisión de datos e
                  información lograda mediante elementos percibidos por el sentido de la vista,
                  generando mensajes más directos y recordables.
                </p>
                <p>
                  A continuación veremos en detalle como se relacionan y trabajan estos 3
                  ámbitos de la comunicación.
                </p>

                <div className="my-4 flex justify-center">
                  <img
                    src="/assets/ui/grafico_comunicacion.svg"
                    alt="Gráfico de estrategia de comunicación"
                    className="w-full max-w-2xl h-auto object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2 max-w-lg">
                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  <span
                    className="col-span-12 sm:col-span-4 font-normal text-2xl md:text-3xl"
                    style={{ fontFamily: '"broadsheet", Georgia, serif' }}
                  >
                    Conocer
                  </span>
                  <span className="col-span-12 sm:col-span-8 text-xs md:text-sm -mt-2 sm:mt-0">
                    Refiere al primer contacto, parte de un desconocimiento casi total
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  <span
                    className="col-span-12 sm:col-span-4 font-normal text-2xl md:text-3xl"
                    style={{ fontFamily: '"broadsheet", Georgia, serif' }}
                  >
                    Conectar
                  </span>
                  <span className="col-span-12 sm:col-span-8 text-xs md:text-sm -mt-2 sm:mt-0">
                    Se busca lograrlo a través de la transmisión de su proceso, de los
                    conocimientos heredados, la relación con nuestra historia local
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  <span
                    className="col-span-12 sm:col-span-4 font-normal text-2xl md:text-3xl"
                    style={{ fontFamily: '"broadsheet", Georgia, serif' }}
                  >
                    Valorar
                  </span>
                  <span className="col-span-12 sm:col-span-8 text-xs md:text-sm -mt-2 sm:mt-0">
                    Una vez reconocido la identidad cultural que contiene y la labor que hay
                    detrás se puede llegar a la apreciación económica del objeto
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm md:text-[15px] leading-relaxed">
                <h2 className="text-3xl md:text-4xl font-normal"
                  style={{ fontFamily: '"broadsheet", Georgia, serif' }}>
                  Comunicación estratégica
                </h2>
                <p>
                  Como ya vimos anteriormente, las acciones de comunicación no son tomadas de
                  formas aisladas, sino dirigidas bajo un plan y una estrategia. Para el caso
                  de los artesanos tradicionales la estrategia gira sobre qué contar y qué no,
                  es decir definir qué aspectos de la producción son clave
                </p>

                <h3 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>¿Qué se puede comunicar de una pieza?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="space-y-1">
                    <p>¿Qué es la pieza?</p>
                    <p>¿Para qué se utiliza?</p>
                    <p>¿Cómo se llama?</p>
                    <p>¿Qué la caracteriza?</p>
                    <p>¿Qué la diferencia de otras piezas?</p>
                  </div>
                  <div className="space-y-1">
                    <p>¿Qué materiales se utilizaron?</p>
                    <p>¿Qué técnica se empleó?</p>
                    <p>¿Es una pieza única, una variante de un modelo o parte de una serie?</p>
                    <p>¿Cómo se utiliza, conserva o cuida?</p>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>¿Y sobre el valor que hay detrás?</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p>El tiempo de elaboración.</p>
                  <p>Origen y preparación de los materiales.</p>
                  <p>La complejidad de la técnica.</p>
                  <p>Las particularidades y variaciones de cada pieza.</p>
                  <p>La relación entre la pieza y su contexto cultural.</p>
                  <p>La relación con la tradición</p>
                </div>

                <h3 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>
                  Comunicar sin limitarse a mostrar el producto
                </h3>
                <p className="text-xs md:text-sm">
                  Se pueden utilizar 4 formas de presentar la pieza
                </p>
                <div className="space-y-1 text-xs md:text-sm">
                  <p>
                    <em>Mostrar:</em> enseñar cómo se ve.
                  </p>
                  <p>
                    <em>Describir:</em> explicar sus características.
                  </p>
                  <p>
                    <em>Narrar:</em> contar algo significativo sobre su creación.
                  </p>
                  <p>
                    <em>Contextualizar:</em> explicar por qué la técnica, el material o el
                    objeto tienen importancia.
                  </p>
                </div>

                <p className="pt-2">
                  Ahora el siguiente paso es utilizar estas preguntas disparadoras para guiar
                  las historias a contar de cada pieza, recordá que en la artesanía lo más
                  valioso no está a simple vista y que contando el proceso se llega a
                  comprender su verdadero valor.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(1)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_unidad_anterior.svg"
                    alt="Unidad anterior"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(3)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_siguiente_unidad.svg"
                    alt="Siguiente unidad"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 3: UNIDAD 3 - FOTOGRAFÍA ================= */}
          {unit === 3 && (
            <div className="space-y-8 text-sm md:text-[15px] leading-relaxed">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-normal"
                  style={{ fontFamily: '"broadsheet", Georgia, serif' }}
                >Fotografía</h1>
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>¿Qué es la fotografía?</h2>
                <p>
                  La fotografía es el arte y la técnica de obtener imágenes duraderas debido a
                  la acción de la luz. Y también es el proceso de proyectar imágenes,
                  capturarlas y plasmarlas bien por medio del fijado en un medio sensible a la
                  luz o por la conversión en señales electrónicas en un sensor de una cámara
                  digital.
                </p>
                <p>
                  El secreto de la buena fotografía, es la luz y es algo que muchas veces
                  pasamos por alto o no tenemos en cuenta, las fotos están hechas de luz y la
                  luz es a la vez la materia prima y el objeto de nuestras imágenes.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Fotografiar con el celular</h2>
                <p>
                  El celular puede ser el recurso más accesible y menos complicado de utilizar
                  para fotografiar y promover la producción artesanal. Sin embargo, la falta de
                  información sobre la amplia gama de controles y funciones impide aprovechar
                  las muchas ventajas que ofrece este dispositivo. Por eso, a continuación,
                  describimos ciertos aspectos importantes de una cámara de celular, que son
                  comunes en todos los teléfonos:
                </p>
                <p>
                  <strong>El pixel:</strong> es la unidad básica y más pequeña que conforma una
                  imagen o pantalla digital
                </p>

                <div className="bg-[#D5C9B8] rounded-xl p-5 my-3">
                  <img
                    src="/assets/course/alfareria-pixel.jpg"
                    alt="Ejemplo de píxeles en fotografía de alfarería"
                    className="w-full max-w-md mx-auto rounded shadow-sm"
                  />
                </div>

                <p>
                  <strong>La resolución o tamaño</strong> de la imagen que se capta en el sensor
                  es la cantidad de píxeles utilizados y se expresa en megapíxeles
                </p>
                <p>Un megapíxel = un millón de pixeles</p>
                <p>
                  Es el producto de multiplicar la cantidad de pixeles en el eje horizontal por
                  la cantidad de pixeles en el eje vertical. La mayor cantidad de megapíxeles
                  produce mayor <em>nitidez y mayor calidad.</em>
                </p>
              </div>

              {/* 5 Reglas de la fotografía con celular — Con fotografía limpia + iconos SVG nítidos */}
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>
                  5 Reglas de la fotografía con celular
                </h2>

                <div className="space-y-3">
                  <h3 className="font-medium text-xl md:text-1xl">#1 Usá ambas manos</h3>
                  <p>
                    Si se sujeta el teléfono como si fuera una cámara, con ambas manos resulta
                    mejor para tomar las fotografías, no todos tenemos un pulso de cirujano,
                    por lo que sostenerlo así ayudará a que tus fotos salgan más nítidas.
                  </p>

                  {/* Fotografía original sin texto incrustado + iconos X / Check vectoriales */}
                  <div className="max-w-lg pt-2">
                    <img
                      src="/assets/course/reglas-celular.jpg"
                      alt="Cómo sujetar el celular con ambas manos"
                      className="w-full rounded shadow-sm"
                    />
                    <div className="grid grid-cols-3 text-center pt-3">
                      <div className="flex justify-center">
                        <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#8C1D15]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                          <path d="M7 7 L25 25 M25 7 L7 25" />
                        </svg>
                      </div>
                      <div className="flex justify-center">
                        <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#2A331B]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 17 L13 24 L26 8" />
                        </svg>
                      </div>
                      <div className="flex justify-center">
                        <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#2A331B]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 17 L13 24 L26 8" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="font-medium text-xl md:text-1xl">#2 En lo posible no usar zoom</h3>
                  <p>
                    La mayoría de los teléfonos móviles tienen un zoom digital que no acerca la
                    imagen, sino que la amplía y la recorta, haciendo que tu foto tenga
                    (notablemente) menos calidad.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-xl md:text-1xl">#3 Apagá el flash</h3>
                  <p>
                    El flash de los celulares es mucho peor que el de una cámara, si bien en
                    algunas ocasiones, cuando haya poca luz, puede ser necesario, la luz que
                    genera es demasiado dura y generalmente el resultado final es malo.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-xl md:text-1xl">#4 Ajustá el enfoque</h3>
                  <p>
                    Por defecto, el celular automáticamente elige los puntos de enfoque, y
                    generalmente enfocan el objeto que esté más cerca de la cámara pero,
                    ¿sabías que podés ser vos el que elija donde debería estar? Para hacerlo
                    solo tenés que tocar con el dedo en el punto donde querés que esté el
                    enfoque y que esté más nítido.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-xl md:text-1xl">#5 Iluminación</h3>
                  <p>
                    Ajustar la iluminación de tu foto es fundamental para que la luz se esté
                    usando a tu favor, para ajustarla podés elegir el punto donde se medirá la
                    luz simplemente tocando con el dedo algún punto de la escena. Otra función
                    que tienen los teléfonos es que te permiten hacer una compensación de la
                    luz solo con tocar un punto de la pantalla y mantener presionado mientras
                    deslizas hacia arriba o hacia abajo para dar o quitar luz a la foto.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Definir el fondo</h2>
                <p>
                  El primer paso para tener éxito en una fotografía de productos es tener un
                  buen fondo, se puede elegir un fondo neutro, ya sea blanco, negro, colores no
                  muy intensos o grises. Dependiendo del color que tiene el producto a
                  fotografiar o lo que se busca lograr en términos de textura, brillos, reflejos
                </p>
                <p>
                  Los fondos pueden ser cartulinas o lienzos de tela (pero tener en cuenta que
                  en la foto se notará la más mínima arruga de la tela y se percibirá como una
                  foto descuidada).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <img
                      src="/assets/course/fondo-infinito.jpg"
                      alt="Fondo infinito"
                      className="w-full h-44 object-cover rounded shadow-sm bg-white"
                    />
                    <h3 className="text-sm md:text-base font-bold"
                      style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Fondo infinito</h3>
                    <p className="text-xs leading-relaxed">
                      Se utiliza una lámina flexible que cae en forma continua desde el plano
                      vertical hasta cubrir el plano horizontal formando una curvatura que
                      cubre el ángulo recto que se forma por la intersección de los mismos.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <img
                      src="/assets/course/fondo-division.jpg"
                      alt="Fondo con división"
                      className="w-full h-44 object-cover rounded shadow-sm"
                    />
                    <h3 className="text-sm md:text-base font-bold"
                      style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Fondo con división</h3>
                    <p className="text-xs leading-relaxed">
                      Usando piezas cartón rígido o corrugado forrados con diferentes colores y
                      texturas, se puede obtener un fondo con corte visible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Conocer los formatos</h2>
                <p>
                  El encuadre, en fotografía, hace alusión a la porción de la escena que, como
                  fotógrafo/a, utilizarás para tus fotografías. Es decir, qué proporción de la
                  escena vas a capturar en una fotografía.
                </p>

                <div className="flex flex-wrap items-end justify-around gap-4 sm:gap-6 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold">1:1</span>
                    <div className="w-20 h-20 bg-[#D5C9B8] border border-[#5B493E]" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold">9:16</span>
                    <div className="w-14 h-24 bg-[#D5C9B8] border border-[#5B493E]" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold">16:9</span>
                    <div className="w-28 h-16 bg-[#D5C9B8] border border-[#5B493E]" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold">3:4</span>
                    <div className="w-20 h-24 bg-[#D5C9B8] border-2 border-[#741712]" />
                  </div>
                </div>

                <p className="text-xs md:text-sm">
                  Diferentes interfaces poseen diferentes formatos para los archivos a
                  compartir, en el caso de esta web, las piezas del catálogo se subirán en{' '}
                  <strong>formato 3:4, con una resolución de 1080 x 1440 pixeles.</strong>
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Entender los ángulos</h2>
                <p>
                  Los ángulos en la fotografía son la posición o el punto de vista desde el cual
                  se coloca la cámara con respecto al sujeto u objeto que se va a fotografiar,
                  se clasifican en:
                </p>

                <div className="my-4 flex justify-center">
                  <img
                    src="/assets/ui/grafico_fotografia.svg"
                    alt="Ángulos de cámara en fotografía"
                    className="w-full max-w-2xl h-auto object-contain"
                  />
                </div>

                <p className="text-xs md:text-sm">
                  Conocerlos nos ayuda a ver las opciones con las que contamos al momento de
                  fotografiar para encontrar el ángulo que más le favorezca. No dejes de probar
                  y experimentar nuevas formas de componer tus fotos según lo que quieras
                  transmitir
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-center pt-2">
                  <div className="sm:col-span-6">
                    <span className="block text-sm md:text-base font-medium mb-2">Picado</span>
                    <img
                      src="/assets/course/angulo-picado.jpg"
                      alt="Ángulo Picado"
                      className="w-full h-56 sm:h-52 md:h-60 object-cover"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <span className="block text-sm md:text-base font-medium mb-2">Normal</span>
                    <img
                      src="/assets/course/angulo-normal.jpg"
                      alt="Ángulo Normal"
                      className="w-full h-56 sm:h-52 md:h-60 object-cover"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <span className="block text-sm md:text-base font-medium mb-2">Cenital</span>
                    <img
                      src="/assets/course/angulo-cenital.jpg"
                      alt="Ángulo Cenital"
                      className="w-full h-56 sm:h-52 md:h-60 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }} >Planificar la sesión</h2>
                <p>
                  Para aprovechar mejor el tiempo y los recursos hay que planificar con
                  anticipación lo que se va a fotografiar. El protagonista debe ser la pieza,
                  pero es necesario también prestar atención a toda el área que lo rodea.
                </p>
                <p className="font-bold">Planear las tomas</p>
                <ol className="list-decimal list-inside space-y-1 text-xs md:text-sm">
                  <li>
                    Definir las piezas a fotografiar y el espacio que se utilizará como escena
                  </li>
                  <li>Definir tipo y color de fondo.</li>
                  <li>
                    Plantear los ángulos y encuadres que mejor convengan para la composición de
                    cada pieza
                  </li>
                </ol>
              </div>

              <div className="pt-6 flex items-center justify-between gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(2)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_unidad_anterior.svg"
                    alt="Unidad anterior"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(4)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_siguiente_unidad.svg"
                    alt="Siguiente unidad"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 4: UNIDAD 4 - OPTIMIZAR TU VIDRIERA DIGITAL ================= */}
          {unit === 4 && (
            <div className="space-y-8 text-sm md:text-[15px] leading-relaxed">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-normal"
                  style={{ fontFamily: '"broadsheet", Georgia, serif' }}>
                  Optimizar tu vidriera digital
                </h1>
                <p>
                  Con vidriera digital nos referimos al nuevo modo de entender el comercio por
                  medios electrónicos, pasamos de las vidrieras del local físico o del stand en
                  la feria a una interfaz web que posee las siguientes ventajas:
                </p>

                <ul className="space-y-2.5 pl-3 text-base">
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>Mayor alcance, permite llegar a muchas más personas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>Funciona las 24hs, sin estar sujeto a tu tiempo</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>
                      Es un espacio exclusivo para artesanos tradicionales, lo que evita
                      competencias desleales
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>
                      Permite comunicar el proceso, con detenimiento y detalle para que el
                      público pueda conocer más a fondo la historia de cada pieza
                    </span>
                  </li>
                </ul>

                <p>
                  Por eso para poder sacar el máximo provecho vamos a aplicar los conocimientos
                  aprendidos en este curso en el armado de nuestra vidriera
                </p>
              </div>

              {/* Completar tu perfil — Maquetado en HTML/CSS 100% nítido (sin capturas pixeladas) */}
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Completar tu perfil</h2>
                <p>
                  Para iniciar con la personalización de tu perfil tenés la opción de subir una
                  foto tocando en el círculo negro, también dispones de un espacio para contar
                  brevemente sobre tu trabajo a modo de ficha técnica, este perfil es el que
                  será mostrado en la pestaña de perfiles, junto con el resto de artesanos
                  registrados.
                </p>

                {/* Diagrama interactivo 1: Tarjeta de Perfil */}
                <div className="bg-kraft-texture px-6 py-8 sm:px-10 sm:py-9 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-stretch pt-8">
                    {/* Columna izquierda: tarjeta marrón */}
                    <div className="sm:col-span-6 relative bg-[#845C4E] text-[#F5E9D9] rounded-md px-5 pt-14 pb-6">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <img
                          src="/assets/products/signomas_individual.svg"
                          alt="+"
                          className="w-120 h-120 object-contain select-none pointer-events-none"
                        />
                      </div>

                      <p className="italic font-bold text-center text-lg text-[#E6CEB5] leading-snug">
                        Nombre personal
                        <br />o del negocio
                      </p>

                      <div className="mt-5 space-y-2.5 text-[11px] text-[#F5E9D9]/95">
                        <p>Contacto: 3794 557744</p>
                        <p>Instagram: Artesanales_Silvia</p>
                        <p>Taller: 9 de Julio 111</p>
                      </div>
                    </div>

                    {/* Columna derecha: tarjeta beige translúcida */}
                    <div className="sm:col-span-6 bg-[#D6BFA6]/55 rounded-md px-6 py-7 flex flex-col justify-between">
                      <p className="text-xs text-[#2B0F08] leading-relaxed">
                        Breve descripción: nombre, materiales y técnicas con las que trabajas,
                        algún característica que te diferencie.
                      </p>

                      <div className="mt-6 flex justify-center">
                        <span className="bg-[#4E120B] text-[#F4E6D4] text-xs font-medium px-6 py-1 shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
                          Editar perfil
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p>
                  Otra sección es la de tu historia personal, a diferencia del perfil que es
                  más sintético, acá podés contar un poco más sobre tus inicios, experiencias,
                  deseos, motivaciones entre otros, básicamente contar sobre tu relación con el
                  oficio.
                </p>

                {/* Diagrama interactivo 2: Un poco de mi historia */}
                <div className="bg-kraft-texture px-6 py-8 sm:px-9 sm:py-9 max-w-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="space-y-2.5 max-w-[340px]">
                    <h3
                      className="text-2xl font-bold text-[#4A170E] leading-tight"
                      style={{ fontFamily: '"broadsheet", Georgia, serif' }}
                    >
                      Un poco de mi historia
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#2B0F08] leading-relaxed">
                      Mi acercamiento a la artesanía comenzó hace más de diez años, cuando
                      descubrí el mundo del trabajo con metales y piedras naturales. Al
                      principio, todo era curiosidad: me interesaba conocer los materiales,
                      entender cómo se comportaban y descubrir de qué manera podían
                      transformarse en objetos...
                    </p>
                  </div>

                  <span className="bg-[#4E120B] text-[#F4E6D4] text-xs font-medium px-4 py-1.5 shadow-[0_3px_6px_rgba(0,0,0,0.35)] shrink-0 sm:mt-6">
                    Editar descripción
                  </span>
                </div>
              </div>




              {/* Categorías de piezas */}
              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}>Categorías de piezas</h2>
                <p>
                  Al momento de cargar un producto en tu catálogo vas a encontrar algunas
                  categorías para definir mejor tu producto, que son:
                </p>

                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>
                      <strong>Utilitario / decorativo:</strong> para diferenciar si son
                      solamente estéticas o pensadas para el uso, también pueden corresponder a
                      ambas, con piezas que se pueden utilizar pero también coleccionar.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />

                    <span>
                      <strong>Diseño de autor exclusivo:</strong> piezas que por ciertas
                      características como las técnicas, procesos, detalles, diseños u otros
                      son muy difíciles de llegar a replicar, por lo que quedarán destacadas con
                      una estrella.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>
                      <strong>Stock:</strong> si contás con una cantidad de piezas en
                      existencia, aclararlo es muy beneficioso ya que posibilita una entrega
                      inmediata. En cambio las piezas que figuren como “sin stock” van a tener
                      la opción de realizar un pedido consultando sobre los detalles de la
                      realización.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img
                      src="/assets/ui/estrellita_curso.svg"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0 mt-1"
                    />
                    <span>
                      <strong>Precio:</strong> puede ser un precio fijo, cuando el modelo es
                      regular o estándar, o indefinido para que los interesados consulten ya sea
                      por variaciones en las materias primas, posibilidades de personalización u
                      otras razones.
                    </span>
                  </li>
                </ul>
              </div>
              {/* Descripciones de piezas */}
              <div className="space-y-4">
                <h2
                  className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                >
                  Descripciones de piezas
                </h2>
                <p>
                  Como sucede en cada venta presencial, tenés la posibilidad de contar sobre la
                  elaboración de la pieza, cómo lo hiciste, de qué material, sus cualidades,
                  estos detalles permiten comprender el valor y trabajo que hay detrás,
                  asimilando y reconociendo el valor monetario, con las descripciones de los
                  productos debemos buscar hacer lo mismo pero sin que estés presente. Para eso
                  al momento de cargar un producto podés sumar estos datos como ficha técnica:
                </p>

                {/* 👇 ACÁ VA EL BLOQUE NUEVO (reemplaza las 2 columnas + la imagen) */}
                <div className="w-full max-w-2xl pt-1">
                  <div className="grid grid-cols-[45%_55%] gap-4 text-xs md:text-sm mb-1">
                    <div className="space-y-1.5">
                      <p className="font-bold">Datos genéricos</p>
                      <p>Nombre</p>
                      <p>Medidas</p>
                      <p>Precio (o si es consultable)</p>
                      <p>Stock (para entrega inmediata)</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-bold">Datos específicos</p>
                      <p>Horas de trabajo</p>
                      <p>Material/es</p>
                      <p>Técnica/s</p>
                      <p>Breve descripción</p>
                    </div>
                  </div>

                  <img
                    src="/assets/ui/grafico_optimizar_vidriera.svg"
                    alt="Ficha técnica de carga de pieza"
                    className="w-full h-auto block -mb-24 md:-mb-40"
                  />
                </div>

                <p>
                  Es justamente en el apartado de breve descripción donde tenemos el espacio
                  para aplicar lo que aprendimos de comunicación cultural y estratégica.
                </p>
                <p>
                  Se puede realizar una narrativa que integre la historia que hay detrás de la
                  pieza, el valor tradicional, de qué cultura o época deriva, el aspecto
                  estético, las técnicas que se implementaron, cómo se obtuvo o procesó la
                  materia prima, cuanto tiempo tomó tanto el objeto en sí como cada instancia
                  del proceso.
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(3)}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_unidad_anterior.svg"
                    alt="Unidad anterior"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/mi-perfil-artesano')}
                  className="hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src="/assets/ui/btn_finalizar.svg"
                    alt="Finalizar el curso"
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BARRA LATERAL DERECHA FIJA: ACCESO RÁPIDO (4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:pl-8">
          <div className="border-b border-[#4A251B] pb-1.5 mb-3">
            <h3 className="text-sm font-bold text-[#34120E]">Acceso rápido</h3>
          </div>

          <ul className="space-y-2.5 text-xs md:text-sm">
            {[
              { id: 1 as const, code: 'U1', label: 'Presentación' },
              { id: 2 as const, code: 'U2', label: 'Comunicación efectiva' },
              { id: 3 as const, code: 'U3', label: 'Introducción a la fotografía' },
              { id: 4 as const, code: 'U4', label: 'Optimizar la vidriera digital' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => selectUnit(item.id)}
                  className={`flex items-center gap-2.5 text-left hover:text-[#741712] transition-colors ${unit === item.id ? 'font-bold text-[#741712]' : 'text-[#34120E]'
                    }`}
                >
                  <span className="w-5 h-5 rounded-full border border-[#741712] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
