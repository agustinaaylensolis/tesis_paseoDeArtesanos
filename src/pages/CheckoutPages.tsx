import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* COMPONENTE DE CONFIRMACIÓN: ¡GRACIAS POR TU COMPRA! (Parte de la web Andrés pág. 8) */
const PurchaseThanksCard: React.FC<{ productName: string }> = ({ productName }) => (
  <div
    className="bg-kraft-texture min-h-[75vh] py-16 px-4 sm:px-6 flex items-center justify-center"
    style={{ fontFamily: '"sitka-text", Georgia, serif' }}
  >
    <div className="bg-[#D8C5AE]/65 rounded-2xl px-8 sm:px-14 py-10 sm:py-12 max-w-[500px] w-full space-y-7">
      <h1
        className="font-display-serif text-3xl md:text-[36px] font-normal text-[#5C2014] text-center"
        style={{ fontFamily: '"broadsheet", Georgia, serif' }}
      >
        ¡Gracias por tu compra!
      </h1>

      <div className="space-y-5 text-base md:text-[17.5px] text-[#23110B] leading-relaxed px-1 sm:px-2">
        <p>
          Tu {productName.toLowerCase()} te está esperando en el mercado del Museo de
          artesanías tradicionales
        </p>
        <p>Podés retirarlo de 9:00 a 20:00 hs</p>
        <p>
          Con tu compra ayudas a sostener
          <br />
          la tradición correntina
        </p>
      </div>

      <div className="pt-4 flex justify-center">
        <Link
          to="/"
          className="btn-ui-marron text-[#E5C9A3] px-14 py-2 text-base md:text-lg shadow-lg"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  </div>
);

/* PASO 1 DE COMPRA: FORMA DE ENTREGA (Parte de la web Andrés pág. 5) */
export const DeliveryCheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    products,
    selectedDeliveryMethod,
    setSelectedDeliveryMethod,
    currentBuyerName,
    completePurchase,
  } = useApp();

  const [cashDone, setCashDone] = useState(false);
  const [processingCash, setProcessingCash] = useState(false);

  const product = useMemo(() => {
    return (
      products.find((p) => p.slug === slug) ||
      products.find((p) => p.slug === 'billetera-cincelada') ||
      products[0]
    );
  }, [products, slug]);

  const handleCashPayment = async () => {
    setProcessingCash(true);
    try {
      await completePurchase(
        product.id,
        currentBuyerName || 'Andrés Navarro',
        selectedDeliveryMethod,
        'EFEC'
      );
      setCashDone(true);
    } finally {
      setProcessingCash(false);
    }
  };

  if (cashDone) {
    return <PurchaseThanksCard productName={product.name} />;
  }

  return (
    <div className="bg-kraft-texture min-h-[78vh] py-14 md:py-20 px-4 sm:px-6 md:px-16 flex items-center">
      <div className="max-w-[960px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Columna izquierda: Forma de entrega */}
        <div className="md:col-span-6 bg-[#D6BFA6]/85 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h1 className="font-display-serif text-3xl md:text-[34px] font-normal text-[#2E1008] mb-7">
              Forma de entrega
            </h1>

            {/* Píldora segmentada (Retiro a 800 mts | Acordar Retiro) tal como en Parte de la web Andrés pág. 5 */}
            <div className="bg-[#DFCCB6] rounded-full p-1 grid grid-cols-2 max-w-[340px] items-center text-center shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedDeliveryMethod('retiro_mat')}
                className={`py-2 px-4 rounded-full text-base md:text-lg leading-tight transition-all ${selectedDeliveryMethod === 'retiro_mat'
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
                className={`py-2 px-4 rounded-full text-base md:text-lg leading-tight transition-all ${selectedDeliveryMethod === 'acordar_retiro'
                  ? 'bg-[#E9DAC6] font-semibold text-[#2E1008] shadow'
                  : 'text-[#3D120A]/80 hover:text-[#2E1008]'
                  }`}
              >
                Acordar
                <br />
                Retiro
              </button>
            </div>

            <div className="mt-8 text-sm md:text-[15.5px] text-[#2E1008] leading-relaxed">
              {selectedDeliveryMethod === 'acordar_retiro' ? (
                <p>
                  Acordás el punto de retiro directamente con el artesano por su taller o
                  en la Feria Ita Berá.
                </p>
              ) : (
                <p>
                  Centro de Retiro: Museo de Artesanías Tradicionales, Fray José de la
                  Quintana 905 a 800 mts
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha: Resumen de compra + Transferir / Pagar en efectivo */}
        <div className="md:col-span-5 bg-[#D6BFA6]/85 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-display-serif text-3xl md:text-[32px] font-normal text-[#2E1008] mb-6">
              Resumen de compra
            </h2>

            <div className="flex items-start gap-5">
              <div className="w-24 h-28 bg-black overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={product.main_image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-[#2E1008]">
                <h3 className="text-lg md:text-xl font-medium">{product.name}</h3>
                <p className="text-base md:text-lg">{product.subtitle || 'de Cuero'}</p>
                <p className="text-lg md:text-xl pt-1">
                  Total: ${(product.price || 15000).toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/checkout/pago/${product.slug}`)}
              className="btn-ui-marron w-56 py-2 px-6 text-base md:text-lg"
            >
              Transferir
            </button>
            <button
              type="button"
              onClick={handleCashPayment}
              disabled={processingCash}
              className="btn-ui-marron w-56 py-2 px-6 text-base md:text-lg"
            >
              {processingCash ? 'Registrando...' : 'Pagar en efectivo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* PASO 2 DE COMPRA: FORMA DE PAGO (Parte de la web Andrés pág. 6 y pág. 8) */
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
      products.find((p) => p.slug === 'billetera-cincelada') ||
      products[0]
    );
  }, [products, slug]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState(currentBuyerName || '');
  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
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
      await completePurchase(
        product.id,
        holderName.trim(),
        selectedDeliveryMethod,
        last4
      );
      setOrderCompleted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Ocurrió un error al procesar el pago.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderCompleted) {
    return <PurchaseThanksCard productName={product.name} />;
  }

  return (
    <div
      className="bg-kraft-texture min-h-[78vh] py-14 md:py-20 px-4 sm:px-6 md:px-16 flex items-center"
      style={{ fontFamily: '"sitka-text", Georgia, serif' }}
    >
      <form
        onSubmit={handlePay}
        className="max-w-[960px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
      >
        {/* Columna izquierda: Forma de Pago */}
        <div className="md:col-span-7 bg-[#D8C5AE]/65 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm space-y-5">
          <h1
            className="font-display-serif text-3xl md:text-[34px] font-normal text-[#5C2014] mb-2"
            style={{ fontFamily: '"broadsheet", Georgia, serif' }}
          >
            Forma de Pago
          </h1>

          <div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Número de tarjeta"
              className="w-full bg-[#DF953A] text-[#2B0F08] placeholder-[#2B0F08]/90 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#732714]"
            />
          </div>

          <div>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/AA"
              className="w-full bg-[#DF953A] text-[#2B0F08] placeholder-[#2B0F08]/90 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#732714]"
            />
          </div>

          <div>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              className="w-full bg-[#DF953A] text-[#2B0F08] placeholder-[#2B0F08]/90 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#732714]"
            />
          </div>

          <div>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Nombre del titular"
              className="w-full bg-[#DF953A] text-[#2B0F08] placeholder-[#2B0F08]/90 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#732714]"
            />
          </div>

          {errorMsg && (
            <p className="text-sm font-semibold text-[#732714] pt-1">{errorMsg}</p>
          )}

          <div className="pt-3 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-ui-marron text-[#E5C9A3] px-10 py-2 text-base md:text-lg"
            >
              {submitting ? 'Procesando...' : 'Añadir medio de pago'}
            </button>
          </div>
        </div>

        {/* Columna derecha: Resumen de compra */}
        <div className="md:col-span-5 bg-[#D8C5AE]/65 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h2
              className="font-display-serif text-3xl md:text-[32px] font-normal text-[#5C2014] mb-6"
              style={{ fontFamily: '"broadsheet", Georgia, serif' }}
            >
              Resumen de compra
            </h2>

            <div className="flex items-start gap-5">
              <div className="w-24 h-28 bg-black overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={product.main_image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-[#2B0F08]">
                <h3 className="text-lg md:text-xl font-medium">{product.name}</h3>
                <p className="text-base md:text-lg">{product.subtitle || 'de Cuero'}</p>
                <p className="text-lg md:text-xl pt-1 font-bold">
                  Total: ${(product.price || 15000).toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-ui-marron text-[#E5C9A3] w-full py-2.5 px-6 text-lg md:text-xl disabled:opacity-60"
            >
              {submitting ? 'Procesando...' : 'Pagar y finalizar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};