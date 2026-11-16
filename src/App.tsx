import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
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
} from './pages/AccountAndRegistrationPages';
import { ArtisanDashboardPage } from './pages/ArtisanDashboardPage';
import { CoursePage } from './pages/CoursePage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-kraft-texture">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/artesanos" element={<ArtisansPage />} />
              <Route path="/artesano/:slug" element={<ArtisanProfilePage />} />
              <Route path="/puntos-fisicos" element={<PhysicalPointsPage />} />
              <Route path="/producto/:slug" element={<ProductDetailPage />} />
              <Route path="/checkout/entrega/:slug" element={<DeliveryCheckoutPage />} />
              <Route path="/checkout/pago/:slug" element={<PaymentCheckoutPage />} />
              <Route path="/crear-cuenta" element={<CreateAccountPage />} />
              <Route path="/registro-artesano" element={<ArtisanRegistrationPage />} />
              <Route path="/gracias-registro" element={<RegistrationThanksPage />} />
              <Route path="/mi-perfil-artesano" element={<ArtisanDashboardPage />} />
              <Route path="/curso" element={<CoursePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

