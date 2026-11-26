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
  product_id?: number;
  artisan_id?: number;
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
  gallery_urls?: string[];
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
    artisan_id: 1,
    date_label: '17 Dic 2026',
    product_name: 'Mate Yaguareté',
    amount: 60000,
    status_label: 'Por retirar',
  },
  {
    id: 102,
    artisan_id: 1,
    date_label: '15 Dic 2026',
    product_name: 'Mate Flor',
    amount: 50000,
    status_label: 'Retirado',
  },
  {
    id: 103,
    artisan_id: 1,
    date_label: '14 Dic 2026',
    product_name: 'Termera mediana',
    amount: 90000,
    status_label: 'Retirado',
  },
  {
    id: 104,
    artisan_id: 1,
    date_label: '13 Dic 2026',
    product_name: 'Billetera Sol',
    amount: 15000,
    status_label: 'Retirado',
  },
  {
    id: 105,
    artisan_id: 1,
    date_label: '13 Dic 2026',
    product_name: 'Billetera Fileteada',
    amount: 15000,
    status_label: 'Retirado',
  },
];

const ARTISANS_STORAGE_KEY = 'ca_artisans_v3';
const PRODUCTS_STORAGE_KEY = 'ca_products_v3';

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials] = useState<Material[]>(INITIAL_MATERIALS);
  const [artisans, setArtisans] = useState<Artisan[]>(() => {
    try {
      const saved = localStorage.getItem(ARTISANS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ARTISANS;
    } catch {
      return INITIAL_ARTISANS;
    }
  });
  const [catalogs] = useState<Catalog[]>(INITIAL_CATALOGS);
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  // El rol se guarda por sesión del navegador: en cada visita nueva el usuario arranca
  // como invitado (el icono de perfil lleva a "Crear cuenta") y, tras registrarse o
  // ingresar, se redirige al perfil de cliente o artesano según corresponda.
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    try {
      localStorage.removeItem('ca_user_role');
      const saved = sessionStorage.getItem('ca_user_role') as UserRole | null;
      return saved || 'guest';
    } catch {
      return 'guest';
    }
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    try {
      sessionStorage.setItem('ca_user_role', role);
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
      const [artRes] = await Promise.all([
        supabase.from('artisans').select('*').order('id', { ascending: true }),
      ]);

      let savedLocalArtisans: Artisan[] = [];
      try {
        const raw = localStorage.getItem(ARTISANS_STORAGE_KEY);
        if (raw) savedLocalArtisans = JSON.parse(raw);
      } catch {}
      const localBySlug = new Map(savedLocalArtisans.map((a) => [a.slug, a]));

      // Los 11 artesanos iniciales mantienen SIEMPRE su id fijo (1..11) para no colisionar con productos de otros artesanos
      const initialSlugs = new Set(INITIAL_ARTISANS.map((a) => a.slug));
      const mergedInitial = INITIAL_ARTISANS.map((item) => {
        const localMatch = localBySlug.get(item.slug);
        return localMatch ? { ...localMatch, id: item.id } : item;
      });

      // Cualquier artesano nuevo registrado recibe un ID >= 1000 para que su catálogo empiece vacío y sea 100% propio
      const customFromLocal = savedLocalArtisans.filter(
        (a) => !initialSlugs.has(a.slug)
      );
      const localSlugs = new Set([
        ...initialSlugs,
        ...customFromLocal.map((a) => a.slug),
      ]);

      const customFromDb: Artisan[] = (artRes.data || [])
        .filter((a) => !localSlugs.has(a.slug))
        .map((a) => ({
          ...a,
          id: a.id < 1000 ? a.id + 1000 : a.id,
        }));

      const finalArtisans = [...mergedInitial, ...customFromLocal, ...customFromDb];
      setArtisans(finalArtisans);
      try {
        localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(finalArtisans));
      } catch {}
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

    const avatarUrl = input.production_photos[0] || '';

    const payload = {
      slug,
      full_name: input.full_name,
      brand_name: input.brand_name || `Artesanales ${input.full_name}`,
      dni: input.dni,
      phone: input.phone,
      instagram: input.instagram,
      address: input.locality || 'Corrientes Capital',
      locality: input.locality || 'Corrientes Capital',
      experience_years: input.experience_years || '5 años',
      materials_text: input.materials_text,
      material_id: input.material_id || 1,
      techniques: input.techniques || 'Elaboración artesanal',
      short_bio: `¡Hola! Soy ${input.full_name.split(' ')[0]}, llevo ${
        input.experience_years || '5 años'
      } dedicándome a la artesanía, trabajando con ${input.materials_text}.`,
      history_text: `Mi acercamiento a la artesanía comenzó hace ${
        input.experience_years || 'varios años'
      }, trabajando con ${input.materials_text} mediante técnicas de ${
        input.techniques || 'elaboración tradicional correntina'
      }.`,
      avatar_url: avatarUrl,
      story_image_url: '',
      production_photos: input.production_photos,
      status: 'approved',
    };

    const { data, error } = await supabase
      .from('artisans')
      .insert({
        ...payload,
        avatar_url: avatarUrl || '/assets/artisans/ariel-morales.jpg',
      })
      .select('*')
      .single();

    if (error) {
      console.warn('Supabase artisan insert warning:', error.message);
    }

    // Asignamos un ID único >= 1000 para que su catálogo empiece limpio sin productos de otros artesanos
    const uniqueArtisanId =
      data && data.id ? (data.id < 1000 ? data.id + 1000 : data.id) : Date.now();

    const created: Artisan = {
      id: uniqueArtisanId,
      ...payload,
    };

    setArtisans((prev) => {
      const next = [...prev, created];
      try {
        localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    setActiveArtisanId(created.id);
    setUserRole('artesano');
    return created;
  };

  const updateArtisanProfile = async (
    artisanId: number,
    updates: Partial<Artisan>
  ) => {
    const target = artisans.find((a) => a.id === artisanId);
    if (target?.slug) {
      const { error } = await supabase
        .from('artisans')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('slug', target.slug);

      if (error) {
        console.warn('Supabase artisan update warning:', error.message);
      }
    }

    setArtisans((prev) => {
      const next = prev.map((a) => (a.id === artisanId ? { ...a, ...updates } : a));
      try {
        localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
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
      gallery_urls: (input.gallery_urls || [])
        .map((u) => u.trim())
        .filter(Boolean)
        .slice(0, 3),
      is_featured: input.is_featured,
    };

    if (input.id) {
      const existing = products.find((p) => p.id === input.id);
      if (existing && existing.artisan_id !== artisanId) {
        throw new Error('Solo podés editar productos de tu propio catálogo.');
      }

      const updatedProduct: Product = {
        ...(existing || { id: input.id }),
        ...rowPayload,
        artisan_id: artisanId,
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
          gallery_urls: updatedProduct.gallery_urls,
        })
        .eq('slug', updatedProduct.slug);

      setProducts((prev) => {
        const next = prev.map((p) => (p.id === input.id ? updatedProduct : p));
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      return updatedProduct;
    } else {
      const dbArtisanId = artisanId >= 1000 ? 1 : artisanId;
      await supabase
        .from('products')
        .insert({ ...rowPayload, artisan_id: dbArtisanId });

      const created: Product = {
        id: Date.now(),
        ...rowPayload,
        artisan_id: artisanId,
      };
      setProducts((prev) => {
        const next = [created, ...prev];
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      return created;
    }
  };

  const deletePiece = async (productId: number) => {
    const target = products.find((p) => p.id === productId);
    if (target && target.artisan_id !== activeArtisanId) {
      throw new Error('Solo podés eliminar productos de tu propio catálogo.');
    }
    if (target) {
      await supabase.from('products').delete().eq('slug', target.slug);
    }
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
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
      product_id: target?.id,
      artisan_id: target?.artisan_id,
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
      setProducts((prev) => {
        const next = prev.map((p) =>
          p.id === productId ? { ...p, stock: dbStock } : p
        );
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      return { order_id: Number(data.order_id), new_stock: dbStock };
    }

    if (target) {
      await supabase
        .from('products')
        .update({ stock: nextStock })
        .eq('slug', target.slug);
    }

    setProducts((prev) => {
      const next = prev.map((p) =>
        p.id === productId ? { ...p, stock: nextStock } : p
      );
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
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
