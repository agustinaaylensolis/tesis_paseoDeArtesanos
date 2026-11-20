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
    <div className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-[1080px] mx-auto">
        {/* Cabecera: Título + Buscador */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[40px] font-bold text-[#4A170E]">
            {selectedMaterial
              ? 'Catálogo de Artesanías Tradicionales'
              : '¡Conocé las artesanías tradicionales!'}
          </h1>

          <div className="flex items-center h-9 w-full md:w-64 shadow-sm">
            <div className="bg-[#3D1E14] text-white h-full px-2.5 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pieza o artesano..."
              className="bg-[#A8917A] text-[#2B0F08] placeholder-[#2B0F08]/60 h-full w-full px-3 text-sm border border-[#7E5A45] focus:outline-none"
            />
          </div>
        </div>

        {/* Selector tipo píldora Utilitario / Decorativo + Píldora Diseños Exclusivos */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="inline-flex items-center bg-[#DCC7AE] rounded-full p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setCategoryType('utilitario');
                setOnlyExclusive(false);
              }}
              className={`px-6 py-1.5 rounded-full text-base md:text-lg font-semibold transition-colors ${
                categoryType === 'utilitario' && !onlyExclusive
                  ? 'bg-[#5E2822] text-[#F4E6D4] shadow'
                  : 'text-[#3D120A] hover:text-[#741712]'
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
              className={`px-6 py-1.5 rounded-full text-base md:text-lg font-semibold transition-colors ${
                categoryType === 'decorativo' && !onlyExclusive
                  ? 'bg-[#5E2822] text-[#F4E6D4] shadow'
                  : 'text-[#3D120A] hover:text-[#741712]'
              }`}
            >
              Decorativo
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOnlyExclusive((prev) => !prev)}
            className={`px-6 py-1.5 rounded-full text-base md:text-lg font-semibold transition-all shadow-sm ${
              onlyExclusive
                ? 'bg-[#741712] text-[#F4E6D4] ring-2 ring-[#E59838]'
                : 'bg-[#5E2822] text-[#F4E6D4] hover:brightness-110'
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

        {/* Tarjeta informativa contextual debajo de la línea 1..7 (catalogo completito .pdf págs. 1 a 8) */}
        <div className="max-w-[680px] mx-auto my-7 bg-[#C5A98C]/75 rounded-lg px-7 py-5 shadow-sm flex items-center gap-6">
          {selectedMaterial ? (
            <>
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 shadow border border-[#8C6245]/40 bg-[#4A170E]">
                <img
                  src={selectedMaterial.image_url}
                  alt={selectedMaterial.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display-serif text-xl md:text-2xl font-bold text-[#4A170E]">
                    {selectedMaterial.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMaterialId(null);
                      setSearchParams({});
                    }}
                    className="text-xs font-bold text-[#741712] hover:underline"
                  >
                    Ver todos
                  </button>
                </div>
                <p className="text-xs md:text-sm text-[#33130C] mt-1 leading-relaxed">
                  {selectedMaterial.description}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[#5E2822] text-[#F4E6D4] flex items-center justify-center text-4xl font-bold shrink-0 shadow">
                ?
              </div>
              <div>
                <h2 className="font-display-serif text-xl md:text-2xl font-bold text-[#4A170E]">
                  Elegí un material para conocer más
                </h2>
                <p className="text-xs md:text-sm text-[#33130C] mt-1 leading-relaxed">
                  Los artesanos elaboran sus productos con diversos materiales propios de la
                  región basandose en conocimientos tradicionales arraigados a su historia.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Grilla de 4 columnas */}
        {displayProducts.length === 0 ? (
          <div className="bg-[#DFCBB2]/80 rounded-xl p-10 text-center my-8">
            <p className="text-lg font-semibold text-[#4A170E]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-7 mt-8">
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
