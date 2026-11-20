import React from 'react';
import { MapPin, Clock, Phone, AtSign, Instagram } from 'lucide-react';

/* PUNTOS FÍSICOS — DISEÑO EDITORIAL ZIG-ZAG CON FOTOS CURVAS (paginas.pdf pág. 1) */
export const PhysicalPointsPage: React.FC = () => {
  return (
    <div className="bg-kraft-texture min-h-screen py-12 md:py-16 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-0">
        {/* ================= 1. MUSEO DE ARTESANÍAS TRADICIONALES ================= */}

        {/* Bloque 1: Título + Historia 1889/1981 (Izq) | Foto histórica B&N con curva izq (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 pr-0 md:pr-8 py-6 space-y-4">
            <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#4A170E] uppercase leading-tight">
              Museo de Artesanías
              <br />
              Tradicionales
            </h1>
            <p className="text-sm md:text-[15px] text-[#33130C] leading-relaxed">
              El MAT fue inaugurado el 11 de agosto de 1981, depende del Instituto de Cultura
              de la provincia.
            </p>
            <p className="text-sm md:text-[15px] text-[#33130C] leading-relaxed">
              El edificio tiene una historia compleja que data de 1889, pasando por varios
              propietarios hasta que fue adquirido por el Estado en 1977.
            </p>
          </div>

          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden">
            <img
              src="/assets/places/mat-historico.jpg"
              alt="Edificio histórico del MAT"
              className="w-full h-full object-cover md:rounded-l-[140px] shadow-sm"
            />
          </div>
        </div>

        {/* Bloque 2: Foto patio de noche con curva der (Izq) | Monumento Histórico 1989 (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden order-2 md:order-1">
            <img
              src="/assets/places/mat-patio-noche.jpg"
              alt="Patio colonial del MAT"
              className="w-full h-full object-cover md:rounded-r-[140px] shadow-sm"
            />
          </div>

          <div className="md:col-span-6 pl-0 md:pl-10 py-6 space-y-3 text-sm md:text-[15px] text-[#33130C] leading-relaxed order-1 md:order-2">
            <p>
              Declarado <strong>Monumento Histórico</strong> en 1989, es uno de los pocos
              ejemplos arquitectónicos coloniales de la ciudad. La casa, construida en 1806
              cuenta con:
            </p>
            <ul className="space-y-1.5">
              <li>• Una fachada sencilla</li>
              <li>• Ocho ventanas con rejas de hierro</li>
              <li>• Puertas de madera originales</li>
            </ul>
          </div>
        </div>

        {/* Bloque 3: Actividades y talleres (Izq) | Foto vitrina ñandutí/encajes con curva izq (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 pr-0 md:pr-8 py-6 space-y-3 text-sm md:text-[15px] text-[#33130C] leading-relaxed">
            <p>
              • Posee exhibiciones permanentes y temporales de artesanías tradicionales
            </p>
            <p>
              • Funciona como espacio donde los maestros artesanos comercializan sus piezas
            </p>
            <p>
              • Dicta talleres de enseñanza de oficios y ofrecen visitas guiadas y educativas
            </p>
            <p>
              • Organiza ferias y eventos culturales, homenajes tradicionales y encuentros
              comunitarios
            </p>
          </div>

          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden">
            <img
              src="/assets/places/mat-vitrina-encaje.jpg"
              alt="Vitrina de tejidos tradicionales"
              className="w-full h-full object-cover md:rounded-l-[140px] shadow-sm"
            />
          </div>
        </div>

        {/* Bloque 4: Foto sala del museo con curva der (Izq) | Frase de misión en cursiva roja (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden order-2 md:order-1">
            <img
              src="/assets/places/museo-mat.jpg"
              alt="Sala de exposición del MAT"
              className="w-full h-full object-cover md:rounded-r-[140px] shadow-sm"
            />
          </div>

          <div className="md:col-span-6 pl-0 md:pl-10 py-8 order-1 md:order-2">
            <p className="font-display-serif italic font-bold text-2xl sm:text-3xl md:text-[32px] text-[#7C1B15] leading-snug">
              Su misión es mantener
              <br />
              vivas estas expresiones
              <br />
              populares, reflejando
              <br />
              la cultura regional.
            </p>
          </div>
        </div>

        {/* Bloque 5: Datos de contacto y horarios del MAT (Izq) | Foto vitrina sombreros y cestería con curva izq (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 pr-0 md:pr-8 py-6 space-y-2.5 text-sm md:text-[15px] text-[#33130C]">
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
                En la semana de 9:00 a 20:00 hs.
                <br />
                Sábado, domingo y feriados de 9:00 a 21 hs.
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

            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-[#4A170E] shrink-0" />
              <span>museodeartesaniastradicionales</span>
            </div>
          </div>

          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden">
            <img
              src="/assets/places/mat-vitrina-sombreros.jpg"
              alt="Cestería y sombreros en el MAT"
              className="w-full h-full object-cover md:rounded-l-[140px] shadow-sm"
            />
          </div>
        </div>

        {/* ================= 2. FERIA ITA BERA ================= */}

        {/* Bloque 6: Foto costanera con curva der (Izq) | Título FERIA ITA BERA y descripción (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden order-2 md:order-1">
            <img
              src="/assets/places/feria-costanera.jpg"
              alt="Paseo Feria Ita Bera en Costanera"
              className="w-full h-full object-cover md:rounded-r-[140px] shadow-sm"
            />
          </div>

          <div className="md:col-span-6 pl-0 md:pl-10 py-6 space-y-4 order-1 md:order-2">
            <h2 className="font-display-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#4A170E] uppercase">
              Feria Ita Bera
            </h2>
            <p className="text-sm md:text-[15px] text-[#33130C] leading-relaxed">
              La feria conocida como Espacio Itá Berá es un paseo de artesanos y
              emprendedores correntinos.
            </p>
            <p className="text-sm md:text-[15px] text-[#33130C] leading-relaxed">
              El proyecto nació como un colectivo multimarca liderado por mujeres
              emprendedoras para promover el diseño local, la sustentabilidad y el turismo.
            </p>
          </div>
        </div>

        {/* Bloque 7: ¿Qué vas a encontrar? (Izq) | Foto stand frente al río con curva izq (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 pr-0 md:pr-8 py-6 space-y-2.5 text-sm md:text-[15px] text-[#33130C] leading-relaxed">
            <p className="font-semibold">¿Qué vas a encontrar?</p>
            <p>• Productos artesanales y regionales de Corrientes.</p>
            <p>• Souvenirs, regalería personalizada y decoración.</p>
            <p>• Artesanías en cerámica, macramé y accesorios.</p>
            <p>
              • Gastronomía local (como chipá y alfajores de yerba mate) e infusiones.
            </p>
          </div>

          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden">
            <img
              src="/assets/places/feria-stand-rio.jpg"
              alt="Stand de artesanías frente al río Paraná"
              className="w-full h-full object-cover md:rounded-l-[140px] shadow-sm"
            />
          </div>
        </div>

        {/* Bloque 8: Foto paseo con cintas rojas y curva der (Izq) | Dirección y horarios de Feria Ita Bera (Der) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-6 h-60 md:h-64 overflow-hidden order-2 md:order-1">
            <img
              src="/assets/places/feria-cintas-rojas.jpg"
              alt="Feria Ita Bera en Punta Tacuara"
              className="w-full h-full object-cover md:rounded-r-[140px] shadow-sm"
            />
          </div>

          <div className="md:col-span-6 pl-0 md:pl-10 py-6 space-y-2.5 text-sm md:text-[15px] text-[#33130C] order-1 md:order-2">
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
                Sábados, domingos y feriados de 14:00 hs a 20:30 hs
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

            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-[#4A170E] shrink-0" />
              <span>Espacioitabera</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
