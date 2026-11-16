import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* PASO 1 DE COMPRA: FORMA DE ENTREGA (sitio web 2.pdf pág. 7) */
export const DeliveryCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, selectedDeliveryMethod, setSelectedDeliveryMethod } = useApp();

  const product = useMemo(() => {
    return (
      products.find((p) => p.slug === slug) ||
      products.find((p) => p.slug === 'bombilla-corazon') ||
      products[0]
    );
  }, [products, slug]);

  return (
    <div className="bg-kraft-texture min-h-[78vh] py-14 md:py-20 px-6 md:px-16 flex items-center">
      <div className="max-w-[960px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Columna izquierda: Forma de entrega */}
        <div className="md:col-span-6 bg-[#D6BFA6]/85 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h1 className="font-display-serif text-3xl md:text-[34px] font-bold text-[#3D120A] mb-7">
              Forma de entrega
            </h1>

            {/* Píldora segmentada de 3 opciones */}
            <div className="bg-[#DFCCB6] rounded-full p-1 grid grid-cols-3 items-center text-center shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedDeliveryMethod('envio')}
                className={`py-2.5 px-3 rounded-full text-base md:text-lg transition-all ${
                  selectedDeliveryMethod === 'envio'
                    ? 'bg-[#E9DAC6] font-semibold text-[#2E1008] shadow'
                    : 'text-[#3D120A]/80 hover:text-[#2E1008]'
                }`}
              >
                Envío
              </button>

              <button
                type="button"
                onClick={() => setSelectedDeliveryMethod('retiro_mat')}
                className={`py-1.5 px-3 rounded-full text-base md:text-lg leading-tight transition-all ${
                  selectedDeliveryMethod === 'retiro_mat'
                    ? 'bg-[#E9DAC6] font-semibold text-[#2E1008] shadow'
                    : 'text-[#3D120A]/80 hover:text-[#2E1008]'
                }`}
              >
                Retiro a
                <br />
                800 mts
              </button>

              <button
                type="button"
                onClick={() => setSelectedDeliveryMethod('acordar_retiro')}
                className={`py-1.5 px-3 rounded-full text-base md:text-lg leading-tight transition-all ${
                  selectedDeliveryMethod === 'acordar_retiro'
                    ? 'bg-[#E9DAC6] font-semibold text-[#2E1008] shadow'
                    : 'text-[#3D120A]/80 hover:text-[#2E1008]'
                }`}
              >
                Acordar
                <br />
                Retiro
              </button>
            </div>

            {/* Descripción dinámica según el método elegido */}
            <div className="mt-8 text-sm md:text-[15.5px] text-[#2E1008] leading-relaxed">
              {selectedDeliveryMethod === 'retiro_mat' && (
                <p>
                  Centro de Retiro: Museo de Artesanías Tradicionales, Fray José de la
                  Quintana 905 a 800 mts
                </p>
              )}
              {selectedDeliveryMethod === 'envio' && (
                <p>
                  Envío a domicilio dentro de Corrientes Capital y todo el país mediante
                  correo con seguimiento.
                </p>
              )}
              {selectedDeliveryMethod === 'acordar_retiro' && (
                <p>
                  Acordás el retiro directamente con el taller del artesano o en el stand de
                  Feria Ita Berá.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha: Resumen de compra */}
        <div className="md:col-span-5 bg-[#D6BFA6]/85 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-display-serif text-3xl md:text-[32px] font-bold text-[#3D120A] mb-6">
              Resumen de compra
            </h2>

            <div className="flex items-start gap-5">
              <div className="w-24 h-28 bg-black p-2 flex items-center justify-center shrink-0">
                <img
                  src={product.main_image_url}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-2 text-[#2E1008]">
                <h3 className="text-lg md:text-xl font-medium">{product.name}</h3>
                <p className="text-base md:text-lg">{product.subtitle || 'de Plata'}</p>
                <p className="text-lg md:text-xl pt-1">
                  Total: ${(product.price || 12000).toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate(`/checkout/pago/${product.slug}`)}
              className="btn-artesanal-dark w-full py-2.5 px-6 text-lg md:text-xl"
            >
              Añadir método de pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* PASO 2 DE COMPRA: FORMA DE PAGO (segunda parte de la web .pdf pág. 3) */
export const PaymentCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    products,
    selectedDeliveryMethod,
    currentBuyerName,
    completePurchase,
  } = useApp();

  const product = useMemo(() => {
    return (
      products.find((p) => p.slug === slug) ||
      products.find((p) => p.slug === 'bombilla-corazon') ||
      products[0]
    );
  }, [products, slug]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState(currentBuyerName || '');
  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{
    order_id: number;
    new_stock: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim() || !holderName.trim()) {
      setErrorMsg('Por favor completá todos los datos de la tarjeta.');
      return;
    }

    setSubmitting(true);
    try {
      const last4 = cardNumber.replace(/\D/g, '').slice(-4) || '4242';
      const res = await completePurchase(
        product.id,
        holderName.trim(),
        selectedDeliveryMethod,
        last4
      );
      setOrderCompleted(res);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Ocurrió un error al procesar el pago.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderCompleted) {
    return (
      <div className="bg-kraft-texture min-h-[75vh] py-16 px-6 flex items-center justify-center">
        <div className="bg-[#D6BFA6] rounded-2xl p-10 max-w-lg w-full shadow-lg text-center space-y-5">
          <CheckCircle2 className="w-16 h-16 text-[#741712] mx-auto" />
          <h1 className="font-display-serif text-3xl md:text-4xl font-bold text-[#4A170E]">
            ¡Compra confirmada!
          </h1>
          <p className="text-base text-[#33130C]">
            Tu pedido de <strong>{product.name}</strong> fue registrado en Supabase (Orden #
            {orderCompleted.order_id}). El stock de la pieza se actualizó automáticamente a{' '}
            <strong>{orderCompleted.new_stock}</strong> unidades disponibles.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to={`/producto/${product.slug}`}
              className="btn-artesanal px-6 py-2 text-base"
            >
              Ver ficha actualizada
            </Link>
            <Link to="/catalogo" className="btn-artesanal-dark px-6 py-2 text-base">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-kraft-texture min-h-[78vh] py-14 md:py-20 px-6 md:px-16 flex items-center">
      <form
        onSubmit={handlePay}
        className="max-w-[960px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
      >
        {/* Columna izquierda: Forma de Pago */}
        <div className="md:col-span-6 bg-[#D6BFA6]/85 rounded-2xl p-8 md:p-10 shadow-sm space-y-5">
          <h1 className="font-display-serif text-3xl md:text-[34px] font-bold text-[#4A170E] mb-2">
            Forma de Pago
          </h1>

          <div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Número de tarjeta"
              className="w-full bg-[#DF9F57] text-[#2B0F08] placeholder-[#2B0F08] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#741712]"
            />
          </div>

          <div>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/AA"
              className="w-full bg-[#DF9F57] text-[#2B0F08] placeholder-[#2B0F08] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#741712]"
            />
          </div>

          <div>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              className="w-full bg-[#DF9F57] text-[#2B0F08] placeholder-[#2B0F08] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#741712]"
            />
          </div>

          <div>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Nombre del titular"
              className="w-full bg-[#DF9F57] text-[#2B0F08] placeholder-[#2B0F08] px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#741712]"
            />
          </div>

          {errorMsg && (
            <p className="text-sm font-semibold text-[#741712] pt-1">{errorMsg}</p>
          )}
        </div>

        {/* Columna derecha: Resumen de compra + Pagar y finalizar */}
        <div className="md:col-span-5 bg-[#D6BFA6]/85 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-display-serif text-3xl md:text-[32px] font-bold text-[#4A170E] mb-6">
              Resumen de compra
            </h2>

            <div className="flex items-start gap-5">
              <div className="w-24 h-28 bg-black p-2 flex items-center justify-center shrink-0">
                <img
                  src={product.main_image_url}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-2 text-[#2E1008]">
                <h3 className="text-lg md:text-xl font-medium">{product.name}</h3>
                <p className="text-base md:text-lg">{product.subtitle || 'de Plata'}</p>
                <p className="text-lg md:text-xl pt-1">
                  Total: ${(product.price || 12000).toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-artesanal-dark w-full py-2.5 px-6 text-lg md:text-xl disabled:opacity-60"
            >
              {submitting ? 'Procesando...' : 'Pagar y finalizar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

