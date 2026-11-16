import React from 'react';
import { Link } from 'react-router-dom';
import { Artisan, Material, Product } from '../types/database';

/* Línea numerada 1 a 7 de Materiales Tradicionales (Home, Catálogo y Directorio de Artesanos) */
export const MaterialTimeline: React.FC<{
  materials: Material[];
  selectedMaterialId: number | null;
  onSelect: (id: number | null) => void;
  allowToggleAll?: boolean;
}> = ({ materials, selectedMaterialId, onSelect, allowToggleAll = true }) => {
  return (
    <div className="w-full max-w-[920px] mx-auto my-6 px-2">
      <div className="relative flex items-start justify-between">
        {/* Línea conectora horizontal */}
        <div className="absolute top-[15px] left-[6%] right-[6%] h-[1.5px] bg-[#6A4535]/60 z-0" />

        {materials.map((mat) => {
          const isSelected = selectedMaterialId === mat.id;
          const isHighlighted = selectedMaterialId === null ? mat.id <= 4 : isSelected;

          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => {
                if (allowToggleAll && selectedMaterialId === mat.id) {
                  onSelect(null);
                } else {
                  onSelect(mat.id);
                }
              }}
              className="relative z-10 flex flex-col items-center group focus:outline-none w-24 md:w-28"
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-[#5E2822] text-[#F4E6D4] ring-4 ring-[#741712]/30 scale-110'
                    : isHighlighted
                    ? 'bg-[#63322B] text-[#F4E6D4] group-hover:scale-105'
                    : 'bg-[#BC9E82] text-[#3B170E] group-hover:bg-[#8E6754] group-hover:text-white'
                }`}
              >
                {mat.id}
              </span>
              <span
                className={`mt-2.5 text-center text-xs md:text-[15px] leading-tight whitespace-pre-line transition-colors ${
                  isSelected
                    ? 'font-bold text-[#741712] underline underline-offset-4'
                    : 'font-semibold text-[#3B170E] group-hover:text-[#741712]'
                }`}
              >
                {mat.name === 'Cuero o suela'
                  ? 'Cuero\no suela'
                  : mat.name === 'Lana y algodón'
                  ? 'Lana y\nalgodón'
                  : mat.name === 'Fibra Vegetal'
                  ? 'Fibra\nVegetal'
                  : mat.name === 'Plata y minerales'
                  ? 'Plata y\nminerales'
                  : mat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* Tarjeta de Producto con recorte 3:4 negro y zócalo inferior curvo convexo */
export const ProductCard: React.FC<{
  product: Product;
  artisan?: Artisan;
  highlighted?: boolean;
  showArtisanName?: boolean;
}> = ({ product, artisan, highlighted = false, showArtisanName = true }) => {
  const footerBg = highlighted ? 'bg-[#865D4E] text-[#F5E9D9]' : 'bg-[#DCC7AE] text-[#2F110A]';

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group flex flex-col rounded-b-[22px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
    >
      {/* Contenedor 3:4 sobre fondo negro */}
      <div className="bg-black w-full aspect-[3/4] flex items-center justify-center p-4 pb-8 overflow-hidden relative">
        <img
          src={product.main_image_url}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && product.piece_type === 'fija' && (
          <span className="absolute top-2 right-2 bg-[#741712] text-[#F4E6D4] text-xs px-2 py-0.5 rounded">
            Sin stock
          </span>
        )}
      </div>

      {/* Zócalo curvo convexo */}
      <div
        className={`product-card-footer ${footerBg} px-4 pt-2 pb-4 min-h-[92px] flex flex-col justify-between transition-colors group-hover:bg-[#865D4E] group-hover:text-[#F5E9D9]`}
      >
        <div className="relative z-10">
          <h3 className="font-bold text-[15px] md:text-[16px] leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs md:text-[13px] opacity-90 mt-0.5">{product.dimensions}</p>
        </div>

        {showArtisanName && artisan && (
          <p
            className={`relative z-10 text-xs md:text-[13.5px] italic font-semibold mt-1.5 ${
              highlighted
                ? 'text-[#F5E9D9]'
                : 'text-[#8C1D15] group-hover:text-[#F5E9D9]'
            }`}
          >
            {artisan.full_name}
          </p>
        )}
      </div>
    </Link>
  );
};

/* Flecha circular de carrusel (izquierda / derecha) idéntica al PDF */
export const CarouselArrow: React.FC<{
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}> = ({ direction, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
    className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#BD9B7B]/90 hover:bg-[#A68160] text-[#5C1912] flex items-center justify-center shadow-md transition-transform hover:scale-105 focus:outline-none ${className}`}
  >
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
    >
      {direction === 'left' ? (
        <path d="M15 6l-7 6 7 6V6z" />
      ) : (
        <path d="M9 6l7 6-7 6V6z" />
      )}
    </svg>
  </button>
);

/* Cinta adhesiva negra superior de las hojas de formulario */
export const BlackMaskingTape: React.FC = () => (
  <div
    className="w-36 md:w-44 h-11 md:h-12 bg-[#1D1711] mx-auto -mt-6 mb-4 relative z-20 shadow-md opacity-95"
    style={{
      clipPath:
        'polygon(4% 4%, 98% 0%, 95% 28%, 99% 56%, 94% 82%, 97% 100%, 2% 96%, 6% 70%, 1% 42%, 5% 18%)',
      transform: 'rotate(-1deg)',
    }}
  />
);

