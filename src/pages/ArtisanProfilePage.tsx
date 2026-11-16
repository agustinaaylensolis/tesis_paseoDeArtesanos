import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CarouselArrow, ProductCard } from '../components/ui';

export const ArtisanProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { artisans, products } = useApp();

  const artisan = useMemo(() => {
    return (
      artisans.find((a) => a.slug === slug) ||
      artisans.find((a) => a.slug === 'silvia-balbuena') ||
      artisans[0]
    );
  }, [artisans, slug]);

  // Para que todos los perfiles muestren las 3 filas completas del mockup (Bombillas, Accesorios, Piezas decorativas)
  const artisanProducts = useMemo(() => {
    const own = products.filter((p) => p.artisan_id === artisan.id);
    const baseFour = own.length >= 4 ? own.slice(0, 4) : products.slice(0, 4);
    return baseFour;
  }, [products, artisan]);

  const sections = ['Bombillas', 'Accesorios', 'Piezas decorativas'];

  return (
    <div className="bg-kraft-texture min-h-screen py-12 md:py-16 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-10">
        {/* 1. BLOQUE SUPERIOR DE PERFIL (2 COLUMNAS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-8">
          {/* Tarjeta izquierda marrón (#865D4E) con avatar circular superpuesto */}
          <div className="md:col-span-5 relative bg-[#865D4E] text-[#F5E9D9] rounded-xl px-7 pt-16 pb-8 shadow-md flex flex-col justify-between">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden bg-black shadow-lg border-2 border-[#865D4E]">
              <img
                src={artisan.avatar_url}
                alt={artisan.brand_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mt-2">
              <h1 className="italic font-bold text-2xl md:text-[26px] text-[#E6CEB5] leading-tight">
                {artisan.brand_name.includes('Silvia') ? (
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

            <div className="mt-6 space-y-2.5 text-sm md:text-[15px] text-[#F5E9D9]">
              <p className="font-semibold">Datos de contacto:</p>
              <p>{artisan.phone}</p>
              <p>{artisan.instagram || 'Artesanales_Silvia'}</p>
              <p>{artisan.address || 'Taller 9 de Julio 111'}</p>
            </div>
          </div>

          {/* Tarjeta derecha beige con "Un poco sobre mí..." y botón ¡Contactar! */}
          <div className="md:col-span-7 bg-[#D6BFA6]/85 rounded-xl p-7 md:p-9 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg md:text-xl text-[#4A170E] mb-3">
                Un poco sobre mí...
              </h2>
              <p className="text-base md:text-[17px] text-[#33130C] leading-relaxed">
                Hola! soy {artisan.full_name.split(' ')[0]}, Desde hace más de diez años me
                dedico a trabajar con plata y minerales.. Mi especialidad es la elaboración de
                bombillas, mates y accesorios artesanales, piezas que realizo cuidando cada
                detalle.
              </p>
            </div>

            <div className="mt-6">
              <a
                href={`https://wa.me/549${artisan.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-artesanal px-8 py-1.5 text-base md:text-lg"
              >
                ¡Contactar!
              </a>
            </div>
          </div>
        </div>

        {/* 2. BLOQUE "UN POCO DE MI HISTORIA" */}
        <div className="bg-[#D6BFA6]/85 rounded-xl p-7 md:p-9 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] mb-3">
              Un poco de mi historia
            </h2>
            <p className="text-sm md:text-[15px] text-[#3B170E] leading-relaxed">
              {artisan.history_text}
            </p>
          </div>

          <div className="md:col-span-5">
            <img
              src={artisan.story_image_url || '/assets/artisans/silvia-historia-taller.jpg'}
              alt="Proceso en el taller"
              className="w-full h-44 md:h-48 object-cover rounded shadow"
            />
          </div>
        </div>

        {/* 3. CATÁLOGO DE PRODUCTOS DEL ARTESANO */}
        <div className="pt-2 space-y-10">
          <h2 className="font-display-serif text-3xl md:text-[36px] font-bold text-[#4A170E]">
            Catálogo de productos
          </h2>

          {sections.map((sectionTitle) => (
            <div key={sectionTitle} className="space-y-4">
              <h3 className="font-display-serif text-2xl md:text-[28px] font-semibold text-[#4A170E]">
                {sectionTitle}
              </h3>

              <div className="relative">
                <CarouselArrow
                  direction="left"
                  onClick={() => {}}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-20"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {artisanProducts.map((prod, idx) => (
                    <ProductCard
                      key={`${sectionTitle}-${prod.id}-${idx}`}
                      product={prod}
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
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <Link
            to="/mi-perfil-artesano"
            className="text-sm font-semibold text-[#741712] hover:underline"
          >
            ¿Sos {artisan.full_name}? Administrar mi vidriera digital →
          </Link>
        </div>
      </div>
    </div>
  );
};

