import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { BrandLogo } from '../components/Layout';

const BurgundyBackdropStyle: React.CSSProperties = {
  backgroundColor: '#5B2B29',
  backgroundImage: 'url("/assets/ui/fondo-bordo-textura.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

/* 1. CREAR UNA CUENTA — CLIENTE / COMPRADOR (Parte de la web Andrés pág. 7) */
export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerBuyer, loginAsDemoClient, loginAsDemoArtisan } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Por favor completá los campos obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMsg('Debés aceptar los términos y condiciones.');
      return;
    }

    setSubmitting(true);
    try {
      await registerBuyer({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        accepted_terms: acceptedTerms,
      });
      // Al crear cuenta como cliente, redirige a su perfil de cliente (/mi-perfil: "Los productos que compraste" + "Productos favoritos")
      navigate('/mi-perfil');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Ocurrió un error al crear la cuenta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[82vh] pt-14 md:pt-20 px-4 md:px-14 flex items-end justify-center"
      style={{ ...BurgundyBackdropStyle, paddingBottom: 0 }}
    >
      <div className="bg-[#C8B5A0] rounded-t-[28px] rounded-b-none max-w-[900px] w-full px-5 sm:px-14 md:px-20 pt-12 pb-20 md:pb-24 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-[#4A170E]">
              Crear una cuenta
            </h1>
            <p className="text-sm md:text-base text-[#33130C] mt-1">
              Registrate para descubrir y comprar artesanías.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 md:gap-y-6">
            <div>
              <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                Nombre y apellido*
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-10 bg-[#DF953A] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 bg-[#DF953A] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 bg-[#DF953A] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 bg-[#DF953A] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 bg-[#DF953A] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`w-7 h-7 bg-[#DF953A] flex items-center justify-center border border-[#C6893F] shrink-0 ${acceptedTerms ? 'ring-2 ring-[#741712]' : ''
                    }`}
                >
                  {acceptedTerms && (
                    <span className="text-[#4A170E] font-bold text-lg">✓</span>
                  )}
                </span>
                <span className="text-xs md:text-[13px] text-[#2E1008] leading-tight">
                  Acepto los términos y condiciones
                  <br />y la política de privacidad
                </span>
              </label>
            </div>
          </div>

          {errorMsg && (
            <p className="text-sm font-semibold text-[#741712] text-center">{errorMsg}</p>
          )}

          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn-ui-marron w-full sm:w-80 py-2.5 text-xl md:text-2xl font-bold"
            >
              {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-[#4A170E]">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoClient();
                  navigate('/mi-perfil');
                }}
                className="font-semibold underline hover:text-[#741712]"
              >
                Ingresar como Cliente (Andrés Navarro)
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => {
                  loginAsDemoArtisan(1);
                  navigate('/mi-perfil-artesano');
                }}
                className="font-semibold underline hover:text-[#741712]"
              >
                Ingresar como Artesano (Ariel Morales)
              </button>
              <span>|</span>
              <Link
                to="/registro-artesano"
                className="font-semibold underline hover:text-[#741712]"
              >
                Registrarme como Artesano
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 2. FORMULARIO DE REGISTRO DE ARTESANO (Parte de la web Andrés pág. 1) */
export const ArtisanRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerArtisan, materials, loginAsDemoArtisan } = useApp();

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [materialsText, setMaterialsText] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [instagram, setInstagram] = useState('');
  const [techniques, setTechniques] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([
    'Entrega en ferias',
    'Acordar punto de encuentro',
    'Depositar en el Museo de artesanías',
  ]);
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleDeliveryOption = (opt: string) => {
    setDeliveryOptions((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  const handlePhotoUpload = async (idx: number, file?: File | null) => {
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const url = await uploadMediaFile(file, 'registro-artesano');
      setPhotos((prev) => prev.map((p, i) => (i === idx ? url : p)));
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const matchedMat = materials.find((m) =>
        materialsText.toLowerCase().includes(m.name.split(' ')[0].toLowerCase())
      );

      await registerArtisan({
        full_name: fullName.trim() || 'Artesano Tradicional',
        password,
        dni: dni.trim(),
        phone: phone.trim() || '3794 557744',
        materials_text: materialsText.trim() || 'Cuero crudo',
        material_id: matchedMat?.id || 1,
        locality: 'Corrientes Capital',
        instagram: instagram.trim() || 'Artesanales_Corrientes',
        experience_years: experienceYears.trim() || '10 años',
        brand_name: brandName.trim() || `Artesanales ${fullName.trim()}`,
        techniques: techniques.trim() || 'Cincelado',
        production_photos: photos.filter(Boolean) as string[],
      });

      navigate('/gracias-registro');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen py-14 md:py-20 px-4 md:px-14 flex items-center justify-center"
      style={BurgundyBackdropStyle}
    >
      <div className="bg-[#C8B5A0] rounded-[28px] max-w-[880px] w-full px-5 sm:px-14 md:px-16 py-12 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[40px] font-normal text-[#4A170E]">
            Formulario de registro
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 pt-1">
            <div className="space-y-5">
              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Nombre y apellido*
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  DNI*
                </label>
                <input
                  type="text"
                  required
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Materiales que trabajas*
                </label>
                <input
                  type="text"
                  required
                  value={materialsText}
                  onChange={(e) => setMaterialsText(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Redes sociales*
                </label>
                <input
                  type="text"
                  required
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Correo electrónico*
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Nombre del proyecto o emprendimiento
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Contraseña*
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Número de teléfono*
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Tiempo de trayectoria*
                </label>
                <input
                  type="text"
                  required
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div>
                <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                  Técnicas que utilizás
                </label>
                <input
                  type="text"
                  value={techniques}
                  onChange={(e) => setTechniques(e.target.value)}
                  className="w-full h-9 bg-[#DF9F57] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              <div className="pt-1 space-y-2 text-xs md:text-sm text-[#2E1008]">
                <p className="font-medium leading-snug">
                  ¿Qué formas de entrega te parecen cómodas?
                  <br />
                  (seleccioná todas las correctas)
                </p>

                {[
                  'Retiro por tu taller',
                  'Entrega en ferias',
                  'Acordar punto de encuentro',
                  'Depositar en el Museo de artesanías',
                ].map((opt) => {
                  const active = deliveryOptions.includes(opt);
                  return (
                    <label
                      key={opt}
                      onClick={() => toggleDeliveryOption(opt)}
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border border-[#DF9F57] shrink-0 ${active ? 'bg-[#DF9F57]' : 'bg-transparent'
                          }`}
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm md:text-[15px] text-[#2E1008] mb-4">
              Subí de una a tres fotos de tu producción
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => (
                <label
                  key={idx}
                  className="aspect-square bg-[#E8D2B0] border-[3px] border-[#613426] flex items-center justify-center cursor-pointer relative overflow-hidden group shadow-sm hover:brightness-105 transition-all"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handlePhotoUpload(idx, e.target.files?.[0])}
                  />
                  {photos[idx] ? (
                    <img
                      src={photos[idx]!}
                      alt={`Producción ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : uploadingIdx === idx ? (
                    <span className="text-sm font-bold text-[#613426]">Subiendo...</span>
                  ) : (
                    <img
                      src="/assets/products/signomas_individual.svg"
                      alt="+"
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform select-none pointer-events-none"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-5 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn-ui-rojo px-10 py-2.5 text-lg md:text-xl font-bold"
            >
              {submitting ? 'Guardando perfil...' : 'Crear mi perfil'}
            </button>

            <button
              type="button"
              onClick={() => {
                loginAsDemoArtisan(1);
                navigate('/mi-perfil-artesano');
              }}
              className="text-xs md:text-sm text-[#4A170E] font-semibold underline hover:text-[#741712]"
            >
              ¿Ya tenés perfil de artesano? Ingresar como Artesanales Ariel Morales →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 3. GRACIAS POR REGISTRARTE! (Parte de la web Andrés pág. 2) */
const BeigeCardStyle: React.CSSProperties = {
  backgroundColor: '#E5D2B3',
  backgroundImage: 'url("/assets/ui/fondo-beige-textura.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'multiply',
};
export const RegistrationThanksPage: React.FC = () => {
  return (
    <div
      className="min-h-[82vh] pt-16 md:pt-24 pb-0 -mb-16 md:-mb-24 px-4 md:px-14 flex items-end justify-center relative z-0"
      style={BurgundyBackdropStyle}
    >
      <div className="relative max-w-[1160px] w-full px-14 sm:px-24 md:px-36 pt-36 md:pt-48 pb-32 md:pb-44">
        {/* Recurso gráfico */}
        <img
          src="/assets/ui/Recursos%20web%20-02.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none opacity-85"
        />

        {/* Contenido por encima de la imagen */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          {/* Columna izquierda: Título y textos */}
          <div className="max-w-[500px] space-y-5">
            <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-[#4A170E] leading-tight">
              Gracias por registrarte!
            </h1>

            <p className="text-base md:text-[17px] text-[#2E1008] leading-relaxed">
              Aguardá que el Museo de Artesanías Tradicionales se ponga en contacto a
              través de su medio de contacto, una vez que sea aceptado podrás crear tu
              propio catálogo digital.
            </p>

            <p className="italic font-bold text-base md:text-[17.5px] text-[#7C1B15] pt-2">
              Te invitamos a explorar los catálogos que ya
              <br />
              fueron creados
            </p>
          </div>

          {/* Columna derecha: Botón alineado a la base del texto */}
          <div className="flex flex-col items-start md:items-center gap-3 shrink-0 md:pb-1">
            <Link
              to="/catalogo"
              className="btn-artesanal px-9 py-3 text-xl md:text-2xl font-bold whitespace-nowrap"
            >
              Ver catálogos
            </Link>

            <Link
              to="/mi-perfil-artesano"
              className="text-xs md:text-sm text-[#4A170E] underline hover:text-[#741712] text-center max-w-[230px]"
            >
              Ir a mi panel de catálogo y Curso de Comunicación →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 4. PÁGINA INSTITUCIONAL CORRIENTE ARTESANAL (2 Página Corriente artesanal_) */
export const AboutPage: React.FC = () => {
  return (
    <div
      className="min-h-[82vh] pb-16 md:pb-24 flex flex-col items-center justify-between bg-cover bg-center"
      style={{
        backgroundColor: '#C9B69E',
        backgroundImage: "url('/assets/ui/fondo-beige-textura.webp')",
      }}
    >
      {/* Guarda horizontal superior de cruz andina/guaraní (Recursos web -01.svg) */}
      <div className="w-full overflow-hidden pt-4 md:pt-6 select-none pointer-events-none">
        <img
          src="/assets/ui/guarda-cruz-horizontal.svg"
          alt="Guarda Corriente Artesanal"
          className="w-full h-16 md:h-24 object-cover object-center"
        />
      </div>

      <div className="max-w-[740px] mx-auto px-6 md:px-16 py-8 text-center space-y-8 text-[#2B0F08]">
        {/* Logo vectorial oficial (Recursos web -02.svg) */}
        <div className="flex justify-center">
          <BrandLogo size="lg" className="!text-[#360E07] !h-24 md:!h-32" />
        </div>

        <h1 className="font-display-serif italic font-bold text-2xl sm:text-3xl md:text-[34px] text-[#360E07] leading-snug">
          Lo que lleva tiempo hacer,
          <br />
          merece tiempo para valorar.
        </h1>

        <div className="text-left space-y-5 text-base md:text-[17px] leading-relaxed">
          <p>
            Creemos que detrás de cada artesanía hay mucho más que un objeto: hay manos que
            crean, conocimientos que se transmiten, historias que perduran y tiempo dedicado
            a transformar materiales en piezas con identidad propia.
          </p>
          <p>
            En Corriente Artesanal queremos acercarte a ese universo. Somos un espacio que
            conecta a quienes crean con quienes desean descubrir, elegir y llevarse un
            pedacito de nuestra cultura a su hogar.
          </p>
          <p>
            Nos invita la idea de detenernos a mirar, conocer lo que hay detrás de cada
            pieza y reconocer el valor de aquello que se hace con dedicación. Porque lo
            artesanal no solo se contempla: también se vive, se comparte y encuentra un
            lugar en nuestra vida cotidiana.
          </p>
          <p>Te invitamos a descubrir, conectar y valorar lo nuestro.</p>
        </div>
      </div>

      {/* Guarda horizontal inferior de cruz andina/guaraní (Recursos web -01.svg) */}
      <div className="w-full overflow-hidden pt-4 select-none pointer-events-none">
        <img
          src="/assets/ui/guarda-cruz-horizontal.svg"
          alt="Guarda Corriente Artesanal"
          className="w-full h-16 md:h-24 object-cover object-center"
        />
      </div>
    </div>
  );
};
