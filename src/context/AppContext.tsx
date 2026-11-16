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

export interface NewProductDraft {
  name: string;
  dimensions: string;
  price: number;
  stock: number;
  work_hours: string;
  material_label: string;
  material_id: number;
  technique: string;
  short_description: string;
  category_type: 'utilitario' | 'decorativo';
  piece_type: 'fija' | 'variable';
  image_url: string;
}

interface AppContextValue {
  materials: Material[];
  artisans: Artisan[];
  catalogs: Catalog[];
  products: Product[];
  loading: boolean;
  activeArtisanId: number;
  setActiveArtisanId: (id: number) => void;
  selectedDeliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro';
  setSelectedDeliveryMethod: (m: 'envio' | 'retiro_mat' | 'acordar_retiro') => void;
  currentBuyerName: string | null;
  refreshData: () => Promise<void>;
  registerBuyer: (input: BuyerAccountInput) => Promise<void>;
  registerArtisan: (input: ArtisanRegistrationInput) => Promise<Artisan>;
  updateArtisanProfile: (artisanId: number, updates: Partial<Artisan>) => Promise<void>;
  publishCatalogProducts: (
    artisanId: number,
    catalogTitle: string,
    drafts: NewProductDraft[]
  ) => Promise<void>;
  completePurchase: (
    productId: number,
    buyerName: string,
    deliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro',
    cardLast4: string
  ) => Promise<{ order_id: number; new_stock: number }>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [artisans, setArtisans] = useState<Artisan[]>(INITIAL_ARTISANS);
  const [catalogs, setCatalogs] = useState<Catalog[]>(INITIAL_CATALOGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeArtisanId, setActiveArtisanId] = useState<number>(1);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    'envio' | 'retiro_mat' | 'acordar_retiro'
  >('retiro_mat');
  const [currentBuyerName, setCurrentBuyerName] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      const [matRes, artRes, catRes, prodRes] = await Promise.all([
        supabase.from('materials').select('*').order('id', { ascending: true }),
        supabase.from('artisans').select('*').order('id', { ascending: true }),
        supabase.from('catalogs').select('*').order('id', { ascending: true }),
        supabase.from('products').select('*').order('id', { ascending: true }),
      ]);

      if (matRes.data && matRes.data.length > 0) setMaterials(matRes.data);
      if (artRes.data && artRes.data.length > 0) setArtisans(artRes.data);
      if (catRes.data && catRes.data.length > 0) setCatalogs(catRes.data);
      if (prodRes.data && prodRes.data.length > 0) setProducts(prodRes.data);
    } catch (err) {
      console.warn('Using local fallback data:', err);
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
    setCurrentBuyerName(input.full_name);
  };

  const registerArtisan = async (input: ArtisanRegistrationInput): Promise<Artisan> => {
    const slug = `${(input.brand_name || input.full_name)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;

    const avatarUrl =
      input.production_photos[0] || '/assets/artisans/silvia-balbuena.jpg';

    const payload = {
      slug,
      full_name: input.full_name,
      brand_name: input.brand_name || `Artesanales ${input.full_name}`,
      dni: input.dni,
      phone: input.phone,
      instagram: input.instagram,
      address: input.locality || 'Corrientes Capital',
      locality: input.locality || 'Corrientes Capital',
      experience_years: input.experience_years || '10 años',
      materials_text: input.materials_text,
      material_id: input.material_id || 4,
      techniques: input.techniques || 'Cincelado y trabajo manual',
      short_bio: `Hola! soy ${input.full_name.split(' ')[0]}, ya llevo ${
        input.experience_years || 'varios años'
      } siendo artesano trabajando con ${input.materials_text}`,
      history_text: `Mi acercamiento a la artesanía comenzó hace ${
        input.experience_years || 'más de diez años'
      }, trabajando con ${input.materials_text} mediante técnicas de ${
        input.techniques || 'elaboración tradicional correntina'
      }.`,
      avatar_url: avatarUrl,
      story_image_url: '/assets/artisans/silvia-historia-taller.jpg',
      production_photos:
        input.production_photos.length > 0
          ? input.production_photos
          : ['/assets/products/bombilla-corazon.png'],
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

  const publishCatalogProducts = async (
    artisanId: number,
    catalogTitle: string,
    drafts: NewProductDraft[]
  ) => {
    const sectionName = catalogTitle.trim() || 'Accesorios';
    let catalogId: number | null = null;

    const { data: catData } = await supabase
      .from('catalogs')
      .insert({ artisan_id: artisanId, title: sectionName })
      .select('*')
      .single();

    if (catData) {
      catalogId = catData.id;
      setCatalogs((prev) => [...prev, catData]);
    }

    const rowsToInsert = drafts.map((d, idx) => ({
      slug: `${d.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')}-${Date.now()}-${idx}`,
      artisan_id: artisanId,
      catalog_id: catalogId,
      material_id: d.material_id || 4,
      name: d.name,
      subtitle: `de ${d.material_label || 'Plata'}`,
      category_type: d.category_type || 'utilitario',
      piece_section: sectionName,
      piece_type: d.piece_type || 'fija',
      dimensions: d.dimensions || '20 cm',
      weight: '120 g',
      work_hours: d.work_hours || '10 horas',
      material_label: d.material_label || 'Plata',
      technique: d.technique || 'Cincelado',
      short_description:
        d.short_description ||
        `Pieza artesanal elaborada cuidadosamente a mano mediante técnica de ${
          d.technique || 'cincelado tradicional'
        }.`,
      stock: d.stock ?? 2,
      price: d.price ?? 15000,
      main_image_url: d.image_url || '/assets/products/bombilla-corazon.png',
      gallery_urls: [
        d.image_url || '/assets/products/bombilla-corazon.png',
        '/assets/products/bombilla-detail-1.jpg',
        '/assets/products/bombilla-detail-2.jpg',
      ],
      is_featured: true,
    }));

    const { data: insertedProducts, error } = await supabase
      .from('products')
      .insert(rowsToInsert)
      .select('*');

    if (error) {
      console.warn('Supabase products insert warning:', error.message);
      const localProducts: Product[] = rowsToInsert.map((r, i) => ({
        id: Date.now() + i,
        ...r,
      }));
      setProducts((prev) => [...localProducts, ...prev]);
    } else if (insertedProducts) {
      setProducts((prev) => [...insertedProducts, ...prev]);
    }
  };

  const completePurchase = async (
    productId: number,
    buyerName: string,
    deliveryMethod: 'envio' | 'retiro_mat' | 'acordar_retiro',
    cardLast4: string
  ) => {
    const { data, error } = await supabase.rpc('complete_purchase', {
      p_product_id: productId,
      p_buyer_name: buyerName,
      p_delivery_method: deliveryMethod,
      p_card_last4: cardLast4,
      p_quantity: 1,
    });

    if (!error && data) {
      const newStock = Number(data.new_stock);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
      );
      return { order_id: Number(data.order_id), new_stock: newStock };
    }

    // Fallback direct update if RPC fails
    const target = products.find((p) => p.id === productId);
    const nextStock = Math.max(0, (target?.stock ?? 1) - 1);
    await supabase
      .from('products')
      .update({ stock: nextStock })
      .eq('id', productId);

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
        activeArtisanId,
        setActiveArtisanId,
        selectedDeliveryMethod,
        setSelectedDeliveryMethod,
        currentBuyerName,
        refreshData,
        registerBuyer,
        registerArtisan,
        updateArtisanProfile,
        publishCatalogProducts,
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

