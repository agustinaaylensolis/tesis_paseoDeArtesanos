# Corriente Artesanal

Plataforma web y vidriera digital para artesanos tradicionales de la provincia de Corrientes, desarrollada en articulación con el **Museo de Artesanías Tradicionales (MAT)** y el **Instituto de Cultura de Corrientes**.

El proyecto busca fortalecer la presencia digital de los artesanos tradicionales, comunicar el valor cultural detrás de cada pieza hecha a mano y facilitar el encuentro entre los creadores y el público.

---

## Funcionalidades principales

- **Inicio (`/`)**: presentación institucional del proyecto, acceso rápido a artesanos, catálogo por categoría (*Utilitarias* / *Decorativas*) y materiales tradicionales, y acceso a registro de artesanos.
- **Catálogo de Artesanías (`/catalogo`)**:
  - Filtrado por tipo (*Utilitario* / *Decorativo*), **Diseños Exclusivos** (identificados con estrella y tarjeta destacada), búsqueda por texto y línea de tiempo de los **7 materiales tradicionales** (*Cuero o suela, Lana y algodón, Fibra Vegetal, Plata y minerales, Madera, Asta y Arcilla*).
  - Sistema de favoritos persistente.
- **Ficha de Producto (`/producto/:slug`)**:
  - Detalles técnicos (medidas, horas de trabajo, material, técnica, stock y precio o consultable).
  - Galería principal + 3 miniaturas de detalle (muestra fotos reales de `gallery_urls` o acercamientos CSS sobre la imagen principal).
  - Acceso directo al perfil del artesano y productos relacionados.
- **Flujo de Compra (`/checkout/entrega/:slug` y `/checkout/pago/:slug`)**:
  - Selección de modalidad de retiro (Museo de Artesanías Tradicionales o acordar con el artesano), pago en efectivo o transferencia/tarjeta, actualización de stock y registro de órdenes.
- **Artesanos Tradicionales (`/artesanos` y `/artesano/:slug`)**:
  - Directorio filtrable por material y buscador.
  - Perfil público de cada artesano con biografía, historia de oficio, contacto directo por WhatsApp y catálogo propio.
- **Puntos Físicos (`/puntos-fisicos`)**: información del Museo de Artesanías Tradicionales y ferias donde encontrar a los artesanos.
- **Panel de Artesano (`/mi-perfil-artesano`)**:
  - Edición de perfil, datos de contacto, foto de perfil e historia personal.
  - CRUD completo de piezas del catálogo propio (crear, editar, eliminar) con carga de foto principal y hasta 3 fotos de detalle.
  - Visualización de **Los productos que vendiste** filtrados por artesano.
- **Perfil de Cliente (`/mi-perfil`)**: edición de datos personales, historial de compras y productos favoritos.
- **Curso de Comunicación para Artesanos (`/curso`)**:
  - 4 unidades interactivas (*Presentación*, *Comunicación efectiva*, *Introducción a la fotografía* y *Optimizar tu vidriera digital*) con acceso rápido lateral y versión imprimible en PDF descargable.

---

## Stack tecnológico

- **Frontend**: React 18 + TypeScript + Vite 6
- **Estilos**: Tailwind CSS 3
- **Enrutamiento**: React Router DOM 6
- **Íconos**: Lucide React
- **Backend / Storage**: Supabase (`@supabase/supabase-js`) con fallback local en `localStorage`

---

## Instalación y ejecución local

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd tesis_paseoDeArtesanos
npm install
```

### 2. Variables de entorno (opcional)

Para conectar con Supabase, creá un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

> Si no se configuran las variables de Supabase, la aplicación funciona igualmente utilizando los datos locales iniciales (`src/data/fallbackData.ts`) y persistencia en `localStorage`.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 4. Compilar para producción

```bash
npm run build
npm run preview
```

---

## Estructura del proyecto

```text
├── public/
│   └── assets/
│       ├── artisans/     # Fotos de perfil y talleres de artesanos
│       ├── course/       # Manual PDF y recursos del curso
│       ├── places/       # Imágenes de puntos físicos
│       ├── products/     # Fotografías de piezas artesanales
│       └── ui/           # Texturas, botones, footer, logos y elementos gráficos
├── src/
│   ├── components/       # Layout (Header, Footer, BrandLogo) y componentes UI (ProductCard, MaterialTimeline)
│   ├── context/          # AppContext (estado global, roles, CRUD de piezas, compras y favoritos)
│   ├── data/             # Datos iniciales de materiales, artesanos y productos (fallbackData.ts)
│   ├── lib/              # Cliente de Supabase y utilidades de carga de medios
│   ├── pages/            # Vistas principales de la aplicación
│   ├── types/            # Tipos TypeScript del dominio
│   ├── App.tsx           # Definición de rutas y guardas de acceso por rol
│   └── index.css         # Estilos globales, texturas y clases de botones
├── package.json
└── vite.config.ts
```

---

## Licencia

Proyecto desarrollado con fines académicos y culturales para la difusión de la artesanía tradicional correntina.
