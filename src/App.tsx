import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header, Footer } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ArtisansPage } from './pages/ArtisansPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { PhysicalPointsPage } from './pages/PhysicalPointsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DeliveryCheckoutPage, PaymentCheckoutPage } from './pages/CheckoutPages';
import {
  CreateAccountPage,
  ArtisanRegistrationPage,
  RegistrationThanksPage,
  AboutPage,
} from './pages/AccountAndRegistrationPages';
import { ArtisanDashboardPage } from './pages/ArtisanDashboardPage';
import { ClientProfilePage } from './pages/ClientProfilePage';
import { CoursePage } from './pages/CoursePage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* Guardia de ruta exclusiva para Artesanos (CRUD de catálogo y Curso de Optimizar tu vidriera digital) */
const ArtisanOnlyRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { userRole } = useApp();
  if (userRole === 'cliente') {
    return <Navigate to="/mi-perfil" replace />;
  }
  if (userRole === 'guest') {
    return <Navigate to="/registro-artesano" replace />;
  }
  return children;
};

/* Guardia de ruta para el perfil del Cliente ("Los productos que compraste" + "Productos favoritos") */
const ClientProfileRoute: React.FC = () => {
  const { userRole } = useApp();
  if (userRole === 'artesano') {
    return <Navigate to="/mi-perfil-artesano" replace />;
  }
  if (userRole === 'guest') {
    return <Navigate to="/crear-cuenta" replace />;
  }
  return <ClientProfilePage />;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-kraft-texture">
          <Header />
          <main className="flex-1 [&>*]:pb-24 md:[&>*]:pb-32">
            <Routes>
              {/* Marketplace y vistas públicas accesibles para ambos roles */}
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/artesanos" element={<ArtisansPage />} />
              <Route path="/artesano/:slug" element={<ArtisanProfilePage />} />
              <Route path="/puntos-fisicos" element={<PhysicalPointsPage />} />
              <Route path="/producto/:slug" element={<ProductDetailPage />} />
              <Route path="/checkout/entrega/:slug" element={<DeliveryCheckoutPage />} />
              <Route path="/checkout/pago/:slug" element={<PaymentCheckoutPage />} />
              <Route path="/conocenos" element={<AboutPage />} />

              {/* Registro y Creación de Cuenta */}
              <Route path="/crear-cuenta" element={<CreateAccountPage />} />
              <Route path="/registro-artesano" element={<ArtisanRegistrationPage />} />
              <Route path="/gracias-registro" element={<RegistrationThanksPage />} />

              {/* Perfil exclusivo de Cliente ("Los productos que compraste" + "Productos favoritos") */}
              <Route path="/mi-perfil" element={<ClientProfileRoute />} />

              {/* Páginas exclusivas de Artesano (CRUD de catálogo y Curso de Comunicación) */}
              <Route
                path="/mi-perfil-artesano"
                element={
                  <ArtisanOnlyRoute>
                    <ArtisanDashboardPage />
                  </ArtisanOnlyRoute>
                }
              />
              <Route
                path="/curso"
                element={
                  <ArtisanOnlyRoute>
                    <CoursePage />
                  </ArtisanOnlyRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
