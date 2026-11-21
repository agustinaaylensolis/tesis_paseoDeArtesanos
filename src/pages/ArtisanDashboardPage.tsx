import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp, PieceFormInput } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { Product } from '../types/database';
import { ProductCard } from '../components/ui';

/* PANEL EXCLUSIVO DEL ROL ARTESANO: CRUD DE CATÁLOGO Y ACCESO AL CURSO */
export const ArtisanDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    artisans,
    products,
    purchasedOrders,
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
  const [brandName, setBrandName] = useState(artisan.brand_name);
  const [phone, setPhone] = useState(artisan.phone);
  const [instagram, setInstagram] = useState(artisan.instagram || 'Artesanales_Eltimbo');
  const [address, setAddress] = useState(artisan.address || 'Taller 9 de Julio 111');
  const [shortBio, setShortBio] = useState(artisan.short_bio);
  const [historyText, setHistoryText] = useState(artisan.history_text);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    artisan.avatar_url || null
  );
  const [storyImageUrl, setStoryImageUrl] = useState<string | null>(
    artisan.story_image_url || null
  );
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const [openShared, setOpenShared] = useState(true);
  const [openSold, setOpenSold] = useState(true);
  const [openBought, setOpenBought] = useState(true);

  useEffect(() => {
    setBrandName(artisan.brand_name);
    setPhone(artisan.phone);
    setInstagram(artisan.instagram || 'Artesanales_Eltimbo');
    setAddress(artisan.address || 'Taller 9 de Julio 111');
    setShortBio(artisan.short_bio);
    setHistoryText(artisan.history_text);
    setAvatarUrl(artisan.avatar_url || null);
    setStoryImageUrl(artisan.story_image_url || null);
  }, [artisan]);

  const handleAvatarUpload = async (file?: File | null) => {
    if (!file) return;
    setUploadingAvatar(true);
    setFeedbackMsg(null);
    try {
      const url = await uploadMediaFile(file, 'artesanos-avatar');
      setAvatarUrl(url);
      await updateArtisanProfile(artisan.id, { avatar_url: url });
      setFeedbackMsg('¡Foto de perfil actualizada!');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Mostrar ÚNICAMENTE los productos que pertenecen al artesano logueado
  const sharedProducts = useMemo(() => {
    return products.filter((p) => p.artisan_id === artisan.id);
  }, [products, artisan.id]);

  // Mostrar ÚNICAMENTE las ventas de productos asociados al artesano logueado
  const soldProducts = useMemo(() => {
    return purchasedOrders.filter((order) => {
      if (order.artisan_id !== undefined) {
        return order.artisan_id === artisan.id;
      }
      const matchedProduct = products.find(
        (p) =>
          (order.product_id !== undefined && p.id === order.product_id) ||
          p.name.toLowerCase() === order.product_name.toLowerCase()
      );
      if (matchedProduct) {
        return matchedProduct.artisan_id === artisan.id;
      }
      return order.id >= 101 && order.id <= 105 && artisan.id === 1;
    });
  }, [purchasedOrders, products, artisan.id]);

  const openCreateForm = () => {
    setPieceForm({
      name: '',
      dimensions: '',
      price: null,
      stock: 2,
      work_hours: '',
      material_label: artisan.materials_text || 'Cuero',
      material_id: artisan.material_id || 1,
      technique: artisan.techniques || '',
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
      <div
        className="bg-kraft-texture min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-16"
        style={{ fontFamily: '"sitka-text", Georgia, serif' }}
      >
        <div className="max-w-[920px] mx-auto bg-[#D8C5AE]/65 rounded-2xl p-6 sm:p-10 md:p-14 shadow-sm">
          <form onSubmit={handleSavePiece}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
              {/* Columna izquierda: Campos de texto y radios */}
              <div className="md:col-span-7 md:pt-8 space-y-2.5 text-sm md:text-[15px] text-[#2B0F08]">
                {/* Grupo 1: Datos principales */}
                <div className="flex items-baseline gap-2">
                  <label className="shrink-0">Nombre de la pieza:</label>
                  <input
                    type="text"
                    required
                    value={pieceForm.name}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Ej: Billetera"
                    className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="shrink-0">Medidas:</label>
                  <input
                    type="text"
                    value={pieceForm.dimensions}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, dimensions: e.target.value }))
                    }
                    placeholder="Ej: 11 x 7 centímetros"
                    className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                  />
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <label className="shrink-0">
                    Precio (si se omite queda como consultable):
                  </label>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="number"
                      value={pieceForm.price ?? ''}
                      onChange={(e) =>
                        setPieceForm((prev) => ({
                          ...prev,
                          price: e.target.value ? Number(e.target.value) : null,
                        }))
                      }
                      placeholder="Ej: $ 15.000"
                      className="w-28 bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                    />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="shrink-0">
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
                    className="w-20 bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5"
                  />
                </div>

                {/* Grupo 2: Oficio */}
                <div className="flex items-baseline gap-2 pt-3">
                  <label className="shrink-0">Horas de trabajo:</label>
                  <input
                    type="text"
                    value={pieceForm.work_hours}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, work_hours: e.target.value }))
                    }
                    placeholder="Ej: 8 horas "
                    className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="shrink-0">Material/es:</label>
                  <input
                    type="text"
                    value={pieceForm.material_label}
                    onChange={(e) =>
                      setPieceForm((prev) => ({
                        ...prev,
                        material_label: e.target.value,
                      }))
                    }
                    placeholder="Ej: Cuero"
                    className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                  />
                </div>

                <div className="flex items-baseline gap-2">
                  <label className="shrink-0">Técnica/s:</label>
                  <input
                    type="text"
                    value={pieceForm.technique}
                    onChange={(e) =>
                      setPieceForm((prev) => ({ ...prev, technique: e.target.value }))
                    }
                    placeholder="Ej: Cincelado"
                    className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-0.5 placeholder-transparent focus:placeholder-[#2B0F08]/45"
                  />
                </div>

                {/* Grupo 3: Descripción */}
                {editingMode === 'create' && (
                  <div className="pt-3 space-y-1">
                    <label className="block">Descripción:</label>
                    <textarea
                      rows={2}
                      value={pieceForm.short_description}
                      onChange={(e) =>
                        setPieceForm((prev) => ({
                          ...prev,
                          short_description: e.target.value,
                        }))
                      }
                      placeholder="Ej: Historia y proceso de elaboración de la pieza..."
                      className="w-full bg-transparent border-b border-transparent hover:border-[#6A4535]/30 focus:border-[#5C2014] focus:outline-none py-1 text-sm resize-none placeholder-transparent focus:placeholder-[#2B0F08]/45"
                    />
                  </div>
                )}

                {/* Grupo 4: Categoría */}
                <div className="pt-5 space-y-2">
                  <p>Categoría</p>
                  <label className="flex items-center gap-3 cursor-pointer pl-1">
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
                      className={`w-3.5 h-3.5 rounded-full border border-[#DF953A] flex items-center justify-center transition-colors ${pieceForm.category_type === 'decorativo'
                        ? 'bg-[#DF953A]'
                        : 'bg-transparent'
                        }`}
                    />
                    <span>Decorativo</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer pl-1">
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
                      className={`w-3.5 h-3.5 rounded-full border border-[#DF953A] flex items-center justify-center transition-colors ${pieceForm.category_type === 'utilitario'
                        ? 'bg-[#DF953A]'
                        : 'bg-transparent'
                        }`}
                    />
                    <span>Utilitario</span>
                  </label>
                </div>

                {/* Grupo 5: Diseño exclusivo */}
                <div className="pt-4 space-y-2">
                  <p>¿Es un diseño de autor exclusivo?</p>
                  <label className="flex items-center gap-3 cursor-pointer pl-1">
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
                      className={`w-3.5 h-3.5 rounded-full border border-[#DF953A] flex items-center justify-center transition-colors ${pieceForm.is_featured ? 'bg-[#DF953A]' : 'bg-transparent'
                        }`}
                    />
                    <span>Si</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer pl-1">
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
                      className={`w-3.5 h-3.5 rounded-full border border-[#DF953A] flex items-center justify-center transition-colors ${!pieceForm.is_featured ? 'bg-[#DF953A]' : 'bg-transparent'
                        }`}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Columna derecha: Añadir fotografías */}
              <div className="md:col-span-5 space-y-3">
                <p className="text-sm md:text-[15px] text-[#2B0F08]">
                  Añadir fotografías
                </p>

                <label className="block w-full aspect-[3/3.7] bg-black cursor-pointer relative overflow-hidden shadow-md group">
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

            {/* Botones inferiores */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              {editingMode === 'create' ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={savingPiece}
                    className="btn-artesanal-dark text-[#E5C9A3] px-14 py-2 text-base md:text-lg shadow-lg"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    {savingPiece ? 'Publicando...' : 'Publicar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMode('none')}
                    className="text-xs font-medium text-[#5C2014] hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={savingPiece}
                    className="btn-artesanal-dark text-[#E5C9A3] px-10 py-2 text-base md:text-lg shadow-lg"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    {savingPiece ? 'Guardando...' : 'Guardar cambios'}
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingMode('none')}
                      className="text-sm font-medium text-[#5C2014] hover:underline"
                    >
                      Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePiece}
                      disabled={savingPiece}
                      className="btn-artesanal-dark text-[#E5C9A3] px-12 py-2 text-base md:text-lg shadow-lg"
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

  /* ================= PANTALLA PRINCIPAL DEL PANEL DEL ARTESANO ================= */
  return (
    <div
      className="bg-kraft-texture min-h-screen py-10 md:py-14 px-4 sm:px-6 md:px-16"
      style={{ fontFamily: '"sitka-text", Georgia, serif' }}
    >
      <div className="max-w-[960px] mx-auto space-y-12">
        {feedbackMsg && (
          <div className="bg-[#4E120B] text-[#E5C9A3] px-5 py-3 rounded-lg text-sm font-medium shadow">
            {feedbackMsg}
          </div>
        )}

        {/* 1. BLOQUE SUPERIOR DE PERFIL (2 COLUMNAS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch pt-12">
          {/* Tarjeta izquierda: Avatar negro + Datos de contacto */}
          <div className="md:col-span-5 relative bg-[#865D4E] text-[#F5E9D9] rounded-xl px-8 pt-20 pb-8 shadow-sm flex flex-col justify-between">
            <label
              title="Hacé clic para subir o cambiar tu foto de perfil"
              className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden bg-black shadow-lg flex items-center justify-center text-5xl font-bold text-[#C8B5A0] cursor-pointer group"
            >
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
              />
              {uploadingAvatar ? (
                <span className="text-xs text-white font-semibold">Subiendo...</span>
              ) : avatarUrl ? (
                <>
                  <img
                    src={avatarUrl}
                    alt={brandName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-3xl text-white font-bold">+</span>
                  </div>
                </>
              ) : (
                <span className="group-hover:scale-110 transition-transform select-none">
                  +
                </span>
              )}
            </label>

            <div className="text-center mt-1">
              {isEditingBio ? (
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full text-center bg-transparent border-b border-white/60 italic font-bold text-2xl text-[#E5C9A3] focus:outline-none"
                  placeholder="Nombre del taller o marca"
                />
              ) : (
                <h1
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  className="italic font-bold text-2xl md:text-[34px] text-[#E5C9A3] leading-tight"
                >
                  {brandName}
                </h1>
              )}
            </div>

            <div className="mt-7 space-y-3 text-sm md:text-[15px] text-[#F5E9D9]">
              <p className="font-medium">Datos de contacto:</p>
              {isEditingBio ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                    placeholder="Teléfono"
                  />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                    placeholder="Instagram / Red social"
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-white/50 py-0.5 focus:outline-none"
                    placeholder="Dirección o localidad"
                  />
                </div>
              ) : (
                <div className="space-y-2.5">
                  <p>{phone}</p>
                  <p>{instagram}</p>
                  <p>{address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tarjeta derecha: Un poco sobre mí + Materiales + Técnicas */}
          <div className="md:col-span-7 bg-[#D8C5AE]/65 rounded-xl p-7 md:p-9 shadow-sm flex flex-col justify-between text-[#2B0F08]">
            <div className="space-y-5">
              <div>
                <h2 className="font-normal text-lg md:text-[25px] text-[#2B0F08] mb-2">
                  Un poco sobre mí...
                </h2>
                {isEditingBio ? (
                  <textarea
                    rows={3}
                    value={shortBio}
                    onChange={(e) => setShortBio(e.target.value)}
                    className="w-full bg-[#DFCCB6] p-3 rounded text-sm md:text-base text-[#2B0F08] focus:outline-none"
                  />
                ) : (
                  <p className="text-sm md:text-[15.5px] leading-relaxed whitespace-pre-line">
                    {shortBio}
                  </p>
                )}
              </div>

              <div className="space-y-3 text-sm md:text-[15.5px]">
                <p>
                  <span className="font-semibold">Materiales que trabaja*</span>{' '}
                  {artisan.materials_text && (
                    <span className="block text-sm opacity-90">{artisan.materials_text}</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Técnicas que utilizás</span>{' '}
                  {artisan.techniques && (
                    <span className="block text-sm opacity-90">{artisan.techniques}</span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-start gap-4">
              {isEditingBio ? (
                <>
                  <button
                    type="button"
                    onClick={async () => {
                      await updateArtisanProfile(artisan.id, {
                        brand_name: brandName,
                        phone,
                        instagram,
                        address,
                        short_bio: shortBio,
                        avatar_url: avatarUrl || artisan.avatar_url,
                      });
                      setIsEditingBio(false);
                      setFeedbackMsg('¡Perfil y descripción guardados con éxito!');
                    }}
                    className="btn-artesanal-dark text-[#E5C9A3] px-8 py-1.5 text-sm md:text-base"
                  >
                    Guardar perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/crear-cuenta');
                    }}
                    className="text-xs text-[#732714] font-semibold underline"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingBio(true)}
                  className="btn-artesanal-dark text-[#E5C9A3] px-9 py-1.5 text-sm md:text-base"
                >
                  Editar perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. UN POCO DE MI HISTORIA (Directo sobre el papel kraft) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2
              className="font-display-serif text-3xl md:text-[34px] font-normal text-[#5C2014] mb-3"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Un poco de mi historia
            </h2>
            {isEditingHistory ? (
              <textarea
                rows={4}
                value={historyText}
                onChange={(e) => setHistoryText(e.target.value)}
                className="w-full bg-[#D8C5AE]/80 p-3 rounded text-sm md:text-[15px] text-[#2B0F08] focus:outline-none"
              />
            ) : (
              <p className="text-sm md:text-[15.5px] text-[#2B0F08] leading-relaxed whitespace-pre-line">
                {historyText}
              </p>
            )}
          </div>

          <div className="shrink-0">
            {isEditingHistory ? (
              <button
                type="button"
                onClick={async () => {
                  await updateArtisanProfile(artisan.id, {
                    history_text: historyText,
                    story_image_url: storyImageUrl || artisan.story_image_url,
                  });
                  setIsEditingHistory(false);
                  setFeedbackMsg('¡Historia guardada con éxito!');
                }}
                className="btn-artesanal-dark text-[#E5C9A3] px-7 py-1.5 text-sm md:text-base"
              >
                Guardar descripción
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingHistory(true)}
                className="btn-artesanal-dark text-[#E5C9A3] px-7 py-1.5 text-sm md:text-base"
              >
                Editar descripción
              </button>
            )}
          </div>
        </div>

        {/* 3. OPTIMIZÁ TU VIDRIERA DIGITAL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h2
              className="font-display-serif text-3xl md:text-[34px] font-normal text-[#5C2014]"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Optimizá tu vidriera digital
            </h2>
            <p className="text-sm md:text-[15px] text-[#2B0F08] mt-2 leading-relaxed">
              ¿Querés aprender a promocionar tus piezas de forma práctica y eficiente para
              comunicar su valor cultural? accedé a un curso corto y aprendé esto y mucho
              más.
            </p>
          </div>

          <Link
            to="/curso"
            className="btn-artesanal-dark text-[#E5C9A3] px-12 py-2 text-base md:text-lg shrink-0 text-center"
          >
            Ver Curso
          </Link>
        </div>

        {/* 4. COMPARTÍ UNA NUEVA PIEZA */}
        <section className="space-y-4">
          <h2
            className="font-display-serif text-3xl md:text-[32px] font-normal text-[#5C2014]"
            style={{ fontFamily: '"broadsheet", Georgia, serif' }}
          >
            Compartí una nueva pieza
          </h2>

          <div
            onClick={openCreateForm}
            className="w-44 sm:w-48 cursor-pointer flex flex-col rounded-b-[22px] overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-[#865D4E] w-full aspect-[3/3.3] flex items-center justify-center">
              <span className="text-6xl font-bold text-[#E5C9A3] select-none">+</span>
            </div>
            <div className="product-card-footer bg-[#DCC7AE] px-4 pt-2 pb-4 flex justify-center">
              <button
                type="button"
                className="relative z-10 btn-artesanal-dark text-[#E5C9A3] px-7 py-1 text-sm"
                style={{ transform: 'rotate(0deg)' }}
              >
                Añadir
              </button>
            </div>
          </div>
        </section>

        {/* 5. MI CATÁLOGO ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenShared((v) => !v)}
            className="w-full bg-[#D8C5AE]/65 hover:bg-[#D8C5AE]/85 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span
              className="font-display-serif text-2xl md:text-[30px] font-normal text-[#5C2014]"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Mi catálogo
            </span>
            <span className="text-[#5C2014] text-xl">{openShared ? '▼' : '▶'}</span>
          </button>

          {openShared && (
            <div className="space-y-4">
              {sharedProducts.length === 0 ? (
                <div className="bg-[#D8C5AE]/65 rounded-xl p-8 text-center text-sm md:text-base text-[#5C2014]">
                  Todavía no compartiste productos en tu catálogo. Hacé clic en{' '}
                  <strong>Añadir (+)</strong> arriba en{' '}
                  <em>Compartí una nueva pieza</em> para publicar tu primer producto.
                </div>
              ) : (
                <>
                  <p className="text-xs md:text-sm text-[#2B0F08] px-1">
                    Seleccioná un producto para eliminarlo o editar su información.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {sharedProducts.map((prod, idx) => (
                      <ProductCard
                        key={`shared-${prod.id}-${idx}`}
                        product={prod}
                        artisan={artisan}
                        showArtisanName={false}
                        onClickOverride={(p) => openEditForm(p)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* 6. LOS PRODUCTOS QUE VENDISTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenSold((v) => !v)}
            className="w-full bg-[#D8C5AE]/65 hover:bg-[#D8C5AE]/85 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span
              className="font-display-serif text-2xl md:text-[30px] font-normal text-[#5C2014]"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Los productos que vendiste
            </span>
            <span className="text-[#5C2014] text-xl">{openSold ? '▼' : '▶'}</span>
          </button>

          {openSold && (
            <div className="bg-[#D8C5AE]/65 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm overflow-x-auto">
              {soldProducts.length === 0 ? (
                <p className="text-center text-sm md:text-base text-[#5C2014] py-4">
                  Todavía no registrás ventas de tus productos.
                </p>
              ) : (
                <table className="w-full min-w-[520px] text-left text-sm md:text-[15px] text-[#2B0F08]">
                  <thead>
                    <tr className="border-b border-[#8C6E58]/50 font-bold">
                      <th className="pb-3 pr-4">Fecha</th>
                      <th className="pb-3 pr-4">Producto</th>
                      <th className="pb-3 pr-4">Importe</th>
                      <th className="pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#8C6E58]/30">
                    {soldProducts.map((order) => (
                      <tr key={`sold-${order.id}`}>
                        <td className="py-3 pr-4">{order.date_label}</td>
                        <td className="py-3 pr-4 italic font-bold">
                          {order.product_name}
                        </td>
                        <td className="py-3 pr-4">
                          $ {order.amount.toLocaleString('es-AR')}
                        </td>
                        <td className="py-3">{order.status_label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>

        {/* 7. LOS PRODUCTOS QUE COMPRASTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenBought((v) => !v)}
            className="w-full bg-[#D8C5AE]/65 hover:bg-[#D8C5AE]/85 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span
              className="font-display-serif text-2xl md:text-[30px] font-normal text-[#5C2014]"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Los productos que compraste
            </span>
            <span className="text-[#5C2014] text-xl">{openBought ? '▼' : '▶'}</span>
          </button>

          {openBought && (
            <div className="bg-[#D8C5AE]/65 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm md:text-[15px] text-[#2B0F08]">
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
    </div >
  );
};
