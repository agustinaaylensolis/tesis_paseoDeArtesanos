import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui';

/* PERFIL PÚBLICO DEL ARTESANO (paginas.pdf pág. 4 — Artesanales Ariel Morales) */
export const ArtisanProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { artisans, products, userRole, activeArtisanId } = useApp();

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.slug === slug) ||
      artisans.find((a) => a.slug === 'ariel-morales') ||
      artisans[0]
    );
  }, [artisans, slug]);

  const artisanProducts = useMemo(() => {
    return products.filter((p) => p.artisan_id === artisan.id);
  }, [products, artisan.id]);

  return (
    <div
      className="bg-kraft-texture min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-16"
      style={{ fontFamily: '"sitka-text", Georgia, serif' }}
    >
      <div className="max-w-[960px] mx-auto space-y-10">
        {/* 1. BLOQUE SUPERIOR DE PERFIL (PROPORCIONES 50/50) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch pt-16 md:pt-14">
          {/* Tarjeta izquierda: Avatar grande + Nombre + Contacto */}
          <div className="relative bg-[#865D4E] text-[#F5E9D9] rounded-xl px-8 sm:px-10 md:px-12 pt-24 pb-10 min-h-[410px] shadow-sm flex flex-col justify-between">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full overflow-hidden bg-black shadow-lg">
              <img
                src={artisan.avatar_url}
                alt={artisan.brand_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mt-2">
              <h1
                style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                className="italic font-bold text-2xl md:text-[32px] text-[#E5C9A3] leading-tight"
              >
                {artisan.brand_name.includes('Ariel') ? (
                  <>
                    Artesanales
                    <br />
                    Ariel Morales
                  </>
                ) : artisan.brand_name.includes('Silvia') ? (
                  <>
                    Artesanales
                    <br />
                    Silvia Balbuena
                  </>
                ) : (
                  artisan.brand_name
                )}
              </h1>
            </div>

            <div className="mt-8 space-y-4 text-sm md:text-[15.5px] text-[#F5E9D9] break-words">
              <p className="font-medium">Datos de contacto:</p>
              <p>{artisan.phone}</p>
              <p>{artisan.instagram || 'Artesanales_Eltimbo'}</p>
              <p>{artisan.address || 'Taller 9 de Julio 111'}</p>
            </div>
          </div>

          {/* Tarjeta derecha: Un poco sobre mí + Botón Contactar */}
          <div className="bg-[#D8C5AE]/65 rounded-xl px-8 sm:px-10 md:px-12 pt-10 md:pt-14 pb-10 min-h-[410px] shadow-sm flex flex-col justify-between">
            <div>
              <h2
                style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                className="font-semibold text-lg md:text-[20px] text-[#2B0F08] mb-4"
              >
                Un poco sobre mí...
              </h2>
              <p className="text-sm md:text-[16px] text-[#2B0F08] leading-relaxed whitespace-pre-line">
                {artisan.short_bio}
              </p>
            </div>

            <div className="mt-8">
              <a
                href={`https://wa.me/549${artisan.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-artesanal text-[#E5C9A3] inline-block px-10 py-1.5 text-base md:text-lg shadow-md"
              >
                ¡Contactar!
              </a>
            </div>
          </div>
        </div>

        {/* 2. BLOQUE "UN POCO DE MI HISTORIA" CON CURVA CÓNCAVA A LA DERECHA */}
        <div className="bg-[#D8C5AE]/65 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Definición de la curva cóncava para la imagen */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="story-concave-curve" clipPathUnits="objectBoundingBox">
                <path d="M 0,0 L 1,0 L 1,1 L 0,1 Q 0.24,0.5 0,0 Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <h2
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
              className="font-display-serif text-2xl md:text-[34px] font-normal text-[#5C2014] mb-3"
            >
              Un poco de mi historia
            </h2>
            <p className="text-sm md:text-[15.5px] text-[#2B0F08] leading-relaxed">
              {artisan.history_text}
            </p>
          </div>

          <div className="md:col-span-5 min-h-[220px] md:min-h-[240px] overflow-hidden md:[clip-path:url(#story-concave-curve)]">
            <img
              src={artisan.story_image_url || '/assets/artisans/ariel-historia-taller.jpg'}
              alt="Proceso en el taller"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* 3. CONOCÉ MIS PRODUCTOS */}
        <div className="pt-2 space-y-6">
          <h2
            style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            className="font-display-serif text-3xl md:text-[36px] font-normal text-[#5C2014]"
          >
            Conocé mis productos
          </h2>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {artisanProducts.map((prod, idx) => (
              <ProductCard
                key={`${prod.id}-${idx}`}
                product={prod}
                artisan={artisan}
                showArtisanName={false}
              />
            ))}
          </div>
        </div>

        {/* Solo visible si el usuario logueado tiene rol de artesano y es dueño del perfil */}
        {userRole === 'artesano' && activeArtisanId === artisan.id && (
          <div className="pt-4 flex justify-end">
            <Link
              to="/mi-perfil-artesano"
              className="text-sm font-semibold text-[#732714] hover:underline"
            >
              Ir a mi panel de gestión de catálogo →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};