
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MaterialTimeline, ProductCard } from '../components/ui';

export const CatalogPage: React.FC = () => {
  const { products, artisans, materials } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = searchParams.get('tipo') as 'utilitario' | 'decorativo' | null;
  const initialMat = searchParams.get('material')
    ? Number(searchParams.get('material'))
    : null;
  const initialExclusivos = searchParams.get('exclusivos') === '1';

  const [categoryType, setCategoryType] = useState<'utilitario' | 'decorativo'>(
    initialType || 'utilitario'
  );
  const [onlyExclusive, setOnlyExclusive] = useState<boolean>(initialExclusivos);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(initialMat);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const t = searchParams.get('tipo') as 'utilitario' | 'decorativo' | null;
    const m = searchParams.get('material') ? Number(searchParams.get('material')) : null;
    const exc = searchParams.get('exclusivos') === '1';
    if (t) setCategoryType(t);
    setSelectedMaterialId(m);
    setOnlyExclusive(exc);
  }, [searchParams]);

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  const selectedMaterial = useMemo(() => {
    if (selectedMaterialId === null) return null;
    return materials.find((m) => m.id === selectedMaterialId) || null;
  }, [materials, selectedMaterialId]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedMaterialId !== null && p.material_id !== selectedMaterialId) {
        return false;
      }

      if (onlyExclusive && !p.is_featured) {
        return false;
      }

      if (categoryType === 'decorativo' && p.category_type !== 'decorativo' && selectedMaterialId === null) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const art = artisanMap.get(p.artisan_id);
        const matchName = p.name.toLowerCase().includes(q);
        const matchMat = p.material_label.toLowerCase().includes(q);
        const matchArt = art?.full_name.toLowerCase().includes(q);
        if (!matchName && !matchMat && !matchArt) return false;
      }

      return true;
    });
  }, [products, categoryType, onlyExclusive, selectedMaterialId, searchQuery, artisanMap]);

  // En catalogo completito .pdf páginas 2 a 8, cuando se elige un material se muestran 16 tarjetas (las 8 del material repetidas en 2 bloques 4x2)
  const displayProducts = useMemo(() => {
    if (
      selectedMaterialId !== null &&
      !onlyExclusive &&
      searchQuery.trim() === '' &&
      filteredProducts.length === 8
    ) {
      return [...filteredProducts, ...filteredProducts];
    }
    return filteredProducts;
  }, [filteredProducts, selectedMaterialId, onlyExclusive, searchQuery]);

  return (
    <div
      className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16"
      style={{ fontFamily: '"sitka-text", Georgia, serif' }}
    >
      <div className="max-w-[980px] mx-auto">
        {/* Cabecera: Título + Buscador */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <h1
            className="text-2xl sm:text-3xl md:text-[34px] font-medium text-[#732714] tracking-tight"
            style={{ fontFamily: '"broadsheet", Georgia, serif' }}
          >
            {selectedMaterial
              ? 'Catálogo de Artesanías Tradicionales'
              : '¡Conocé las artesanías tradicionales!'}
          </h1>

          <div className="flex items-center h-8 w-full md:w-60">
            <div className="bg-[#3D1E14] text-[#CFAD82] h-full px-2.5 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar pieza o artesano"
              className="bg-[#A8917A]/90 text-[#4A0A03] h-full w-full px-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Selector tipo píldora Utilitario / Decorativo + Píldora Diseños Exclusivos */}
        <div
          className="flex flex-wrap items-center gap-3.5 mb-5"
          style={{ fontFamily: '"sitka-text", Georgia, serif' }}
        >
          <div className="inline-flex items-center bg-[#CBB79F] rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setCategoryType('utilitario');
                setOnlyExclusive(false);
              }}
              className={`px-5 py-1 rounded-full text-sm md:text-[15px] font-bold cursor-pointer transition-all ${categoryType === 'utilitario' && !onlyExclusive
                  ? 'bg-[#5F2D31] text-[#CFAD82] hover:brightness-110'
                  : 'text-[#4A0A03] hover:bg-[#5F2D31]/15 hover:text-[#5F2D31]'
                }`}
            >
              Utilitario
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryType('decorativo');
                setOnlyExclusive(false);
              }}
              className={`px-5 py-1 rounded-full text-sm md:text-[15px] font-bold cursor-pointer transition-all ${categoryType === 'decorativo' && !onlyExclusive
                  ? 'bg-[#5F2D31] text-[#CFAD82] hover:brightness-110'
                  : 'text-[#4A0A03] hover:bg-[#5F2D31]/15 hover:text-[#5F2D31]'
                }`}
            >
              Decorativo
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOnlyExclusive((prev) => !prev)}
            className={`px-5 py-1 rounded-full text-sm md:text-[15px] font-bold cursor-pointer transition-all ${onlyExclusive
                ? 'bg-[#732714] text-[#CFAD82] ring-2 ring-[#E59838]'
                : 'bg-[#5F2D31] text-[#CFAD82] hover:brightness-110'
              }`}
          >
            Diseños Exclusivos
          </button>
        </div>

        {/* Línea de tiempo 1..7 de Materiales */}
        <MaterialTimeline
          materials={materials}
          selectedMaterialId={selectedMaterialId}
          onSelect={(id) => {
            setSelectedMaterialId(id);
            if (id) {
              setSearchParams({ material: String(id) });
            } else {
              setSearchParams({});
            }
          }}
        />

        {/* Tarjeta informativa contextual con curvatura en arco */}
        <div className="relative max-w-[660px] mx-auto my-7 px-9 py-7 flex items-center gap-6">
          {/* Fondo curvo en arco */}
          <svg
            viewBox="0 0 660 120"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <path
              d="M0 12 Q330 -6 660 12 L660 120 Q330 102 0 120 Z"
              fill="#B99D7E"
              fillOpacity="0.75"
            />
          </svg>

          {/* Contenido por encima del SVG */}
          <div className="relative z-10 flex items-center gap-6 w-full">
            {selectedMaterial ? (
              <>
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow border border-[#8C6245]/40 bg-[#4A0A03]">
                  <img
                    src={selectedMaterial.image_url}
                    alt={selectedMaterial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg md:text-[20px] font-normal text-[#732714]">
                      {selectedMaterial.title}
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMaterialId(null);
                        setSearchParams({});
                      }}
                      className="text-xs font-semibold text-[#5F2D31] hover:underline"
                    >
                      Ver todos
                    </button>
                  </div>
                  <p className="text-xs md:text-[13.5px] text-[#4A0A03] mt-1 leading-snug">
                    {selectedMaterial.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#5F2D31] text-[#CFAD82] flex items-center justify-center text-3xl font-bold shrink-0">
                  ?
                </div>
                <div>
                  <h2 className="text-lg md:text-[20px] font-semibold text-[#732714]">
                    Elegí un material para conocer más
                  </h2>
                  <p className="text-xs md:text-[13.5px] text-[#4A0A03] mt-1 leading-snug">
                    Los artesanos elaboran sus productos con diversos materiales propios de la
                    región basándose en conocimientos tradicionales arraigados a su historia.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Grilla de 4 columnas */}
        {displayProducts.length === 0 ? (
          <div className="bg-[#DFCBB2]/80 rounded-xl p-10 text-center my-8">
            <p className="text-lg font-semibold text-[#732714]">
              No se encontraron piezas con los filtros seleccionados.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedMaterialId(null);
                setCategoryType('utilitario');
                setOnlyExclusive(false);
                setSearchQuery('');
                setSearchParams({});
              }}
              className="btn-artesanal px-6 py-2 mt-4 text-sm"
            >
              Restablecer catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mt-8">
            {displayProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                artisan={artisanMap.get(product.artisan_id)}
                highlighted={index === 0 || (selectedMaterialId !== null && index === 8)}
                showArtisanName={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};