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

  const [categoryType, setCategoryType] = useState<'utilitario' | 'decorativo' | 'todos'>(
    initialType || 'utilitario'
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(initialMat);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const t = searchParams.get('tipo') as 'utilitario' | 'decorativo' | null;
    const m = searchParams.get('material') ? Number(searchParams.get('material')) : null;
    if (t) setCategoryType(t);
    if (m) setSelectedMaterialId(m);
  }, [searchParams]);

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryType !== 'todos' && p.category_type !== categoryType && searchQuery === '' && selectedMaterialId === null) {
        // Show the 12 catalog pieces by default when Utilitario is selected just like the PDF mockup,
        // or filter strictly when user toggles Decorativo
        if (categoryType === 'decorativo') return p.category_type === 'decorativo';
      } else if (categoryType !== 'todos' && p.category_type !== categoryType && selectedMaterialId !== null) {
        return false;
      }

      if (selectedMaterialId !== null && p.material_id !== selectedMaterialId) {
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
  }, [products, categoryType, selectedMaterialId, searchQuery, artisanMap]);

  // En el PDF (sitio web 2.pdf pág. 3) se muestran 12 tarjetas en grilla 4x3
  const displayProducts = useMemo(() => {
    if (
      categoryType === 'utilitario' &&
      selectedMaterialId === null &&
      searchQuery.trim() === '' &&
      filteredProducts.length >= 10
    ) {
      // Exact 12-card layout from PDF Page 3 when unfiltered
      const base10 = filteredProducts.slice(0, 10);
      const extra2 = filteredProducts.slice(4, 6);
      return [...base10, ...extra2].slice(0, 12);
    }
    return filteredProducts;
  }, [filteredProducts, categoryType, selectedMaterialId, searchQuery]);

  return (
    <div className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-[1080px] mx-auto">
        {/* Cabecera: Título + Buscador */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#3D120A]">
            Catálogo de Artesanías Tradicionales
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

        {/* Selector tipo píldora Utilitario / Decorativo */}
        <div className="inline-flex items-center bg-[#DCC7AE] rounded-full p-0.5 shadow-inner mb-4">
          <button
            type="button"
            onClick={() => {
              setCategoryType('utilitario');
              setSearchParams({});
            }}
            className={`px-7 py-1.5 rounded-full text-base md:text-lg font-semibold transition-colors ${
              categoryType === 'utilitario'
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
              setSearchParams({ tipo: 'decorativo' });
            }}
            className={`px-7 py-1.5 rounded-full text-base md:text-lg font-semibold transition-colors ${
              categoryType === 'decorativo'
                ? 'bg-[#5E2822] text-[#F4E6D4] shadow'
                : 'text-[#3D120A] hover:text-[#741712]'
            }`}
          >
            Decorativo
          </button>
        </div>

        {/* Línea de tiempo 1..7 de Materiales */}
        <MaterialTimeline
          materials={materials}
          selectedMaterialId={selectedMaterialId}
          onSelect={(id) => setSelectedMaterialId(id)}
        />

        {selectedMaterialId !== null && (
          <div className="flex items-center justify-between bg-[#DFCBB2]/80 px-4 py-2 rounded mb-6 text-sm">
            <span>
              Filtrando por material:{' '}
              <strong>
                {materials.find((m) => m.id === selectedMaterialId)?.name}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedMaterialId(null)}
              className="text-[#741712] font-bold hover:underline"
            >
              Ver todos los materiales
            </button>
          </div>
        )}

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
                setSearchQuery('');
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
                highlighted={index === 0}
                showArtisanName={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

