import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp, PieceFormInput } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { Product } from '../types/database';
import { ProductCard } from '../components/ui';

/* PANEL EXCLUSIVO DEL ROL ARTESANO: CRUD DE CATÁLOGO Y ACCESO AL CURSO (paginas.pdf págs. 5 y 6, Parte de la web Andrés pág. 3) */
export const ArtisanDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    artisans,
    products,
    activeArtisanId,
    updateArtisanProfile,
    savePiece,
    deletePiece,
    logout,
  } = useApp();

  // Estado del formulario CRUD de Pieza (Crear, Editar, Eliminar)
  const [editingMode, setEditingMode] = useState<'none' | 'create' | 'edit'>('none');
  const [pieceForm, setPieceForm] = useState<PieceFormInput>({
    name: '',
    dimensions: '',
    price: null,
    stock: 2,
    work_hours: '',
    material_label: '',
    material_id: 1,
    technique: '',
    short_description: '',
    category_type: 'utilitario',
    is_featured: false,
    image_url: '',
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingPiece, setSavingPiece] = useState(false);

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.id === activeArtisanId) ||
      artisans.find((a) => a.slug === 'ariel-morales') ||
      artisans[0]
    );
  }, [artisans, activeArtisanId]);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingHistory, setIsEditingHistory] = useState(false);
  const [phone, setPhone] = useState(artisan.phone);
  const [instagram, setInstagram] = useState(artisan.instagram || 'Artesanales_Eltimbo');
  const [address, setAddress] = useState(artisan.address || 'Taller 9 de Julio 111');
  const [shortBio, setShortBio] = useState(artisan.short_bio);
  const [historyText, setHistoryText] = useState(artisan.history_text);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const [openShared, setOpenShared] = useState(true);
  const [openSold, setOpenSold] = useState(true);
  const [openBought, setOpenBought] = useState(true);

  useEffect(() => {
    setPhone(artisan.phone);
    setInstagram(artisan.instagram || 'Artesanales_Eltimbo');
    setAddress(artisan.address || 'Taller 9 de Julio 111');
    setShortBio(artisan.short_bio);
    setHistoryText(artisan.history_text);
  }, [artisan]);

  const sharedProducts = useMemo(() => {
    const sameMat = products.filter((p) => p.material_id === (artisan.material_id || 1));
    if (sameMat.length >= 8) {
      const mLechuza = products.find((p) => p.slug === 'mate-lechuza') || sameMat[0];
      const bCarp =
        products.find((p) => p.slug === 'billetera-de-carpincho') || sameMat[1];
      const mFam =
        products.find((p) => p.slug === 'mate-familia-de-carpinchos') || sameMat[2];
      const bill = products.find((p) => p.slug === 'billetera-cincelada') || sameMat[3];
      return [mLechuza, bCarp, mFam, bill, ...sameMat.slice(4, 8)];
    }
    return products.slice(0, 8);
  }, [products, artisan]);

  const openCreateForm = () => {
    setPieceForm({
      name: '',
      dimensions: '',
      price: null,
      stock: 2,
      work_hours: '',
      material_label: 'Cuero',
      material_id: artisan.material_id || 1,
      technique: '',
      short_description: '',
      category_type: 'utilitario',
      is_featured: false,
      image_url: '',
    });
    setEditingMode('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditForm = (prod: Product) => {
    setPieceForm({
      id: prod.id,
      name: prod.name,
      dimensions:
        prod.dimensions === '11 cm x 7 cm' ? '11 x 7 centímetros' : prod.dimensions,
      price: prod.price ?? 15000,
      stock: prod.stock,
      work_hours: prod.work_hours.replace(/\D/g, '') || '8',
      material_label: prod.material_label,
      material_id: prod.material_id,
      technique: prod.technique,
      short_description: prod.short_description,
      category_type: prod.category_type,
      is_featured: prod.is_featured,
      image_url: prod.main_image_url,
    });
    setEditingMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhotoUpload = async (file?: File | null) => {
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadMediaFile(file, 'productos');
      setPieceForm((prev) => ({ ...prev, image_url: url }));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSavePiece = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPiece(true);
    try {
      await savePiece(artisan.id, pieceForm);
      setFeedbackMsg(
        editingMode === 'create'
          ? '¡Nueva pieza publicada en tu catálogo!'
          : '¡Cambios de la pieza guardados en tu catálogo!'
      );
      setEditingMode('none');
    } finally {
      setSavingPiece(false);
    }
  };

  const handleDeletePiece = async () => {
    if (!pieceForm.id) return;
    setSavingPiece(true);
    try {
      await deletePiece(pieceForm.id);
      setFeedbackMsg('Pieza eliminada del catálogo.');
      setEditingMode('none');
    } finally {
      setSavingPiece(false);
    }
  };

  /* ================= PANTALLA CRUD DE ALTA / EDICIÓN / ELIMINACIÓN DE PIEZA ================= */
  if (editingMode !== 'none') {
    return (
      <div className="bg-kraft-texture min-h-screen py-12 md:py-16 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto bg-[#D6BFA6]/85 rounded-2xl p-8 md:p-12 shadow-md">
          <form onSubmit={handleSavePiece}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-6 space-y-4 text-sm md:text-[15.5px] text-[#2B0F08]">
                <div className="flex items-baseline gap-2">
                  <label className="font-medium shrink-0">Nombre de la pieza:</label>
                  <input
                    type="text"
                    required
                    value={pieceForm.name}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Billetera"
                    className="w-full bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5 font-medium"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="font-medium shrink-0">Medidas:</label>
                  <input
                    type="text"
                    value={pieceForm.dimensions}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, dimensions: e.target.value }))
                    }
                    placeholder="11 x 7 centímetros"
                    className="w-full bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-medium">
                    Precio (si se omite queda como consultable):
                  </label>
                  <div className="flex items-center gap-1">
                    <span>$</span>
                    <input
                      type="number"
                      value={pieceForm.price ?? ''}
                      onChange={(e) =>
                        setPieceForm((prev) => ({
                          ...prev,
                          price: e.target.value ? Number(e.target.value) : null,
                        }))
                      }
                      placeholder="15.000"
                      className="w-40 bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                    />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="font-medium shrink-0">
                    Stock (si contas con existencias):
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={pieceForm.stock}
                    onChange={(e) =>
                      setPieceForm((prev) => ({
                        ...prev,
                        stock: Number(e.target.value),
                      }))
                    }
                    className="w-20 bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                  />
                </div>

                <div className="flex items-baseline gap-2 pt-2">
                  <label className="font-medium shrink-0">Horas de trabajo:</label>
                  <input
                    type="text"
                    value={pieceForm.work_hours}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, work_hours: e.target.value }))
                    }
                    placeholder="8"
                    className="w-full bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="font-medium shrink-0">Material/es:</label>
                  <input
                    type="text"
                    value={pieceForm.material_label}
                    onChange={(e) =>
                      setPieceForm((prev) => ({
                        ...prev,
                        material_label: e.target.value,
                      }))
                    }
                    placeholder="Cuero"
                    className="w-full bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="font-medium shrink-0">Técnica/s:</label>
                  <input
                    type="text"
                    value={pieceForm.technique}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, technique: e.target.value }))
                    }
                    placeholder="Cincelado"
                    className="w-full bg-transparent border-b border-[#6A4535]/50 focus:border-[#4A170E] focus:outline-none py-0.5"
                  />
                </div>

                {editingMode === 'create' && (
                  <div className="space-y-1 pt-1">
                    <label className="block font-medium">Descripción:</label>
                    <textarea
                      rows={2}
                      value={pieceForm.short_description}
                      onChange={(e) =>
                        setPieceForm((prev) => ({
                          ...prev,
                          short_description: e.target.value,
                        }))
                      }
                      placeholder="Historia y proceso de elaboración de la pieza..."
                      className="w-full bg-[#DFCCB6]/60 rounded p-2 text-sm focus:outline-none"
                    />
                  </div>
                )}

                <div className="pt-3 space-y-2">
                  <p className="font-medium">Categoría</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="cat_type"
                      checked={pieceForm.category_type === 'decorativo'}
                      onChange={() =>
                        setPieceForm((prev) => ({
                          ...prev,
                          category_type: 'decorativo',
                        }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border border-[#D8923E] flex items-center justify-center ${
                        pieceForm.category_type === 'decorativo'
                          ? 'bg-[#D8923E]'
                          : 'bg-transparent'
                      }`}
                    />
                    <span>Decorativo</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="cat_type"
                      checked={pieceForm.category_type === 'utilitario'}
                      onChange={() =>
                        setPieceForm((prev) => ({
                          ...prev,
                          category_type: 'utilitario',
                        }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border border-[#D8923E] flex items-center justify-center ${
                        pieceForm.category_type === 'utilitario'
                          ? 'bg-[#D8923E]'
                          : 'bg-transparent'
                      }`}
                    />
                    <span>Utilitario</span>
                  </label>
                </div>

                <div className="pt-3 space-y-2">
                  <p className="font-medium">¿Es un diseño de autor exclusivo?</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="exclusive"
                      checked={pieceForm.is_featured === true}
                      onChange={() =>
                        setPieceForm((prev) => ({ ...prev, is_featured: true }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border border-[#D8923E] flex items-center justify-center ${
                        pieceForm.is_featured ? 'bg-[#D8923E]' : 'bg-transparent'
                      }`}
                    />
                    <span>Si</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="exclusive"
                      checked={pieceForm.is_featured === false}
                      onChange={() =>
                        setPieceForm((prev) => ({ ...prev, is_featured: false }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border border-[#D8923E] flex items-center justify-center ${
                        !pieceForm.is_featured ? 'bg-[#D8923E]' : 'bg-transparent'
                      }`}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Columna derecha: Añadir fotografías (3:4) */}
              <div className="md:col-span-6 space-y-3">
                <p className="text-sm md:text-[15.5px] text-[#2B0F08] font-medium">
                  Añadir fotografías
                </p>

                <label className="block w-full aspect-[3/3.8] bg-black cursor-pointer relative overflow-hidden shadow-md group">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
                  />
                  {pieceForm.image_url ? (
                    <img
                      src={pieceForm.image_url}
                      alt={pieceForm.name || 'Fotografía de la pieza'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl font-bold text-[#B8A18A] group-hover:scale-110 transition-transform select-none">
                        +
                      </span>
                    </div>
                  )}
                  {uploadingPhoto && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
                      Subiendo fotografía...
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              {editingMode === 'create' ? (
                <div className="w-full flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingMode('none')}
                    className="px-6 py-2 text-sm font-semibold text-[#4A170E] hover:underline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={savingPiece}
                    className="btn-artesanal-dark px-14 py-2 text-lg"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    {savingPiece ? 'Publicando...' : 'Publicar'}
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={savingPiece}
                    className="btn-artesanal-dark px-10 py-2 text-base md:text-lg"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    {savingPiece ? 'Guardando...' : 'Guardar cambios'}
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingMode('none')}
                      className="text-sm font-semibold text-[#4A170E] hover:underline"
                    >
                      Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePiece}
                      disabled={savingPiece}
                      className="btn-artesanal-dark px-12 py-2 text-base md:text-lg"
                      style={{ transform: 'rotate(0deg)' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-10">
        {feedbackMsg && (
          <div className="bg-[#4E120B] text-[#F4E6D4] px-5 py-3 rounded-lg text-sm font-medium shadow">
            {feedbackMsg}
          </div>
        )}

        {/* 1. BLOQUE SUPERIOR DE PERFIL (2 COLUMNAS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-8">
          <div className="md:col-span-5 relative bg-[#865D4E] text-[#F5E9D9] rounded-xl px-7 pt-16 pb-8 shadow-md flex flex-col justify-between">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden bg-[#5B2220] shadow-lg flex items-center justify-center text-5xl font-bold text-[#C8A796]">
              +
            </div>

            <div className="text-center mt-2">
              <h1 className="italic font-bold text-2xl md:text-[26px] text-[#E6CEB5] leading-tight">
                {artisan.brand_name.includes('Ariel') ? (
                  <>
                    Artesanales
                    <br />
                    Ariel Morales
                  </>
                ) : (
                  artisan.brand_name
                )}
              </h1>
            </div>

            <div className="mt-6 space-y-2 text-sm md:text-[15px] text-[#F5E9D9]">
              <p className="font-semibold">Datos de contacto:</p>
              {isEditingBio ? (
                <>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                  />
                </>
              ) : (
                <>
                  <p>{phone}</p>
                  <p>{instagram}</p>
                  <p>{address}</p>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-7 bg-[#D6BFA6]/85 rounded-xl p-7 md:p-9 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg md:text-xl text-[#4A170E] mb-3">
                Un poco sobre mí...
              </h2>
              {isEditingBio ? (
                <textarea
                  rows={4}
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  className="w-full bg-[#DFCCB6] p-3 rounded text-sm md:text-base text-[#33130C] focus:outline-none"
                />
              ) : (
                <p className="text-base md:text-[17px] text-[#33130C] leading-relaxed">
                  Hola! soy {artisan.full_name.split(' ')[0]}, Desde hace más de diez años me
                  dedico a trabajar con cuero crudo.. Mi especialidad es la elaboración de
                  billeteras, mates y accesorios artesanales, piezas que realizo cuidando cada
                  detalle.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              {isEditingBio ? (
                <>
                  <button
                    type="button"
                    onClick={async () => {
                      await updateArtisanProfile(artisan.id, {
                        phone,
                        instagram,
                        address,
                        short_bio: shortBio,
                      });
                      setIsEditingBio(false);
                      setFeedbackMsg('Perfil actualizado en Supabase.');
                    }}
                    className="btn-artesanal-dark px-8 py-1.5 text-sm md:text-base"
                  >
                    Guardar mi perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/crear-cuenta');
                    }}
                    className="text-xs text-[#741712] font-semibold underline"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingBio(true)}
                  className="btn-artesanal-dark px-8 py-1.5 text-sm md:text-base"
                >
                  Editar mi perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. CONTÁ TU HISTORIA */}
        <div className="bg-[#D6BFA6]/85 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-7 p-7 md:p-9">
            <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] mb-3">
              Contá tu historia
            </h2>
            {isEditingHistory ? (
              <textarea
                rows={4}
                value={historyText}
                onChange={(e) => setHistoryText(e.target.value)}
                className="w-full bg-[#DFCCB6] p-3 rounded text-sm text-[#3B170E] focus:outline-none"
              />
            ) : (
              <p className="text-sm md:text-[15px] text-[#3B170E] leading-relaxed">
                {historyText}
              </p>
            )}
          </div>

          <div className="md:col-span-5 bg-[#865D4E] md:rounded-l-[120px] p-6 flex flex-col items-center justify-center gap-3">
            <span className="text-6xl font-bold text-[#C8A796] select-none">+</span>
            {isEditingHistory ? (
              <button
                type="button"
                onClick={async () => {
                  await updateArtisanProfile(artisan.id, {
                    history_text: historyText,
                  });
                  setIsEditingHistory(false);
                  setFeedbackMsg('Historia guardada en Supabase.');
                }}
                className="btn-artesanal-dark px-6 py-1.5 text-sm"
              >
                Guardar descripción
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingHistory(true)}
                className="btn-artesanal-dark px-6 py-1.5 text-sm"
              >
                Editar descripción
              </button>
            )}
          </div>
        </div>

        {/* 3. OPTIMIZÁ TU VIDRIERA DIGITAL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          <div className="max-w-lg">
            <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E]">
              Optimizá tu vidriera digital
            </h2>
            <p className="text-xs md:text-sm text-[#3B170E] mt-1.5 leading-relaxed">
              ¿Querés aprender a promocionar tus piezas de forma práctica y eficiente para
              comunicar su valor cultural? accedé a un curso corto y aprendé esto y mucho
              más.
            </p>
          </div>

          <Link
            to="/curso"
            className="btn-artesanal px-10 py-2 text-base md:text-lg shrink-0 text-center"
          >
            Ver Curso
          </Link>
        </div>

        {/* 4. COMPARTÍ UNA NUEVA PIEZA */}
        <section className="space-y-4">
          <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E]">
            Compartí una nueva pieza
          </h2>

          <div
            onClick={openCreateForm}
            className="w-44 sm:w-48 cursor-pointer flex flex-col rounded-b-[22px] overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-[#865D4E] w-full aspect-[3/3.3] flex items-center justify-center">
              <span className="text-6xl font-bold text-[#C8A796] select-none">+</span>
            </div>
            <div className="product-card-footer bg-[#DCC7AE] px-4 pt-2 pb-4 flex justify-center">
              <button
                type="button"
                className="relative z-10 btn-artesanal-dark px-7 py-1 text-sm"
                style={{ transform: 'rotate(0deg)' }}
              >
                Añadir
              </button>
            </div>
          </div>
        </section>

        {/* 5. LOS PRODUCTOS QUE COMPARTISTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenShared((v) => !v)}
            className="w-full bg-[#CDB59C] hover:bg-[#C3A98E] rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span className="font-display-serif text-2xl md:text-[30px] font-bold text-[#4A170E]">
              Los productos que compartiste
            </span>
            <span className="text-[#4A170E] text-xl">{openShared ? '▼' : '▶'}</span>
          </button>

          {openShared && (
            <div className="space-y-4">
              <p className="text-xs md:text-sm text-[#3B170E] px-1">
                Selecciona un producto para eliminarlo o editar su información.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sharedProducts.map((prod, idx) => (
                  <ProductCard
                    key={`shared-${prod.id}-${idx}`}
                    product={prod}
                    artisan={artisan}
                    highlighted={idx === 0}
                    showArtisanName={false}
                    onClickOverride={(p) => openEditForm(p)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 6. LOS PRODUCTOS QUE VENDISTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenSold((v) => !v)}
            className="w-full bg-[#CDB59C] hover:bg-[#C3A98E] rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span className="font-display-serif text-2xl md:text-[30px] font-bold text-[#4A170E]">
              Los productos que vendiste
            </span>
            <span className="text-[#4A170E] text-xl">{openSold ? '▼' : '▶'}</span>
          </button>

          {openSold && (
            <div className="bg-[#D6BFA6]/80 rounded-2xl p-6 md:p-8 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm md:text-[15px] text-[#2B0F08]">
                <thead>
                  <tr className="border-b border-[#8C6E58]/50 font-bold">
                    <th className="pb-3 pr-4">Fecha</th>
                    <th className="pb-3 pr-4">Producto</th>
                    <th className="pb-3 pr-4">Importe</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8C6E58]/30">
                  <tr>
                    <td className="py-3 pr-4">17 Dic 2026</td>
                    <td className="py-3 pr-4 italic font-bold">Mate Yaguareté</td>
                    <td className="py-3 pr-4">$ 60.000</td>
                    <td className="py-3">Por retirar</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">15 Dic 2026</td>
                    <td className="py-3 pr-4 italic font-bold">Mate Flor</td>
                    <td className="py-3 pr-4">$ 50.000</td>
                    <td className="py-3">Retirado</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">14 Dic 2026</td>
                    <td className="py-3 pr-4 italic font-bold">Termera mediana</td>
                    <td className="py-3 pr-4">$ 90.000</td>
                    <td className="py-3">Retirado</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">13 Dic 2026</td>
                    <td className="py-3 pr-4 italic font-bold">Billetera Sol</td>
                    <td className="py-3 pr-4">$ 15.000</td>
                    <td className="py-3">Retirado</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">13 Dic 2026</td>
                    <td className="py-3 pr-4 italic font-bold">Billetera Fileteada</td>
                    <td className="py-3 pr-4">$ 15.000</td>
                    <td className="py-3">Retirado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 7. LOS PRODUCTOS QUE COMPRASTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenBought((v) => !v)}
            className="w-full bg-[#CDB59C] hover:bg-[#C3A98E] rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span className="font-display-serif text-2xl md:text-[30px] font-bold text-[#4A170E]">
              Los productos que compraste
            </span>
            <span className="text-[#4A170E] text-xl">{openBought ? '▼' : '▶'}</span>
          </button>

          {openBought && (
            <div className="bg-[#D6BFA6]/80 rounded-2xl p-6 md:p-8 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm md:text-[15px] text-[#2B0F08]">
                <thead>
                  <tr className="border-b border-[#8C6E58]/50 font-bold">
                    <th className="pb-3 pr-4">Fecha</th>
                    <th className="pb-3 pr-4">Producto</th>
                    <th className="pb-3 pr-4">Importe</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pt-3 pr-4">13 Dic 2026</td>
                    <td className="pt-3 pr-4 italic font-bold">Taza de cerámica</td>
                    <td className="pt-3 pr-4">$ 10.000</td>
                    <td className="pt-3">Por retirar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
