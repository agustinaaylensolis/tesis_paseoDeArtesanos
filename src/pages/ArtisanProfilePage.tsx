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
    const sameMat = products.filter((p) => p.material_id === (artisan.material_id || 1));
    if (sameMat.length >= 8) {
      if ((artisan.material_id || 1) === 1) {
        const mLechuza = products.find((p) => p.slug === 'mate-lechuza') || sameMat[0];
        const bCarp =
          products.find((p) => p.slug === 'billetera-de-carpincho') || sameMat[1];
        const mFam =
          products.find((p) => p.slug === 'mate-familia-de-carpinchos') || sameMat[2];
        const bill = products.find((p) => p.slug === 'billetera-cincelada') || sameMat[3];
        return [mLechuza, bCarp, mFam, bill, ...sameMat.slice(4, 8)];
      }
      return sameMat.slice(0, 8);
    }
    return products.slice(0, 8);
  }, [products, artisan]);

  return (
    <div className="bg-kraft-texture min-h-screen py-12 md:py-16 px-6 md:px-16">
      <div className="max-w-[960px] mx-auto space-y-10">
        {/* 1. BLOQUE SUPERIOR DE PERFIL (2 COLUMNAS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-8">
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

            <div className="mt-6 space-y-2.5 text-sm md:text-[15px] text-[#F5E9D9]">
              <p className="font-semibold">Datos de contacto:</p>
              <p>{artisan.phone}</p>
              <p>{artisan.instagram || 'Artesanales_Eltimbo'}</p>
              <p>{artisan.address || 'Taller 9 de Julio 111'}</p>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#D6BFA6]/85 rounded-xl p-7 md:p-9 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg md:text-xl text-[#4A170E] mb-3">
                Un poco sobre mí...
              </h2>
              <p className="text-base md:text-[17px] text-[#33130C] leading-relaxed">
                Hola! soy {artisan.full_name.split(' ')[0]}, Desde hace más de diez años me
                dedico a trabajar con {artisan.materials_text.toLowerCase()}.. Mi
                especialidad es la elaboración de billeteras, mates y accesorios
                artesanales, piezas que realizo cuidando cada detalle.
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

        {/* 2. BLOQUE "UN POCO DE MI HISTORIA" CON FOTO CURVA A LA DERECHA */}
        <div className="bg-[#D6BFA6]/85 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 p-7 md:p-9">
            <h2 className="font-display-serif text-2xl md:text-[32px] font-bold text-[#4A170E] mb-3">
              Un poco de mi historia
            </h2>
            <p className="text-sm md:text-[15px] text-[#3B170E] leading-relaxed">
              {artisan.history_text}
            </p>
          </div>

          <div className="md:col-span-5 h-56 md:h-60 overflow-hidden">
            <img
              src={artisan.story_image_url || '/assets/artisans/ariel-historia-taller.jpg'}
              alt="Proceso en el taller"
              className="w-full h-full object-cover md:rounded-l-[120px]"
            />
          </div>
        </div>

        {/* 3. CONOCÉ MIS PRODUCTOS */}
        <div className="pt-2 space-y-6">
          <h2 className="font-display-serif text-3xl md:text-[36px] font-bold text-[#4A170E]">
            Conocé mis productos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {artisanProducts.map((prod, idx) => (
              <ProductCard
                key={`${prod.id}-${idx}`}
                product={prod}
                artisan={artisan}
                highlighted={idx === 0}
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
              className="text-sm font-semibold text-[#741712] hover:underline"
            >
              Ir a mi panel de gestión de catálogo →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
