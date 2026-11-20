import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Artisan,
  ArtisanRegistrationInput,
  BuyerAccountInput,
  Catalog,
  Material,
  Product,
} from '../types/database';
import {
  INITIAL_ARTISANS,
  INITIAL_CATALOGS,
  INITIAL_MATERIALS,
  INITIAL_PRODUCTS,
} from '../data/fallbackData';

export type UserRole = 'guest' | 'cliente' | 'artesano';

export interface BuyerProfileData {
  full_name: string;
  phone: string;
  username: string;
  email: string;
  avatar_url?: string | null;
}

export interface PurchasedOrderItem {
  id: number;
  date_label: string;
  product_name: string;
  amount: number;
  status_label: string;
}

export interface PieceFormInput {
  id?: number;
  name: string;
  dimensions: string;
  price?: number | null;
  stock: number;
  work_hours: string;
  material_label: string;
  material_id: number;
  technique: string;
  short_description: string;
  category_type: 'utilitario' | 'decorativo';
  is_featured: boolean;
  image_url: string;
}

interface AppContextValue {
  materials: Material[];
  artisans: Artisan[];
  catalogs: Catalog[];
  products: Product[];
  loading: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  loginAsDemoClient: () => void;
  loginAsDemoArtisan: (artisanId?: number) => void;
  activeArtisanId: number;
  setActiveArtisanId: (id: number) => void;
  buyerProfile: BuyerProfileData;
  updateBuyerProfile: (patch: Partial<BuyerProfileData>) => void;
  purchasedOrders: PurchasedOrderItem[];
  favoriteProductIds: number[];
  toggleFavorite: (productId: number) => void;
  selectedDeliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro';
  setSelectedDeliveryMethod: (m: 'envio' | 'retiro_mat' | 'acordar_retiro') => void;
  currentBuyerName: string | null;
  refreshData: () => Promise<void>;
  registerBuyer: (input: BuyerAccountInput) => Promise<void>;
  registerArtisan: (input: ArtisanRegistrationInput) => Promise<Artisan>;
  updateArtisanProfile: (artisanId: number, updates: Partial<Artisan>) => Promise<void>;
  savePiece: (artisanId: number, input: PieceFormInput) => Promise<Product>;
  deletePiece: (productId: number) => Promise<void>;
  completePurchase: (
    productId: number,
    buyerName: string,
    deliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro',
    cardLast4: string
  ) => Promise<{ order_id: number; new_stock: number }>;
}

const DEFAULT_BUYER_PROFILE: BuyerProfileData = {
  full_name: 'Andrés Navarro',
  phone: '3794 819429',
  username: 'Andres nv',
  email: 'andres.navarro@gmail.com',
  avatar_url: null,
};

const DEFAULT_PURCHASED_ORDERS: PurchasedOrderItem[] = [
  {
    id: 101,
    date_label: '17 Dic 2026',
    product_name: 'Mate Yaguareté',
    amount: 60000,
    status_label: 'Por retirar',
  },
  {
    id: 102,
    date_label: '15 Dic 2026',
    product_name: 'Mate Flor',
    amount: 50000,
    status_label: 'Retirado',
  },
  {
    id: 103,
    date_label: '14 Dic 2026',
    product_name: 'Termera mediana',
    amount: 90000,
    status_label: 'Retirado',
  },
  {
    id: 104,
    date_label: '13 Dic 2026',
    product_name: 'Billetera Sol',
    amount: 15000,
    status_label: 'Retirado',
  },
  {
    id: 105,
    date_label: '13 Dic 2026',
    product_name: 'Billetera Fileteada',
    amount: 15000,
    status_label: 'Retirado',
  },
];

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials] = useState<Material[]>(INITIAL_MATERIALS);
  const [artisans, setArtisans] = useState<Artisan[]>(INITIAL_ARTISANS);
  const [catalogs] = useState<Catalog[]>(INITIAL_CATALOGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('ca_user_role') as UserRole | null;
      return saved || 'cliente';
    } catch {
      return 'cliente';
    }
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    try {
      localStorage.setItem('ca_user_role', role);
    } catch {}
  };

  const [activeArtisanId, setActiveArtisanIdState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ca_active_artisan_id');
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  const setActiveArtisanId = (id: number) => {
    setActiveArtisanIdState(id);
    try {
      localStorage.setItem('ca_active_artisan_id', String(id));
    } catch {}
  };

  const [buyerProfile, setBuyerProfile] = useState<BuyerProfileData>(() => {
    try {
      const saved = localStorage.getItem('ca_buyer_profile');
      return saved ? JSON.parse(saved) : DEFAULT_BUYER_PROFILE;
    } catch {
      return DEFAULT_BUYER_PROFILE;
    }
  });

  const updateBuyerProfile = (patch: Partial<BuyerProfileData>) => {
    setBuyerProfile((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('ca_buyer_profile', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const [purchasedOrders, setPurchasedOrders] = useState<PurchasedOrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('ca_purchased_orders');
      return saved ? JSON.parse(saved) : DEFAULT_PURCHASED_ORDERS;
    } catch {
      return DEFAULT_PURCHASED_ORDERS;
    }
  });

  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ca_favorites');
      return saved ? JSON.parse(saved) : [1, 2, 3, 4];
    } catch {
      return [1, 2, 3, 4];
    }
  });

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    'envio' | 'retiro_mat' | 'acordar_retiro'
  >('retiro_mat');

  const logout = () => {
    setUserRole('guest');
  };

  const loginAsDemoClient = () => {
    setBuyerProfile(DEFAULT_BUYER_PROFILE);
    setUserRole('cliente');
  };

  const loginAsDemoArtisan = (artisanId = 1) => {
    setActiveArtisanId(artisanId);
    setUserRole('artesano');
  };

  const toggleFavorite = (productId: number) => {
    setFavoriteProductIds((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('ca_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const refreshData = async () => {
    try {
      const [artRes, prodRes] = await Promise.all([
        supabase.from('artisans').select('*').order('id', { ascending: true }),
        supabase.from('products').select('*').order('id', { ascending: true }),
      ]);

      if (artRes.data && artRes.data.length > 0) {
        const knownSlugs = new Set(INITIAL_ARTISANS.map((a) => a.slug));
        const customArtisans = artRes.data.filter((a) => !knownSlugs.has(a.slug));
        if (customArtisans.length > 0) {
          setArtisans([...INITIAL_ARTISANS, ...customArtisans]);
        }
      }

      if (prodRes.data && prodRes.data.length > 0) {
        const dbBySlug = new Map(prodRes.data.map((p) => [p.slug, p]));
        const mergedInitial = INITIAL_PRODUCTS.map((item) => {
          const dbMatch = dbBySlug.get(item.slug);
          return dbMatch
            ? { ...item, stock: dbMatch.stock, price: dbMatch.price }
            : item;
        });
        const initialSlugs = new Set(INITIAL_PRODUCTS.map((p) => p.slug));
        const customProducts = prodRes.data.filter((p) => !initialSlugs.has(p.slug));
        setProducts([...customProducts, ...mergedInitial]);
      }
    } catch (err) {
      console.warn('Using local catalog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const registerBuyer = async (input: BuyerAccountInput) => {
    const { error } = await supabase.from('buyer_accounts').insert({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      accepted_terms: input.accepted_terms,
    });
    if (error && !error.message.includes('duplicate')) {
      console.warn('Supabase buyer insert warning:', error.message);
    }

    const username = input.email
      ? input.email.split('@')[0].replace(/[._]/g, ' ')
      : input.full_name;

    updateBuyerProfile({
      full_name: input.full_name,
      phone: input.phone || '3794 819429',
      username,
      email: input.email,
    });
    setUserRole('cliente');
  };

  const registerArtisan = async (input: ArtisanRegistrationInput): Promise<Artisan> => {
    const slug = `${(input.brand_name || input.full_name)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;

    const avatarUrl =
      input.production_photos[0] || '/assets/artisans/ariel-morales.jpg';

    const payload = {
      slug,
      full_name: input.full_name,
      brand_name: input.brand_name || `Artesanales ${input.full_name}`,
      dni: input.dni,
      phone: input.phone,
      instagram: input.instagram,
      address: input.locality || 'Taller 9 de Julio 111',
      locality: input.locality || 'Corrientes Capital',
      experience_years: input.experience_years || '10 años',
      materials_text: input.materials_text,
      material_id: input.material_id || 1,
      techniques: input.techniques || 'Cincelado y trabajo manual',
      short_bio: `Hola! soy ${input.full_name.split(' ')[0]}, ya llevo ${
        input.experience_years || '10 años'
      } siendo artesano trabajando con ${input.materials_text}`,
      history_text: `Mi acercamiento a la artesanía comenzó hace ${
        input.experience_years || 'más de diez años'
      }, trabajando con ${input.materials_text} mediante técnicas de ${
        input.techniques || 'elaboración tradicional correntina'
      }.`,
      avatar_url: avatarUrl,
      story_image_url: '/assets/artisans/ariel-historia-taller.jpg',
      production_photos:
        input.production_photos.length > 0
          ? input.production_photos
          : ['/assets/products/billetera-cincelada.jpg'],
      status: 'approved',
    };

    const { data, error } = await supabase
      .from('artisans')
      .insert(payload)
      .select('*')
      .single();

    const created: Artisan = data || {
      id: Date.now(),
      ...payload,
    };

    if (error) {
      console.warn('Supabase artisan insert warning:', error.message);
    }

    setArtisans((prev) => [...prev, created]);
    setActiveArtisanId(created.id);
    setUserRole('artesano');
    return created;
  };

  const updateArtisanProfile = async (
    artisanId: number,
    updates: Partial<Artisan>
  ) => {
    const { error } = await supabase
      .from('artisans')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', artisanId);

    if (error) {
      console.warn('Supabase artisan update warning:', error.message);
    }

    setArtisans((prev) =>
      prev.map((a) => (a.id === artisanId ? { ...a, ...updates } : a))
    );
  };

  const savePiece = async (
    artisanId: number,
    input: PieceFormInput
  ): Promise<Product> => {
    const slug = `${input.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

    const rowPayload = {
      slug,
      artisan_id: artisanId,
      catalog_id: null,
      material_id: input.material_id || 1,
      name: input.name.trim() || 'Nueva pieza artesanal',
      subtitle: `de ${input.material_label || 'Cuero'}`,
      category_type: input.category_type || 'utilitario',
      piece_section: 'Mis productos',
      piece_type: (input.price ? 'fija' : 'variable') as 'fija' | 'variable',
      dimensions: input.dimensions || '11 x 7 centímetros',
      weight: '120 g',
      work_hours: input.work_hours
        ? input.work_hours.includes('hora')
          ? input.work_hours
          : `${input.work_hours} horas`
        : '8 horas',
      material_label: input.material_label || 'Cuero',
      technique: input.technique || 'Cincelado',
      short_description:
        input.short_description ||
        `Pieza artesanal elaborada cuidadosamente a mano en ${
          input.material_label || 'cuero'
        } mediante técnica de ${input.technique || 'cincelado'}.`,
      stock: input.stock ?? 2,
      price: input.price ?? null,
      main_image_url: input.image_url || '/assets/products/billetera-cincelada.jpg',
      gallery_urls: [
        input.image_url || '/assets/products/billetera-cincelada.jpg',
        '/assets/products/billetera-detail-1.jpg',
        '/assets/products/billetera-detail-2.jpg',
      ],
      is_featured: input.is_featured,
    };

    if (input.id) {
      const existing = products.find((p) => p.id === input.id);
      const updatedProduct: Product = {
        ...(existing || { id: input.id }),
        ...rowPayload,
        slug: existing?.slug || rowPayload.slug,
      };

      await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          dimensions: updatedProduct.dimensions,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
          work_hours: updatedProduct.work_hours,
          material_label: updatedProduct.material_label,
          material_id: updatedProduct.material_id,
          technique: updatedProduct.technique,
          short_description: updatedProduct.short_description,
          category_type: updatedProduct.category_type,
          is_featured: updatedProduct.is_featured,
          main_image_url: updatedProduct.main_image_url,
        })
        .eq('slug', updatedProduct.slug);

      setProducts((prev) =>
        prev.map((p) => (p.id === input.id ? updatedProduct : p))
      );
      return updatedProduct;
    } else {
      const { data } = await supabase
        .from('products')
        .insert(rowPayload)
        .select('*')
        .single();

      const created: Product = data || {
        id: Date.now(),
        ...rowPayload,
      };
      setProducts((prev) => [created, ...prev]);
      return created;
    }
  };

  const deletePiece = async (productId: number) => {
    const target = products.find((p) => p.id === productId);
    if (target) {
      await supabase.from('products').delete().eq('slug', target.slug);
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const completePurchase = async (
    productId: number,
    buyerName: string,
    deliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro',
    cardLast4: string
  ) => {
    const target = products.find((p) => p.id === productId);
    const nextStock = Math.max(0, (target?.stock ?? 1) - 1);

    const newOrderItem: PurchasedOrderItem = {
      id: Date.now(),
      date_label: '19 Nov 2026',
      product_name: target?.name || 'Pieza artesanal',
      amount: target?.price || 15000,
      status_label: 'Por retirar',
    };
    setPurchasedOrders((prev) => {
      const updated = [newOrderItem, ...prev];
      try {
        localStorage.setItem('ca_purchased_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    const { data, error } = await supabase.rpc('complete_purchase', {
      p_product_id: productId,
      p_buyer_name: buyerName,
      p_delivery_method: deliveryMethod,
      p_card_last4: cardLast4,
      p_quantity: 1,
    });

    if (!error && data) {
      const dbStock = Number(data.new_stock);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: dbStock } : p))
      );
      return { order_id: Number(data.order_id), new_stock: dbStock };
    }

    if (target) {
      await supabase
        .from('products')
        .update({ stock: nextStock })
        .eq('slug', target.slug);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: nextStock } : p))
    );
    return { order_id: Date.now(), new_stock: nextStock };
  };

  return (
    <AppContext.Provider
      value={{
        materials,
        artisans,
        catalogs,
        products,
        loading,
        userRole,
        setUserRole,
        logout,
        loginAsDemoClient,
        loginAsDemoArtisan,
        activeArtisanId,
        setActiveArtisanId,
        buyerProfile,
        updateBuyerProfile,
        purchasedOrders,
        favoriteProductIds,
        toggleFavorite,
        selectedDeliveryMethod,
        setSelectedDeliveryMethod,
        currentBuyerName: buyerProfile.full_name,
        refreshData,
        registerBuyer,
        registerArtisan,
        updateArtisanProfile,
        savePiece,
        deletePiece,
        completePurchase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
