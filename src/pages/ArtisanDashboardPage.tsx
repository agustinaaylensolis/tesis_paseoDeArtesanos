import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, NewProductDraft } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { CarouselArrow, ProductCard } from '../components/ui';

/* PANEL DE AUTOGESTIÓN DEL ARTESANO (sitio web 2.pdf pág. 6) */
export const ArtisanDashboardPage: React.FC = () => {
  const {
    artisans,
    products,
    activeArtisanId,
    setActiveArtisanId,
    updateArtisanProfile,
    publishCatalogProducts,
  } = useApp();

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.id === activeArtisanId) ||
      artisans.find((a) => a.slug === 'silvia-balbuena') ||
      artisans[0]
    );
  }, [artisans, activeArtisanId]);

  const [phone, setPhone] = useState(artisan.phone);
  const [instagram, setInstagram] = useState(artisan.instagram || 'Artesanales_Silvia');
  const [address, setAddress] = useState(artisan.address || 'Taller 9 de Julio 111');
  const [shortBio, setShortBio] = useState(artisan.short_bio);
  const [materialsText, setMaterialsText] = useState(artisan.materials_text);
  const [techniques, setTechniques] = useState(artisan.techniques || '');
  const [historyText, setHistoryText] = useState(artisan.history_text);

  const [savingBio, setSavingBio] = useState(false);
  const [savingHistory, setSavingHistory] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    setPhone(artisan.phone);
    setInstagram(artisan.instagram || 'Artesanales_Silvia');
    setAddress(artisan.address || 'Taller 9 de Julio 111');
    setShortBio(artisan.short_bio);
    setMaterialsText(artisan.materials_text);
    setTechniques(artisan.techniques || '');
    setHistoryText(artisan.history_text);
  }, [artisan]);

  // Estado para "Crear Catálogo de Productos" (3 tarjetas iniciales con + igual que en el PDF)
  const [catalogTitle, setCatalogTitle] = useState('');
  const [slots, setSlots] = useState<NewProductDraft[]>([
    {
      name: '',
      dimensions: '',
      price: 12000,
      stock: 2,
      work_hours: '8 horas',
      material_label: 'Plata',
      material_id: 4,
      technique: 'Cincelado',
      short_description: '',
      category_type: 'utilitario',
      piece_type: 'fija',
      image_url: '',
    },
    {
      name: '',
      dimensions: '',
      price: 15000,
      stock: 2,
      work_hours: '10 horas',
      material_label: 'Plata',
      material_id: 4,
      technique: 'Cincelado',
      short_description: '',
      category_type: 'utilitario',
      piece_type: 'fija',
      image_url: '',
    },
    {
      name: '',
      dimensions: '',
      price: 18000,
      stock: 1,
      work_hours: '12 horas',
      material_label: 'Plata',
      material_id: 4,
      technique: 'Cincelado',
      short_description: '',
      category_type: 'utilitario',
      piece_type: 'fija',
      image_url: '',
    },
  ]);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleSaveBio = async () => {
    setSavingBio(true);
    setFeedbackMsg(null);
    try {
      await updateArtisanProfile(artisan.id, {
        phone,
        instagram,
        address,
        short_bio: shortBio,
        materials_text: materialsText,
        techniques,
      });
      setFeedbackMsg('Cambios del perfil guardados en Supabase.');
    } finally {
      setSavingBio(false);
    }
  };

  const handleSaveHistory = async () => {
    setSavingHistory(true);
    setFeedbackMsg(null);
    try {
      await updateArtisanProfile(artisan.id, {
        history_text: historyText,
      });
      setFeedbackMsg('Historia actualizada en Supabase.');
    } finally {
      setSavingHistory(false);
    }
  };

  const handleSlotImageUpload = async (idx: number, file?: File | null) => {
    if (!file) return;
    setUploadingSlot(idx);
    try {
      const url = await uploadMediaFile(file, 'productos');
      setSlots((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, image_url: url } : s))
      );
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleAddSlot = () => {
    setSlots((prev) => [
      ...prev,
      {
        name: '',
        dimensions: '',
        price: 14000,
        stock: 2,
        work_hours: '8 horas',
        material_label: 'Plata',
        material_id: 4,
        technique: 'Cincelado',
        short_description: '',
        category_type: 'utilitario',
        piece_type: 'fija',
        image_url: '',
      },
    ]);
  };

  const handlePublishCatalog = async () => {
    const validDrafts = slots.filter((s) => s.name.trim() !== '' || s.image_url !== '');
    if (validDrafts.length === 0) {
      setFeedbackMsg(
        'Completá al menos el Nombre o subí una foto en una de las tarjetas antes de publicar.'
      );
      return;
    }

    setPublishing(true);
    setFeedbackMsg(null);
    try {
      const normalized = validDrafts.map((d, i) => ({
        ...d,
        name: d.name.trim() || `Pieza artesanal ${i + 1}`,
        dimensions: d.dimensions.trim() || '20 cm',
        image_url: d.image_url || '/assets/products/bombilla-corazon.png',
      }));

      await publishCatalogProducts(
        artisan.id,
        catalogTitle.trim() || 'Accesorios',
        normalized
      );

      setCatalogTitle('');
      setSlots((prev) =>
        prev.map((s) => ({ ...s, name: '', dimensions: '', image_url: '' }))
      );
      setFeedbackMsg(
        '¡Catálogo y piezas publicados en Supabase! Ya están visibles en Mis catálogos y en el Catálogo general.'
      );
    } finally {
      setPublishing(false);
    }
  };

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  const myCatalogProducts = useMemo(() => {
    const own = products.filter((p) => p.artisan_id === artisan.id);
    if (own.length >= 4) return own;
    return [...own, ...products.slice(0, 4)].slice(0, 4);
  }, [products, artisan]);

  return (
    <div className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-10">
        {/* Selector sutil de artesano activo para pruebas de defensa */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#DFCBB2]/70 px-4 py-2 rounded text-xs md:text-sm">
          <span>
            Gestionando vidriera de: <strong>{artisan.brand_name}</strong>
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="select-artisan" className="opacity-80">
              Cambiar artesano:
            </label>
            <select
              id="select-artisan"
              value={artisan.id}
              onChange={(e) => setActiveArtisanId(Number(e.target.value))}
              className="bg-[#C8AE93] text-[#2B0F08] px-2 py-1 rounded font-semibold"
            >
              {artisans.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.brand_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. ACCESO AL CURSO DE COMUNICACIÓN PARA ARTESANOS */}
        <div className="space-y-4">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[38px] font-bold text-[#4A170E]">
            Curso de Comunicación para artesanos
          </h1>
          <div className="flex justify-center pt-1">
            <Link
              to="/curso"
              className="btn-artesanal-dark px-12 py-2 text-base md:text-lg"
              style={{ transform: 'rotate(0deg)' }}
            >
              Ver Curso
            </Link>
          </div>
        </div>

        {feedbackMsg && (
          <div className="bg-[#4E120B] text-[#F4E6D4] px-5 py-3 rounded-lg text-sm font-medium shadow">
            {feedbackMsg}
          </div>
        )}

        {/* 2. BLOQUE SUPERIOR EDITABLE DE PERFIL (2 COLUMNAS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-8">
          {/* Columna izquierda marrón */}
          <div className="md:col-span-5 relative bg-[#865D4E] text-[#F5E9D9] rounded-xl px-7 pt-16 pb-8 shadow-md flex flex-col justify-between">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden bg-black shadow-lg border-2 border-[#865D4E]">
              <img
                src={artisan.avatar_url}
                alt={artisan.brand_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mt-2">
              <h2 className="italic font-bold text-2xl md:text-[26px] text-[#E6CEB5] leading-tight">
                {artisan.brand_name.includes('Silvia') ? (
                  <>
                    Artesanales
                    <br />
                    Silvia Balbuena
                  </>
                ) : (
                  artisan.brand_name
                )}
              </h2>
            </div>

            <div className="mt-6 space-y-2.5 text-sm md:text-[15px] text-[#F5E9D9]">
              <p className="font-semibold">Datos de contacto:</p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-[#E6CEB5]/40 focus:border-white focus:outline-none py-0.5"
              />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-transparent border-b border-[#E6CEB5]/40 focus:border-white focus:outline-none py-0.5"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent border-b border-[#E6CEB5]/40 focus:border-white focus:outline-none py-0.5"
              />
            </div>
          </div>

          {/* Columna derecha beige con Guardar Cambios */}
          <div className="md:col-span-7 bg-[#D6BFA6]/85 rounded-xl p-7 md:p-9 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-[#4A170E]">Un poco sobre mí...</h3>
              <textarea
                rows={3}
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                className="w-full bg-[#DFCCB6]/70 p-2.5 rounded text-sm md:text-[15px] text-[#2E1008] focus:outline-none focus:ring-1 focus:ring-[#741712]"
              />

              <div>
                <label className="block text-sm font-semibold text-[#3B170E]">
                  Materiales que trabaja*
                </label>
                <input
                  type="text"
                  value={materialsText}
                  onChange={(e) => setMaterialsText(e.target.value)}
                  className="w-full bg-transparent border-b border-[#6A4535]/50 py-1 text-sm text-[#2E1008] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3B170E]">
                  Técnicas que utilizás
                </label>
                <input
                  type="text"
                  value={techniques}
                  onChange={(e) => setTechniques(e.target.value)}
                  className="w-full bg-transparent border-b border-[#6A4535]/50 py-1 text-sm text-[#2E1008] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveBio}
                disabled={savingBio}
                className="btn-artesanal-dark px-6 py-1.5 text-sm md:text-base"
              >
                {savingBio ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>

        {/* 3. UN POCO DE MI HISTORIA (EDITABLE) */}
        <div className="space-y-3 max-w-2xl">
          <h2 className="font-display-serif text-3xl md:text-[34px] font-bold text-[#4A170E]">
            Un poco de mi historia
          </h2>
          <textarea
            rows={4}
            value={historyText}
            onChange={(e) => setHistoryText(e.target.value)}
            className="w-full bg-transparent border border-[#8E6754]/50 rounded p-3 text-sm md:text-[15px] text-[#33130C] leading-relaxed focus:bg-[#DFCCB6]/50 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveHistory}
              disabled={savingHistory}
              className="btn-artesanal-dark px-6 py-1.5 text-sm md:text-base"
            >
              {savingHistory ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        {/* 4. CREAR CATÁLOGO DE PRODUCTOS */}
        <section className="space-y-6 pt-2">
          <h2 className="font-display-serif text-3xl md:text-[36px] font-bold text-[#4A170E]">
            Crear Catálogo de Productos
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4 max-w-2xl">
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              <label
                htmlFor="cat-title"
                className="font-display-serif text-2xl md:text-[28px] text-[#4A170E]"
              >
                Título
              </label>
              <input
                id="cat-title"
                type="text"
                value={catalogTitle}
                onChange={(e) => setCatalogTitle(e.target.value)}
                placeholder="Ej: Accesorios / Bombillas"
                className="bg-[#DFCCB6]/80 border-b-2 border-[#54140E] px-3 py-1.5 text-base text-[#2E1008] focus:outline-none flex-1"
              />
            </div>

            <button
              type="button"
              onClick={handlePublishCatalog}
              disabled={publishing}
              className="btn-artesanal-dark px-12 py-1.5 text-base md:text-lg"
              style={{ transform: 'rotate(0deg)' }}
            >
              {publishing ? 'Publicando...' : 'Publicar'}
            </button>
          </div>

          {/* Grilla de tarjetas de carga (+) + botón cuadrado + a la derecha */}
          <div className="flex flex-wrap items-start gap-5">
            {slots.map((slot, idx) => (
              <div
                key={idx}
                className="w-44 sm:w-48 flex flex-col rounded-b-[22px] overflow-hidden shadow-md"
              >
                {/* Recuadro negro 3:4 con signo + para subir foto */}
                <label className="bg-black w-full aspect-[3/4] flex items-center justify-center cursor-pointer relative overflow-hidden group">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleSlotImageUpload(idx, e.target.files?.[0])}
                  />
                  {slot.image_url ? (
                    <img
                      src={slot.image_url}
                      alt={slot.name || 'Nueva pieza'}
                      className="w-full h-full object-contain p-3"
                    />
                  ) : uploadingSlot === idx ? (
                    <span className="text-xs text-[#DFCCB6]">Subiendo...</span>
                  ) : (
                    <span className="text-6xl font-bold text-[#C8B29B] group-hover:scale-110 transition-transform select-none">
                      +
                    </span>
                  )}
                </label>

                {/* Zócalo curvo convexo editable con Nombre, Tamaño y Precio */}
                <div className="product-card-footer bg-[#DCC7AE] px-3 pt-2 pb-3 space-y-1">
                  <input
                    type="text"
                    value={slot.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlots((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, name: val } : s))
                      );
                    }}
                    placeholder="Nombre"
                    className="relative z-10 w-full bg-transparent text-xs md:text-[13px] font-bold text-[#2F110A] placeholder-[#2F110A] focus:outline-none border-b border-transparent focus:border-[#4A170E]"
                  />
                  <input
                    type="text"
                    value={slot.dimensions}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSlots((prev) =>
                        prev.map((s, i) => (i === idx ? { ...s, dimensions: val } : s))
                      );
                    }}
                    placeholder="Tamaño"
                    className="relative z-10 w-full bg-transparent text-[11px] md:text-xs text-[#2F110A]/90 placeholder-[#2F110A]/80 focus:outline-none border-b border-transparent focus:border-[#4A170E]"
                  />
                  <div className="relative z-10 flex items-center justify-between pt-0.5 text-[11px] text-[#4A170E]">
                    <span>$</span>
                    <input
                      type="number"
                      value={slot.price}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSlots((prev) =>
                          prev.map((s, i) => (i === idx ? { ...s, price: val } : s))
                        );
                      }}
                      className="w-20 bg-transparent font-semibold focus:outline-none"
                      title="Precio en pesos"
                    />
                    <span>Stock:</span>
                    <input
                      type="number"
                      min={0}
                      value={slot.stock}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSlots((prev) =>
                          prev.map((s, i) => (i === idx ? { ...s, stock: val } : s))
                        );
                      }}
                      className="w-8 bg-transparent font-semibold text-right focus:outline-none"
                      title="Stock inicial"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Botón cuadrado negro + lateral derecho tal cual el mockup */}
            <button
              type="button"
              onClick={handleAddSlot}
              title="Añadir otra pieza al catálogo"
              className="w-16 h-16 bg-black text-[#C8B29B] text-4xl font-bold flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              +
            </button>
          </div>
        </section>

        {/* 5. MIS CATÁLOGOS */}
        <section className="space-y-4 pt-6">
          <h2 className="font-display-serif text-3xl md:text-[36px] font-bold text-[#4A170E]">
            Mis catálogos
          </h2>
          <h3 className="font-display-serif text-2xl md:text-[28px] font-semibold text-[#4A170E]">
            Accesorios
          </h3>

          <div className="relative">
            <CarouselArrow
              direction="left"
              onClick={() => {}}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {myCatalogProducts.map((prod, idx) => (
                <ProductCard
                  key={`mycat-${prod.id}-${idx}`}
                  product={prod}
                  artisan={artisanMap.get(prod.artisan_id) || artisan}
                  showArtisanName={true}
                />
              ))}
            </div>
            <CarouselArrow
              direction="right"
              onClick={() => {}}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

