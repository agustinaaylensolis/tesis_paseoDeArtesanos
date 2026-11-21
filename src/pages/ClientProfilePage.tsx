import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, AtSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { uploadMediaFile } from '../lib/supabase';
import { ProductCard } from '../components/ui';

/* PERFIL DE CLIENTE / COMPRADOR: ANDRÉS NAVARRO (paginas.pdf pág. 7 y 8) */
export const ClientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    artisans,
    buyerProfile,
    updateBuyerProfile,
    purchasedOrders,
    favoriteProductIds,
    logout,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(buyerProfile.full_name);
  const [phone, setPhone] = useState(buyerProfile.phone);
  const [username, setUsername] = useState(buyerProfile.username);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [openBought, setOpenBought] = useState(true);
  const [openFavorites, setOpenFavorites] = useState(true);

  const artisanMap = useMemo(() => {
    const map = new Map<number, (typeof artisans)[0]>();
    artisans.forEach((a) => map.set(a.id, a));
    return map;
  }, [artisans]);

  const favoriteProducts = useMemo(() => {
    const favs = products.filter((p) => favoriteProductIds.includes(p.id));
    if (favs.length > 0) {
      // Ordenar primero Mate Lechuza, Billetera de Carpincho, Mate familia de carpinchos, Billetera si están presentes tal como en la imagen
      const orderSlugs = [
        'mate-lechuza',
        'billetera-de-carpincho',
        'mate-familia-de-carpinchos',
        'billetera-cincelada',
      ];
      return [...favs].sort((a, b) => {
        const ia = orderSlugs.indexOf(a.slug);
        const ib = orderSlugs.indexOf(b.slug);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return 0;
      });
    }
    return [];
  }, [products, favoriteProductIds]);

  const handleAvatarChange = async (file?: File | null) => {
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadMediaFile(file, 'clientes');
      updateBuyerProfile({ avatar_url: url });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = () => {
    updateBuyerProfile({
      full_name: fullName.trim() || 'Andrés Navarro',
      phone: phone.trim() || '3794 819429',
      username: username.trim() || 'Andres nv',
    });
    setIsEditing(false);
  };

  return (
    <div
      className="bg-kraft-texture min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-16"
      style={{ fontFamily: '"sitka-text", Georgia, serif' }}
    >
      <div className="max-w-[960px] mx-auto space-y-10">
        {/* 1. TARJETA SUPERIOR MARRÓN DEL CLIENTE (Andrés Navarro) */}
        <div className="max-w-[680px] mx-auto bg-[#865D4E] text-[#F5E9D9] rounded-xl p-6 sm:p-8 md:p-10 shadow-md flex flex-col sm:flex-row items-center justify-center gap-8">
          <label className="w-32 h-32 rounded-full bg-[#5B2220] flex items-center justify-center text-5xl font-bold text-[#C8A796] shrink-0 shadow-inner cursor-pointer overflow-hidden relative group">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleAvatarChange(e.target.files?.[0])}
            />
            {buyerProfile.avatar_url ? (
              <img
                src={buyerProfile.avatar_url}
                alt={buyerProfile.full_name}
                className="w-full h-full object-cover"
              />
            ) : uploadingAvatar ? (
              <span className="text-xs">Subiendo...</span>
            ) : (
              <span className="group-hover:scale-110 transition-transform select-none">
                +
              </span>
            )}
          </label>

          <div className="space-y-2.5 text-center sm:text-left flex-1 max-w-xs">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  className="w-full bg-transparent border-b border-[#E6CEB5] text-2xl italic font-medium text-[#E6CEB5] focus:outline-none"
                  placeholder="Nombre y apellido"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  className="w-full bg-transparent border-b border-[#E6CEB5]/60 text-sm text-[#E6CEB5] focus:outline-none"
                  placeholder="Teléfono"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  className="w-full bg-transparent border-b border-[#E6CEB5]/60 text-sm text-[#E6CEB5] focus:outline-none"
                  placeholder="Usuario"
                />
              </div>
            ) : (
              <>
                <h1
                  style={{ fontFamily: '"sitka-text", Georgia, serif' }}
                  className="italic font-bold text-3xl md:text-4xl text-[#E6CEB5]"
                >
                  {buyerProfile.full_name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#E6CEB5]/90">
                  <Phone className="w-4 h-4" />
                  <span>{buyerProfile.phone}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#E6CEB5]/90">
                  <AtSign className="w-4 h-4" />
                  <span>{buyerProfile.username}</span>
                </div>
              </>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="btn-artesanal-dark px-6 py-1 text-sm"
                  >
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/crear-cuenta');
                    }}
                    className="text-xs text-[#F5E9D9] underline hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-artesanal-dark px-6 py-1 text-sm"
                >
                  Editar mi perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. LOS PRODUCTOS QUE COMPRASTE ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenBought((v) => !v)}
            className="w-full bg-[#CDB59C] hover:bg-[#C3A98E] rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span className="font-display-serif text-2xl md:text-[30px] font-medium text-[#4A170E]">
              Los productos que compraste
            </span>
            <span className="text-[#4A170E] text-xl">{openBought ? '▼' : '▶'}</span>
          </button>

          {openBought && (
            <div className="bg-[#D6BFA6]/80 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm md:text-[15px] text-[#2B0F08]">
                <thead>
                  <tr className="border-b border-[#8C6E58]/50 font-bold">
                    <th className="pb-3 pr-4">Fecha</th>
                    <th className="pb-3 pr-4">Producto</th>
                    <th className="pb-3 pr-4">Importe</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8C6E58]/30">
                  {purchasedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 pr-4">{order.date_label}</td>
                      <td className="py-3 pr-4 italic font-bold">{order.product_name}</td>
                      <td className="py-3 pr-4">
                        $ {order.amount.toLocaleString('es-AR')}
                      </td>
                      <td className="py-3">{order.status_label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 3. PRODUCTOS FAVORITOS ▼ */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setOpenFavorites((v) => !v)}
            className="w-full bg-[#CDB59C] hover:bg-[#C3A98E] rounded-xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors"
          >
            <span className="font-display-serif text-2xl md:text-[30px] font-medium text-[#4A170E]">
              Productos favoritos
            </span>
            <span className="text-[#4A170E] text-xl">
              {openFavorites ? '▼' : '▶'}
            </span>
          </button>

          {openFavorites && (
            <>
              {favoriteProducts.length === 0 ? (
                <div className="bg-[#D6BFA6]/75 rounded-xl p-8 text-center text-sm text-[#4A170E]">
                  Todavía no marcaste piezas con el icono de corazón en el catálogo.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                  {favoriteProducts.map((prod, idx) => (
                    <ProductCard
                      key={`fav-${prod.id}-${idx}`}
                      product={prod}
                      artisan={artisanMap.get(prod.artisan_id)}
                      highlighted={idx === 0}
                      showArtisanName={false}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};