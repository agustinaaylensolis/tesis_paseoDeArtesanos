import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MaterialTimeline } from '../components/ui';

export const ArtisansPage: React.FC = () => {
  const { artisans, materials } = useApp();
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtisans = useMemo(() => {
    return artisans.filter((a) => {
      if (selectedMaterialId !== null && a.material_id !== selectedMaterialId) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName =
          a.full_name.toLowerCase().includes(q) ||
          a.brand_name.toLowerCase().includes(q);
        const matchMat = a.materials_text.toLowerCase().includes(q);
        if (!matchName && !matchMat) return false;
      }
      return true;
    });
  }, [artisans, selectedMaterialId, searchQuery]);

  // En el PDF (sitio web 2.pdf pág. 5) se muestra una grilla de 3x3 (9 artesanos)
  const displayArtisans = useMemo(() => {
    if (selectedMaterialId === null && searchQuery.trim() === '') {
      return filteredArtisans.slice(0, 9);
    }
    return filteredArtisans;
  }, [filteredArtisans, selectedMaterialId, searchQuery]);

  return (
    <div className="bg-kraft-texture min-h-screen py-8 sm:py-10 md:py-14 px-4 sm:px-6 md:px-16">
      <div className="max-w-[1080px] mx-auto">
        {/* Cabecera: Título + Buscador */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="font-display-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#3D120A]">
            Artesanos Tradicionales
          </h1>

          <div className="flex items-center h-9 w-full md:w-64 shrink-0 shadow-sm">
            <div className="bg-[#3D1E14] text-white h-full px-2.5 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artesano..."
              className="bg-[#A8917A] text-[#2B0F08] placeholder-[#2B0F08]/60 h-full w-full px-3 text-sm border border-[#7E5A45] focus:outline-none"
            />
          </div>
        </div>

        {/* Línea de tiempo 1..7 de Materiales */}
        <MaterialTimeline
          materials={materials}
          selectedMaterialId={selectedMaterialId}
          onSelect={(id) => setSelectedMaterialId(id)}
        />

        {selectedMaterialId !== null && (
          <div className="flex items-center justify-between gap-3 flex-wrap bg-[#DFCBB2]/80 px-4 py-2 rounded mb-8 text-sm">
            <span>
              Filtrando artesanos por:{' '}
              <strong>
                {materials.find((m) => m.id === selectedMaterialId)?.name}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedMaterialId(null)}
              className="text-[#741712] font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>
        )}

        {/* Grilla 3x3 con avatares circulares superpuestos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-16 mt-16 pt-4">
          {displayArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="relative bg-[#D6BFA6]/85 rounded-xl px-4 sm:px-6 pt-16 pb-6 shadow-sm flex flex-col justify-between"
            >
              {/* Avatar circular superpuesto */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden shadow-md bg-black border-2 border-[#C8AE93]">
                <img
                  src={artisan.avatar_url}
                  alt={artisan.brand_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="italic font-bold text-lg md:text-[19px] text-[#4A170E]">
                  {artisan.brand_name}
                </h2>
                <p className="text-xs font-semibold text-[#3B170E] mt-1">
                  Un poco sobre mí...
                </p>
                <p className="text-xs md:text-[13px] text-[#2E1109] mt-1.5 leading-relaxed">
                  {artisan.short_bio}
                </p>
              </div>

              <div className="mt-5 flex justify-center">
                <Link
                  to={`/artesano/${artisan.slug}`}
                  className="btn-artesanal px-7 py-1 text-xs md:text-sm"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

