import React, { useEffect, useMemo, useState } from 'react';
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
      products.find((p) => p.slug === 'billetera-cincelada') ||
      products[0]
    );
  }, [products, slug]);

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.id === product?.artisan_id) ||
      artisans.find((a) => a.slug === 'ariel-morales') ||
      artisans[0]
    );
  }, [artisans, product]);

  const SIMULATED_DETAIL_CROPS = [
    'scale-[1.45] object-[50%_20%]',
    'scale-[1.7] object-center',
    'scale-[1.55] object-[65%_80%]',
  ];

  const detailThumbs = useMemo(() => {
    const rawGallery = product.gallery_urls || [];
    const realDetailUrls = rawGallery.filter((url) => {
      if (!url || url === product.main_image_url) return false;
      if (
        url.includes('billetera-detail-') &&
        product.slug !== 'billetera-cincelada'
      ) {
        return false;
      }
      if (
        url.includes('bombilla-detail-') &&
        !product.slug.includes('bombilla')
      ) {
        return false;
      }
      return true;
    });

    return [0, 1, 2].map((idx) =>
      realDetailUrls[idx]
        ? { url: realDetailUrls[idx], cropClass: '' }
        : { url: product.main_image_url, cropClass: SIMULATED_DETAIL_CROPS[idx] }
    );
  }, [product]);

  const gallery = useMemo(() => {
    return [{ url: product.main_image_url, cropClass: '' }, ...detailThumbs];
  }, [product.main_image_url, detailThumbs]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [product.id]);

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  // "Más productos del Artesano": únicamente productos que pertenecen a este mismo artesano
  const moreFromArtisan = useMemo(() => {
    const own = products.filter(
      (p) => p.artisan_id === product.artisan_id && p.id !== product.id
    );
    return own.slice(0, 4);
  }, [products, product]);

  // "Productos similares": otros productos del mismo material
  const similarProducts = useMemo(() => {
    const sameMat = products.filter(
      (p) => p.material_id === product.material_id && p.id !== product.id
    );
    return sameMat.slice(0, 4);
  }, [products, product]);

  const formatPrice = (val?: number | null) => {
    if (!val) return 'Consultable';
    return `$${val.toLocaleString('es-AR')}`;
  };

  return (
    <div className="bg-kraft-texture min-h-screen py-8 md:py-14 px-4 sm:px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-10 md:space-y-12">
        {/* 1. FICHA PRINCIPAL DEL PRODUCTO */}
        <div className="bg-[#D8C5AE]/65 rounded-2xl p-5 sm:p-7 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda: Datos técnicos y botón Comprar */}
          <div className="md:col-span-6 space-y-3 text-[#2B0F08]">
            <h1 className="font-display-serif text-3xl md:text-[38px] font-normal text-[#5C2014] leading-tight mb-3">
              {product.name}
            </h1>

            <p className="text-base md:text-[17px]">
              Medidas:{' '}
              {product.dimensions === '11 cm x 7 cm'
                ? '11 x 7 centímetros'
                : product.dimensions}
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
                <span className="inline-block bg-[#6B4A3E] text-[#E5C9A3] px-8 py-2.5 rounded font-bold">
                  Sin stock disponible
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/checkout/entrega/${product.slug}`)}
                  className="btn-ui-rojo w-full sm:w-64 py-2.5 text-xl md:text-2xl font-bold text-[#E5C9A3]"
                >
                  Comprar
                </button>
              )}
            </div>
          </div>
          {/* Columna derecha: Imagen principal + flechas + 3 miniaturas */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative bg-[#363F45] aspect-[4/4.3] flex items-center justify-center overflow-hidden shadow-md">
              <CarouselArrow
                direction="left"
                onClick={() =>
                  setSelectedImageIdx((i) => (i === 0 ? gallery.length - 1 : i - 1))
                }
                className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20"
              />

              <img
                src={gallery[selectedImageIdx]?.url || product.main_image_url}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  gallery[selectedImageIdx]?.cropClass || ''
                }`}
              />

              <CarouselArrow
                direction="right"
                onClick={() =>
                  setSelectedImageIdx((i) => (i === gallery.length - 1 ? 0 : i + 1))
                }
                className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20"
              />
            </div>

            {/* 3 miniaturas inferiores: fotos reales de detalle o acercamientos CSS de la foto principal */}
            <div className="grid grid-cols-3 gap-3">
              {detailThumbs.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setSelectedImageIdx((curr) => (curr === idx + 1 ? 0 : idx + 1))
                  }
                  className={`bg-black aspect-[3/3.6] overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx + 1
                      ? 'border-[#741712]'
                      : 'border-transparent hover:border-[#741712]/70'
                  }`}
                >
                  <img
                    src={thumb.url}
                    alt={`Detalle ${idx + 1} de ${product.name}`}
                    className={`w-full h-full object-cover ${thumb.cropClass}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. BLOQUE "UN POCO DE MI HISTORIA" + CONOCER AL ARTESANO */}
        <div className="bg-[#D8C5AE]/65 rounded-2xl p-5 sm:p-7 md:p-9 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display-serif text-2xl md:text-[34px] font-normal text-[#5C2014] mb-3">
              Un poco de mi historia
            </h2>
            <p className="text-sm md:text-[15px] text-[#732714] leading-relaxed">
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
              className="btn-artesanal-dark text-[#E5C9A3] px-5 py-1.5 text-sm md:text-base -mt-3 relative z-10"
            >
              Conocer al artesano
            </Link>
          </div>
        </div>

        {/* 3. MÁS PRODUCTOS DEL ARTESANO */}
        <section className="space-y-5">
          <h2 className="font-display-serif text-2xl md:text-[34px] font-normal text-[#5C2014]">
            Más productos del Artesano
          </h2>

          <div className="relative">
            <CarouselArrow
              direction="left"
              onClick={() => { }}
              className="hidden md:flex absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20"
            />
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {moreFromArtisan.map((item, idx) => (
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
              onClick={() => { }}
              className="hidden md:flex absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20"
            />
          </div>
        </section>

        {/* 4. PRODUCTOS SIMILARES */}
        <section className="space-y-5">
          <h2 className="font-display-serif text-2xl md:text-[34px] font-normal text-[#5C2014]">
            Productos similares
          </h2>

          <div className="relative">
            <CarouselArrow
              direction="left"
              onClick={() => { }}
              className="hidden md:flex absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20"
            />
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((item, idx) => (
                <ProductCard
                  key={`sim-${item.id}-${idx}`}
                  product={item}
                  artisan={artisanMap.get(item.artisan_id) || artisan}
                  showArtisanName={true}
                />
              ))}
            </div>
            <CarouselArrow
              direction="right"
              onClick={() => { }}
              className="hidden md:flex absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20"
            />
          </div>
        </section>
      </div>
    </div>
  );
};