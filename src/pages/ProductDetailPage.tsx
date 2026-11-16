import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CarouselArrow, ProductCard } from '../components/ui';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, artisans } = useApp();

  const product = useMemo(() => {
    return (
      products.find((p) => p.slug === slug) ||
      products.find((p) => p.slug === 'bombilla-corazon') ||
      products[0]
    );
  }, [products, slug]);

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.id === product?.artisan_id) ||
      artisans.find((a) => a.slug === 'silvia-balbuena') ||
      artisans[0]
    );
  }, [artisans, product]);

  const gallery = useMemo(() => {
    const imgs = [product.main_image_url, ...(product.gallery_urls || [])];
    return imgs;
  }, [product]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  // Las 4 piezas mostradas en "Más productos del Artesano" y "Productos similares" en segunda parte de la web .pdf pág. 1
  const relatedFour = useMemo(() => {
    const cabo = products.find((p) => p.slug.includes('cabo-de-rebenque')) || products[0];
    const b22 = products.find((p) => p.slug.includes('bombilla-22cm')) || products[0];
    const b20 = products.find((p) => p.slug.includes('bombilla-20cm')) || products[0];
    const mate = products.find((p) => p.slug.includes('mate-de-tres-patas')) || products[0];
    return [cabo, b22, b20, mate];
  }, [products]);

  const formatPrice = (val?: number | null) => {
    if (!val) return 'Consultable';
    return `$${val.toLocaleString('es-AR')}`;
  };

  return (
    <div className="bg-kraft-texture min-h-screen py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-12">
        {/* 1. FICHA PRINCIPAL DEL PRODUCTO */}
        <div className="bg-[#D6BFA6]/85 rounded-2xl p-7 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda: Datos técnicos y botón Comprar */}
          <div className="md:col-span-6 space-y-3 text-[#2B0F08]">
            <h1 className="font-display-serif text-3xl md:text-[38px] font-bold text-[#4A170E] leading-tight mb-3">
              {product.name}
            </h1>

            <p className="text-base md:text-[17px]">
              Medidas:{' '}
              {product.dimensions === '22 cm' ? '22 centímetros' : product.dimensions}
            </p>
            <p className="text-base md:text-[17px]">
              Horas de Trabajo: {product.work_hours}
            </p>
            <p className="text-base md:text-[17px]">
              Material: {product.material_label}
            </p>
            <p className="text-base md:text-[17px]">Técnica: {product.technique}</p>

            <div className="pt-1">
              <p className="text-base md:text-[17px]">Breve Descripción:</p>
              <p className="text-base md:text-[17px] leading-relaxed">
                {product.short_description}
              </p>
            </div>

            <p className="text-base md:text-[17px] pt-1">
              Stock: {product.piece_type === 'fija' ? product.stock : 'A pedido'}
            </p>

            <p className="text-lg md:text-xl font-bold pt-1">
              Precio: {formatPrice(product.price)}
            </p>

            <div className="pt-4">
              {product.piece_type === 'fija' && product.stock === 0 ? (
                <span className="inline-block bg-[#6B4A3E] text-white px-8 py-2.5 rounded font-bold">
                  Sin stock disponible
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/checkout/entrega/${product.slug}`)}
                  className="btn-artesanal w-full sm:w-64 py-2.5 text-xl md:text-2xl font-bold"
                >
                  Comprar
                </button>
              )}
            </div>
          </div>

          {/* Columna derecha: Imagen principal en fondo negro + flechas + 3 miniaturas */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative bg-black aspect-[4/4.3] flex items-center justify-center p-6 shadow-md">
              <CarouselArrow
                direction="left"
                onClick={() =>
                  setSelectedImageIdx((i) => (i === 0 ? gallery.length - 1 : i - 1))
                }
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
              />

              <img
                src={gallery[selectedImageIdx] || product.main_image_url}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />

              <CarouselArrow
                direction="right"
                onClick={() =>
                  setSelectedImageIdx((i) => (i === gallery.length - 1 ? 0 : i + 1))
                }
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20"
              />
            </div>

            {/* 3 miniaturas inferiores tal como en el PDF */}
            <div className="grid grid-cols-3 gap-3">
              {[
                '/assets/products/bombilla-detail-1.jpg',
                '/assets/products/bombilla-detail-2.jpg',
                '/assets/products/bombilla-detail-3.jpg',
              ].map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const targetIdx = idx + 1 < gallery.length ? idx + 1 : 0;
                    setSelectedImageIdx(targetIdx);
                  }}
                  className="bg-black aspect-[3/3.6] overflow-hidden border-2 border-transparent hover:border-[#741712] transition-all"
                >
                  <img
                    src={thumbUrl}
                    alt={`Detalle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. BLOQUE "UN POCO DE MI HISTORIA" + CONOCER AL ARTESANO */}
        <div className="bg-[#D6BFA6]/85 rounded-2xl p-7 md:p-9 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display-serif text-2xl md:text-[34px] font-bold text-[#4A170E] mb-3">
              Un poco de mi historia
            </h2>
            <p className="text-sm md:text-[15px] text-[#33130C] leading-relaxed">
              {artisan.history_text}
            </p>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-black shadow-md mb-2">
              <img
                src={artisan.avatar_url}
                alt={artisan.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              to={`/artesano/${artisan.slug}`}
              className="btn-artesanal px-5 py-1.5 text-sm md:text-base -mt-3 relative z-10"
            >
              Conocer al artesano
            </Link>
          </div>
        </div>

        {/* 3. MÁS PRODUCTOS DEL ARTESANO */}
        <section className="space-y-5">
          <h2 className="font-display-serif text-2xl md:text-[34px] font-bold text-[#4A170E]">
            Más productos del Artesano
          </h2>

          <div className="relative">
            <CarouselArrow
              direction="left"
              onClick={() => {}}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedFour.map((item, idx) => (
                <ProductCard
                  key={`more-${item.id}-${idx}`}
                  product={item}
                  artisan={artisan}
                  showArtisanName={false}
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

        {/* 4. PRODUCTOS SIMILARES */}
        <section className="space-y-5">
          <h2 className="font-display-serif text-2xl md:text-[34px] font-bold text-[#4A170E]">
            Productos similares
          </h2>

          <div className="relative">
            <CarouselArrow
              direction="left"
              onClick={() => {}}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedFour.map((item, idx) => (
                <ProductCard
                  key={`sim-${item.id}-${idx}`}
                  product={item}
                  artisan={artisanMap.get(item.artisan_id)}
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

