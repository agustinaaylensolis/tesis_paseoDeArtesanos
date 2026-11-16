import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* CURSO DE COMUNICACIÓN PARA ARTESANOS — ÍNDICE + 4 UNIDADES (curso de comunicación.pdf págs. 3 a 7) */
export const CoursePage: React.FC = () => {
  const [unit, setUnit] = useState<0 | 1 | 2 | 3 | 4>(0);
  const navigate = useNavigate();

  const selectUnit = (u: 0 | 1 | 2 | 3 | 4) => {
    setUnit(u);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-course-editorial min-h-screen py-12 md:py-16 px-6 md:px-16 text-[#23120B]">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* COLUMNA PRINCIPAL (8 cols) */}
        <div className="lg:col-span-8">
          {/* ================= VISTA 0: ÍNDICE DEL CURSO (Pág. 3) ================= */}
          {unit === 0 && (
            <div className="space-y-7">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#23120B]">
                Curso de comunicación para artesanos
              </h1>

              {/* Tarjeta U1 */}
              <div
                onClick={() => selectUnit(1)}
                className="bg-[#D5C9B8] rounded-xl p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#23120B] text-xs font-bold flex items-center justify-center shrink-0">
                    U1
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">Unidad 1: Presentación</h2>
                </div>
                <div className="pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
                  <p className="font-bold">Conocé sobre el curso | Duración 10 min.</p>
                  <p>¿Qué es Corriente artesanal?</p>
                  <p>¿Qué se puede aprender del curso?</p>
                  <p>Rol esperado del artesano</p>
                </div>
              </div>

              {/* Tarjeta U2 */}
              <div
                onClick={() => selectUnit(2)}
                className="bg-[#D5C9B8] rounded-xl p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#23120B] text-xs font-bold flex items-center justify-center shrink-0">
                    U2
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 2: Comunicación efectiva
                  </h2>
                </div>
                <div className="pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
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
                className="bg-[#D5C9B8] rounded-xl p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#23120B] text-xs font-bold flex items-center justify-center shrink-0">
                    U3
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 3: Introducción a la fotografía
                  </h2>
                </div>
                <div className="pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
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
                className="bg-[#D5C9B8] rounded-xl p-6 shadow-sm cursor-pointer hover:brightness-[0.98] transition-all"
              >
                <div className="flex items-center gap-3 border-b border-[#4A251B]/40 pb-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#741712] text-[#23120B] text-xs font-bold flex items-center justify-center shrink-0">
                    U4
                  </span>
                  <h2 className="text-lg md:text-xl font-bold">
                    Unidad 4: Optimizar la vidriera digital
                  </h2>
                </div>
                <div className="pl-11 pt-3 space-y-1.5 text-sm md:text-[15px]">
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
                  className="btn-artesanal px-8 py-2 text-base leading-tight text-center"
                >
                  Ir a la
                  <br />
                  primer unidad
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

          {/* ================= VISTA 1: UNIDAD 1 - PRESENTACIÓN (Pág. 4) ================= */}
          {unit === 1 && (
            <div className="space-y-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Presentación</h1>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">
                  ¿Qué es Corriente artesanal?
                </h2>

                <div
                  className="text-4xl md:text-5xl text-[#33130C] py-2 select-none leading-none"
                  style={{
                    fontFamily: '"KitSans-Light", "Cormorant Garamond", Georgia, serif',
                  }}
                >
                  <div className="tracking-[0.12em]">C~RRIENTE</div>
                  <div className="tracking-[0.1em] -mt-1">ARTESANAL</div>
                </div>

                <p className="text-sm md:text-[15px] leading-relaxed">
                  Este proyecto social tiene el objetivo de fortalecer desde la comunicación
                  visual y el diseño gráfico la presencia de los artesanos tradicionales en
                  canales digitales para que puedan acceder a un importante medio de
                  comercialización, además de trabajar sobre los conceptos e ideas percibidas
                  por el púbico adulto jóven de la ciudad de Corrientes.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">
                  ¿Qué se puede aprender de este manual?
                </h2>
                <p className="text-sm md:text-[15px] leading-relaxed">
                  Con este manual esperamos transmitir de forma sencilla los siguientes
                  conocimientos y habilidades para una comunicación más óptima.
                </p>

                <ul className="space-y-2.5 pl-3 text-base md:text-[17px]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#741712] text-lg">✵</span>
                    <span>Adquirir saberes sobre comunicación estrátegica</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#741712] text-lg">✵</span>
                    <span>Adentrarse en nociones básicas del diseño gráfico</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#741712] text-lg">✵</span>
                    <span>Comprender lo que abarca la identidad visual</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#741712] text-lg">✵</span>
                    <span>Tomar fotografías con el celular</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#741712] text-lg">✵</span>
                    <span>Como crear una vidriera digital óptima</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">
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

              <div className="pt-6 flex items-center justify-between max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(0)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Volver al
                  <br />
                  inicio
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(2)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Siguiente
                  <br />
                  unidad
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 2: UNIDAD 2 - COMUNICACIÓN EFECTIVA (Pág. 5) ================= */}
          {unit === 2 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl md:text-4xl font-bold">
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
                <h2 className="text-lg md:text-xl font-bold">
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

                {/* Esquema sobre papel rasgado tal cual el PDF */}
                <div className="bg-[#DFD5C6] border border-[#BFB29F] rounded-xl p-6 my-4 text-center shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-medium">
                    <span>
                      Comunicar enfocados en los
                      <br />
                      valores culturales
                    </span>
                    <span className="text-xl font-bold">→</span>
                    <span>
                      Articulando mensajes visuales
                      <br />
                      para ser más directos
                    </span>
                  </div>
                  <div className="border-t border-[#8B7D6B] pt-2 max-w-md mx-auto text-sm font-medium">
                    A través de una estrategia
                    <br />
                    coherente e integral
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm md:text-[15px] leading-relaxed">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                  Comunicar lo cultural
                </h2>
                <p>
                  Como todo artesano sabe, el valor de una pieza hecha a mano está más allá de
                  lo observable a simple vista, es en la mixtura de conocimientos heredados
                  sobre el material, las técnicas utilizadas, el tiempo destinado a cada
                  proceso y los detalles para lograr el mejor acabado donde reside realmente su
                  particularidad.
                </p>
                <p>
                  El conflicto surge cuando estos mensajes son recibidos por un público cada vez
                  más reducido, ya sea por desconocimiento o ignorancia, entonces en un entorno
                  de inmediatez y superficialidad no se llega a indagar en el conocimiento y
                  proceso que lleva la producción de esta índole.
                </p>
                <p>
                  Es por esto que consideramos fundamental orientar la comunicación hacía
                  mensajes que busquen reforzar estas ideas mediante la siguiente sucesión:
                </p>

                <div className="space-y-4 pt-2 max-w-lg">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <span className="col-span-4 font-bold text-base md:text-lg">Conocer</span>
                    <span className="col-span-8 text-xs md:text-sm">
                      Refiere al primer contacto, parte de un desconocimiento casi total
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <span className="col-span-4 font-bold text-base md:text-lg">Conectar</span>
                    <span className="col-span-8 text-xs md:text-sm">
                      Se busca lograrlo a través de la transmisión de su proceso, de los
                      conocimientos heredados, la relación con nuestra historia local
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <span className="col-span-4 font-bold text-base md:text-lg">Valorar</span>
                    <span className="col-span-8 text-xs md:text-sm">
                      Una vez reconocido la identidad cultural que contiene y la labor que hay
                      detrás se puede llegar a la apreciación económica del objeto
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm md:text-[15px] leading-relaxed">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                  Comunicación estratégica
                </h2>
                <p>
                  Como ya vimos anteriormente, las acciones de comunicación no son tomadas de
                  formas aisladas, sino dirigidas bajo un plan y una estrategia. Para el caso
                  de los artesanos tradicionales la estrategia gira sobre qué contar y qué no,
                  es decir definir qué aspectos de la producción son clave
                </p>

                <h3 className="font-bold pt-1">¿Qué se puede comunicar de una pieza?</h3>
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

                <h3 className="font-bold pt-2">¿Y sobre el valor que hay detrás?</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p>El tiempo de elaboración.</p>
                  <p>Origen y preparación de los materiales.</p>
                  <p>La complejidad de la técnica.</p>
                  <p>Las particularidades y variaciones de cada pieza.</p>
                  <p>La relación entre la pieza y su contexto cultural.</p>
                  <p>La relación con la tradición</p>
                </div>

                <h3 className="font-bold pt-2">
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

              <div className="pt-6 flex items-center justify-between max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(1)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Unidad
                  <br />
                  anterior
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(3)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Siguiente
                  <br />
                  unidad
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 3: UNIDAD 3 - FOTOGRAFÍA (Pág. 6) ================= */}
          {unit === 3 && (
            <div className="space-y-8 text-sm md:text-[15px] leading-relaxed">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl md:text-4xl font-bold">Fotografía</h1>
                <h2 className="text-lg md:text-xl font-bold">¿Qué es la fotografía?</h2>
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
                <h2 className="text-lg md:text-xl font-bold">Fotografiar con el celular</h2>
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

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">Definir el fondo</h2>
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
                    <h3 className="font-bold text-sm">Fondo infinito</h3>
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
                    <h3 className="font-bold text-sm">Fondo con división</h3>
                    <p className="text-xs leading-relaxed">
                      Usando piezas cartón rígido o corrugado forrados con diferentes colores y
                      texturas, se puede obtener un fondo con corte visible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">Conocer los formatos</h2>
                <p>
                  El encuadre, en fotografía, hace alusión a la porción de la escena que, como
                  fotógrafo/a, utilizarás para tus fotografías. Es decir, qué proporción de la
                  escena vas a capturar en una fotografía.
                </p>

                {/* Diagrama de proporciones 1:1, 9:16, 16:9, 3:4 */}
                <div className="flex flex-wrap items-end justify-around gap-6 py-4">
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
                <h2 className="text-lg md:text-xl font-bold">Entender los ángulos</h2>
                <p>
                  Los ángulos en la fotografía son la posición o el punto de vista desde el cual
                  se coloca la cámara con respecto al sujeto u objeto que se va a fotografiar,
                  se clasifican en:
                </p>

                {/* Esquema de ángulos sobre cesto */}
                <div className="bg-[#D5C9B8] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
                  <img
                    src="/assets/course/cesto-angulos.jpg"
                    alt="Ángulos de cámara"
                    className="w-36 h-36 object-contain rounded"
                  />
                  <ul className="space-y-2 text-xs md:text-sm font-semibold">
                    <li>• Ángulo cenital (90° desde arriba)</li>
                    <li>• Ángulo picado (45° diagonal superior)</li>
                    <li>• Ángulo normal (frente al objeto)</li>
                    <li>• Ángulo contrapicado (diagonal inferior)</li>
                    <li>• Ángulo nadir (desde abajo)</li>
                  </ul>
                </div>

                <p className="text-xs md:text-sm">
                  Conocerlos nos ayuda a ver las opciones con las que contamos al momento de
                  fotografiar para encontrar el ángulo que más le favorezca.
                </p>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="block text-xs font-semibold mb-1">Picado</span>
                    <img
                      src="/assets/course/angulo-picado.jpg"
                      alt="Ángulo Picado"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold mb-1">Normal</span>
                    <img
                      src="/assets/course/angulo-normal.jpg"
                      alt="Ángulo Normal"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold mb-1">Cenital</span>
                    <img
                      src="/assets/course/angulo-cenital.jpg"
                      alt="Ángulo Cenital"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-bold">Planificar la sesión</h2>
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

              <div className="pt-6 flex items-center justify-between max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(2)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Unidad
                  <br />
                  anterior
                </button>
                <button
                  type="button"
                  onClick={() => selectUnit(4)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Siguiente
                  <br />
                  unidad
                </button>
              </div>
            </div>
          )}

          {/* ================= VISTA 4: UNIDAD 4 - OPTIMIZAR TU VIDRIERA DIGITAL (Pág. 7) ================= */}
          {unit === 4 && (
            <div className="space-y-8 text-sm md:text-[15px] leading-relaxed">
              <div className="space-y-4">
                <h1 className="font-serif text-3xl md:text-4xl font-bold">
                  Optimizar tu vidriera digital
                </h1>
                <p>
                  Con vidriera digital nos referimos al nuevo modo de entender el comercio por
                  medios electrónicos, pasamos de las vidrieras del local físico o del stand en
                  la feria a una interfaz web que posee las siguientes ventajas:
                </p>

                <ul className="space-y-2.5 pl-3 text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#741712] text-lg leading-none mt-0.5">✵</span>
                    <span>Mayor alcance, permite llegar a muchas más personas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#741712] text-lg leading-none mt-0.5">✵</span>
                    <span>Funciona las 24hs, sin estar sujeto a tu tiempo</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#741712] text-lg leading-none mt-0.5">✵</span>
                    <span>
                      Es un espacio exclusivo para artesanos tradicionales, lo que evita
                      competencias desleales
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#741712] text-lg leading-none mt-0.5">✵</span>
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

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">Categorías de piezas</h2>
                <p>
                  Al momento de cargar un producto en tu catálogo vas a encontrar una
                  clasificación entre piezas fijas y variables
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#D5C9B8] rounded-lg p-5 space-y-2">
                    <h3 className="font-bold text-center mb-2">Piezas fijas</h3>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>Tienen un stock definido</span>
                    </p>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>El precio es visible</span>
                    </p>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>Se pueden almacenar en el MAT</span>
                    </p>
                  </div>

                  <div className="bg-[#D5C9B8] rounded-lg p-5 space-y-2">
                    <h3 className="font-bold text-center mb-2">Piezas variables</h3>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>Pueden no estar en stock pero se puede realizar un pedido</span>
                    </p>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>En vez de precio se menciona que es consultable</span>
                    </p>
                    <p className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-[#741712]">✵</span>
                      <span>Cuentan con posibilidad de hacerse personalizaciones</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs md:text-sm">
                  Al cargar los productos con precios fijos también se deberá indicar el stock
                  con el que se cuenta, la web automáticamente registrará los cambios en las
                  existencias tras las ventas. Para que la información se mantenga actualizada
                  con cada nueva tanda de producción conviene renovar los datos del stock en la
                  web.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-bold">Descripciones de piezas</h2>
                <p>
                  Como sucede en cada venta presencial, tenés la posibilidad de contar sobre la
                  elaboración de la pieza, cómo lo hiciste, de qué material, sus cualidades,
                  estos detalles permiten comprender el valor y trabajo que hay detrás,
                  asimilando y reconociendo el valor monetario, con las descripciones de los
                  productos debemos buscar hacer lo mismo pero sin que estés presente. Para eso
                  al momento de cargar un producto podés sumar estos datos como ficha técnica:
                </p>

                <div className="grid grid-cols-2 gap-6 max-w-md pt-1 text-xs md:text-sm">
                  <div className="space-y-1.5">
                    <p className="font-bold">Datos genéricos</p>
                    <p>Nombre</p>
                    <p>Medidas</p>
                    <p>Peso (si corresponde)</p>
                    <p>Precio (si corresponde)</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-bold">Datos específicos</p>
                    <p>Horas de trabajo</p>
                    <p>Material/es</p>
                    <p>Técnica/s</p>
                    <p>Breve descripción</p>
                  </div>
                </div>

                <p>
                  Es justamente en el apartado de breve descripción donde tenemos el espacio
                  para aplicar lo que aprendimos de comunicación cultural y estratégica,
                  podemos realizar una narrativa que integre la historia que hay detrás de la
                  pieza, el valor tradicional, de qué cultura o época deriva, el aspecto
                  estético, las técnicas que se implementaron, cómo se obtuvo o procesó la
                  materia prima, cuanto tiempo tomó tanto el objeto en sí como cada instancia
                  del proceso.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between max-w-lg">
                <button
                  type="button"
                  onClick={() => selectUnit(3)}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Unidad
                  <br />
                  anterior
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/mi-perfil-artesano')}
                  className="btn-artesanal px-8 py-2 text-sm md:text-base leading-tight text-center"
                >
                  Finalizar
                  <br />
                  el curso
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BARRA LATERAL DERECHA FIJA: ACCESO RÁPIDO (4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:pl-8">
          <div className="border-b border-[#4A251B] pb-1.5 mb-3">
            <h3 className="text-sm font-bold text-[#23120B]">Acceso rápido</h3>
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
                  className={`flex items-center gap-2.5 text-left hover:text-[#741712] transition-colors ${
                    unit === item.id ? 'font-bold text-[#741712]' : 'text-[#23120B]'
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

