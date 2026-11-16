import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { BlackMaskingTape } from '../components/ui';

/* 1. CREAR UNA CUENTA — COMPRADOR (segunda parte de la web .pdf pág. 2) */
export const CreateAccountPage: React.FC = () => {
  const { registerBuyer } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);
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
      setCreatedSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Ocurrió un error al crear la cuenta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-mustard-texture min-h-[82vh] py-14 md:py-20 px-4 md:px-14 flex items-center justify-center">
      <div className="paper-sheet-form max-w-[920px] w-full px-8 sm:px-14 md:px-20 pt-6 pb-14 relative">
        <BlackMaskingTape />

        {createdSuccess ? (
          <div className="py-10 text-center space-y-5">
            <CheckCircle2 className="w-14 h-14 text-[#741712] mx-auto" />
            <h1 className="font-display-serif text-4xl font-bold text-[#4A170E]">
              ¡Cuenta creada con éxito!
            </h1>
            <p className="text-base md:text-lg text-[#33130C] max-w-md mx-auto">
              Bienvenido/a, <strong>{fullName}</strong>. Tu cuenta quedó registrada en
              Supabase para descubrir y comprar artesanías tradicionales.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link to="/catalogo" className="btn-artesanal px-8 py-2.5 text-lg">
                Explorar catálogo
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7 pt-2">
            <div>
              <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#4A170E]">
                Crear una cuenta
              </h1>
              <p className="text-sm md:text-base text-[#33130C] mt-1">
                Registrate para descubrir y comprar artesanías.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Nombre y apellido* */}
              <div>
                <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                  Nombre y apellido*
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm md:text-base text-[#2E1008] mb-1.5">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
                />
              </div>

              {/* Checkbox términos */}
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`w-7 h-7 bg-[#E4A85D] flex items-center justify-center border border-[#C6893F] shrink-0 ${
                      acceptedTerms ? 'ring-2 ring-[#741712]' : ''
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
                className="btn-artesanal w-full sm:w-80 py-2.5 text-xl md:text-2xl font-bold"
                style={{ transform: 'rotate(0deg)' }}
              >
                {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>

              <Link
                to="/registro-artesano"
                className="text-xs md:text-sm text-[#741712] font-semibold hover:underline pt-1"
              >
                ¿Sos artesano tradicional? Ir al formulario de registro de artesanos →
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

/* 2. FORMULARIO DE REGISTRO DE ARTESANO (sitio web 2.pdf pág. 2) */
export const ArtisanRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerArtisan, materials } = useApp();

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [materialsText, setMaterialsText] = useState('');
  const [locality, setLocality] = useState('');
  const [instagram, setInstagram] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [brandName, setBrandName] = useState('');
  const [techniques, setTechniques] = useState('');
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
        materials_text: materialsText.trim() || 'Plata y Minerales',
        material_id: matchedMat?.id || 4,
        locality: locality.trim() || 'Corrientes Capital',
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
    <div className="bg-mustard-texture min-h-screen py-14 md:py-20 px-4 md:px-14 flex items-center justify-center">
      <div className="paper-sheet-form max-w-[940px] w-full px-8 sm:px-14 md:px-20 pt-6 pb-14 relative">
        <BlackMaskingTape />

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="max-w-xl">
            <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#4A170E]">
              Formulario de registro
            </h1>
            <p className="text-sm md:text-[15px] text-[#2E1008] mt-2 leading-relaxed">
              a los artesanos tradicionales de Corrientes Capital para brindarles
              herramientas de comunicación, ofrecerles un espacio digital para exponer y
              vender sus productos
            </p>
            <p className="italic font-bold text-sm md:text-[15.5px] text-[#7C1B15] mt-2.5">
              Su trabajo merece ser encontrado y reconocido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 pt-2">
            {/* Nombre y apellido* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Nombre y apellido*
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* DNI */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                DNI
              </label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Datos de contacto* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Datos de contacto*
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Materiales que trabaja* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Materiales que trabaja*
              </label>
              <input
                type="text"
                required
                value={materialsText}
                onChange={(e) => setMaterialsText(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Localidad* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Localidad*
              </label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Redes sociales / sitio web* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Redes sociales / sitio web*
              </label>
              <input
                type="text"
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Tiempo de trayectoria* */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Tiempo de trayectoria*
              </label>
              <input
                type="text"
                required
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Nombre del proyecto o emprendimiento */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Nombre del proyecto o emprendimiento
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>

            {/* Técnicas que utilizás */}
            <div>
              <label className="block text-sm md:text-[15px] text-[#2E1008] mb-1">
                Técnicas que utilizás
              </label>
              <input
                type="text"
                value={techniques}
                onChange={(e) => setTechniques(e.target.value)}
                className="w-full h-9 bg-[#E4A85D] px-3 text-[#2E1008] focus:outline-none focus:ring-2 focus:ring-[#741712]"
              />
            </div>
          </div>

          {/* Subí de una a tres fotos de tu producción */}
          <div className="pt-3">
            <p className="text-sm md:text-[15px] text-[#2E1008] mb-4">
              Subí de una a tres fotos de tu producción
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => (
                <label
                  key={idx}
                  className="aspect-square bg-[#E4A85D] border-[3px] border-[#613426] flex items-center justify-center cursor-pointer relative overflow-hidden group shadow-sm hover:brightness-105 transition-all"
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
                    <span className="text-6xl font-bold text-[#7A502C] group-hover:scale-110 transition-transform select-none">
                      +
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-5 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-artesanal px-10 py-2.5 text-lg md:text-xl font-bold"
            >
              {submitting ? 'Guardando perfil...' : 'Crear mi perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 3. GRACIAS POR REGISTRARTE! (sitio web 2.pdf pág. 4) */
export const RegistrationThanksPage: React.FC = () => {
  return (
    <div className="bg-mustard-texture min-h-[78vh] py-16 md:py-24 px-4 md:px-14 flex items-center justify-center">
      <div className="paper-sheet-form max-w-[920px] w-full px-8 sm:px-16 md:px-20 pt-6 pb-16 relative">
        <BlackMaskingTape />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8">
          <div className="md:col-span-7 space-y-5">
            <h1 className="font-display-serif text-4xl sm:text-5xl md:text-[48px] font-bold text-[#4A170E] leading-tight">
              Gracias por registrarte!
            </h1>

            <p className="text-base md:text-[17px] text-[#2E1008] leading-relaxed">
              Aguarde que el Museo de Artesanías Tradicionales se ponga en contacto con
              usted a través de su información de contacto, luego podrá empezar a crear su
              propio catálogo digital.
            </p>

            <p className="italic font-bold text-base md:text-[17.5px] text-[#7C1B15] pt-2">
              Te invitamos a explorar los catálogos que ya
              <br />
              fueron creados
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center gap-4 pt-4 md:pt-12">
            <Link
              to="/catalogo"
              className="btn-artesanal px-9 py-3 text-xl md:text-2xl font-bold"
            >
              Ver catálogos
            </Link>

            <Link
              to="/mi-perfil-artesano"
              className="text-xs md:text-sm text-[#4A170E] underline hover:text-[#741712] mt-2"
            >
              Ir a mi panel de autogestión y Curso de Comunicación →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

