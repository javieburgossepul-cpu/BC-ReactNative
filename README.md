# Proyecto Semana 01 — App de Obras de Arte con Core Components y Flexbox

## Descripción

En esta semana se construyó una aplicación móvil con los componentes fundamentales de **React Native** y maquetación con **Flexbox**. La aplicación muestra el catálogo del museo con las obras de arte más representativas en un diseño atractivo, modular y adaptable.

El proyecto fue realizado utilizando React Native, Expo, TypeScript y pnpm.

---

## Mi dominio

El dominio escogido para este proyecto es **Museo de Arte**.

Cada obra tiene información como:

* Nombre de la obra.
* Artista / Pintor.
* Año en que fue creada.
* Sala donde se encuentra exhibida.
* Imagen de la obra.

Las obras incluidas son:

* **La Mona Lisa** (Leonardo da Vinci, 1503)
* **La noche estrellada** (Vincent van Gogh, 1889)
* **El grito** (Edvard Munch, 1893)
* **Las meninas** (Diego Velázquez, 1656)

---

## Pantalla principal (HomeScreen)

La pantalla principal cuenta con:

* **Encabezado**: Muestra el nombre del museo y el contador de obras disponibles.
* **Catálogo interactivo**: Listado de tarjetas de obras con scroll vertical.
* **Tarjetas personalizadas (`ItemCard`)**: Muestran la imagen de la obra, título, autor, año, sala y un botón interactivo de favorito.

---

## Diseño

Para el diseño mantuve un estilo oscuro elegante, utilizando diferentes tonos para el fondo, las tarjetas y los textos.

Se utilizó el sistema de layout **Flexbox** de React Native para alinear y distribuir armónicamente todos los elementos visuales en pantalla en filas y columnas.

---

## 📂 Estructura de proyecto

```text
├── 0-assets/
│   ├── LANOCHE.webp
│   ├── LASMENINAS.jpg
│   ├── MONA.jpg
│   └── elgriton.jpg
│
├── src/
│   ├── components/
│   │   └── ItemCard.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── screens/
│   │   └── HomeScreen.tsx
│   │
│   └── types/
│       └── index.ts
│
├── app.json
├── App.tsx
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

Cada archivo tiene una función clara. Los datos de las obras están en `mockData.ts`, el componente de la tarjeta en `ItemCard.tsx` y la pantalla principal en `HomeScreen.tsx`.

---

## ⚙️ Cómo ejecutar el proyecto

Primero se instalan las dependencias:

```bash
pnpm install
```

Para abrirlo en el navegador web:

```bash
pnpm run web
```

Después se inicia la aplicación con Expo:

```bash
pnpm start
```

Y luego se escanea el código QR desde el celular con la aplicación **Expo Go**.

---

## ✅ Entregables realizados

* Creación de proyecto Expo con TypeScript.
* Uso de Core Components: `View`, `Text`, `Image`, `ScrollView` y `Pressable`.
* Maquetación responsiva utilizando Flexbox.
* Componente modular reutilizable `ItemCard`.
* Catálogo de 4 obras maestras del museo con imágenes locales.
* Botón interactivo de estrella para favoritos.
* Diseño consistente en modo oscuro.

Proyecto realizado para la **Semana 01 — React Native**.
