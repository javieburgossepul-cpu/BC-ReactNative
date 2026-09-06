# Proyecto Semana 05 — App de Obras de Arte con Networking y TanStack Query

## Descripción

En esta semana se construyó una aplicación móvil que se conecta a internet para consultar y registrar obras de arte utilizando **TanStack Query** y **Axios**. Esto permite que la galería cargue las obras de forma rápida mediante memoria caché, que el usuario pueda actualizar la lista deslizando hacia abajo (*pull-to-refresh*) y que se puedan registrar nuevas obras en el catálogo con actualización inmediata en la pantalla.

El proyecto fue realizado utilizando React Native, Expo, TypeScript, Axios, TanStack Query y pnpm.

---

## Mi dominio

El dominio escogido para este proyecto es **Museo de Arte**.

Cada obra tiene información como:

* Nombre de la obra.
* Artista / Autor.
* Año en que fue creada.
* Sala donde se encuentra.
* Técnica utilizada.
* Periodo histórico.
* Descripción histórica de la obra.

Algunas de las obras incluidas son:

* La Mona Lisa.
* La noche estrellada.
* El grito.
* Guernica.
* Las meninas.
* La persistencia de la memoria.
* El nacimiento de Venus.
* La creación de Adán.
* La joven de la perla.
* La ronda de noche.

---

## Conexión a Internet y TanStack Query

Para conectar la aplicación con la API y gestionar los datos se utilizó **Axios** y **TanStack Query**, lo que permite:

* **Consultar la lista de obras**: Descargar el catálogo de obras desde la API y guardarlo en memoria caché para que no vuelva a tardar en cargar.
* **Consultar el detalle por ID**: Obtener la ficha técnica completa y la historia detallada de cada obra.
* **Registrar nuevas obras**: Enviar nuevas obras a la colección mediante un formulario y verlas reflejadas de inmediato en la galería.
* **Actualizar deslizando (Pull-to-refresh)**: Recargar la lista de obras en cualquier momento arrastrando la pantalla hacia abajo.
* **Estados de carga y error**: Mostrar un indicador visual mientras se descargan los datos y un mensaje amigable con botón para reintentar si no hay conexión.

---

## Pantallas de la app

La aplicación cuenta con navegación mediante Stack Navigator y un formulario modal:

### 1. Pantalla Galería (Inicio - HomeScreen)
Muestra el catálogo de obras de arte en tarjetas con el nombre de la obra, el artista, el año, la sala y el periodo artístico. Cuenta con un contador dinámico de obras, opción de deslizar para actualizar y un botón `+` en la parte superior para registrar una nueva obra. Al pulsar cualquier tarjeta se navega al detalle.

### 2. Pantalla de Detalle de la Obra (DetailScreen)
Muestra toda la ficha técnica de la obra seleccionada:
* Nombre, artista y año de creación.
* Sala donde está exhibida, técnica utilizada y periodo histórico.
* Sección con la **Descripción Histórica** detallada de la obra.
* Botón interactivo para volver a la galería.

### 3. Pantalla de Registro de Obra (CreateScreen)
Un formulario modal que permite agregar una nueva obra a la colección:
* Campos para ingresar el nombre, autor, año, período, sala, técnica y descripción.
* Validación para no enviar campos vacíos.
* Botón de guardado con indicador de carga mientras se envía a la red.
* Cierre automático y actualización inmediata de la galería al guardar.

---

## Diseño

Para el diseño mantuve el estilo oscuro de las semanas anteriores, utilizando tonos oscuros para el fondo y las tarjetas.

También utilicé el color azul claro (`#61DAFB`) para resaltar nombres, botones, insignias y elementos interactivos.

Los iconos son de la librería `Ionicons`, manteniendo una interfaz moderna, limpia y consistente en dispositivos Android e iOS.

---

## 📂 Estructura de proyecto

```text
week-05-networking_tanstack_query/
│
├── 3-proyecto/
│   ├── README.md
│   │
│   └── starter/
│       ├── 0-assets/
│       │   ├── 01-tanstack-query-lifecycle.svg
│       │   └── 02-cache-stale-fresh.svg
│       │
│       ├── src/
│       │   ├── hooks/
│       │   │   └── useItems.ts
│       │   │
│       │   ├── navigation/
│       │   │   ├── RootNavigator.tsx
│       │   │   └── types.ts
│       │   │
│       │   ├── screens/
│       │   │   ├── HomeScreen.tsx
│       │   │   ├── DetailScreen.tsx
│       │   │   └── CreateScreen.tsx
│       │   │
│       │   ├── services/
│       │   │   └── api.ts
│       │   │
│       │   ├── theme/
│       │   │   └── index.ts
│       │   │
│       │   └── types/
│       │       └── index.ts
│       │
│       ├── app.json
│       ├── App.tsx
│       ├── package.json
│       └── tsconfig.json
```

Cada archivo tiene una función clara. La configuración de red y Axios está en `api.ts`, los hooks de TanStack Query para consultar y crear obras están en `useItems.ts`, la navegación en `RootNavigator.tsx` y las vistas en la carpeta `screens`.

---

## ⚙️ Cómo ejecutar el proyecto

Primero se entra a la carpeta del proyecto y se instalan las dependencias:

```bash
cd 3-proyecto/starter
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

* Configuración del cliente Axios centralizado con interceptor de errores.
* Proveedor `QueryClientProvider` configurado en la raíz de la aplicación.
* Hook `useItems()` con `useQuery` para consultar la lista de obras desde la API.
* Hook `useItemById()` con `useQuery` para consultar el detalle de una obra por ID.
* Hook `useCreateItem()` con `useMutation` para registrar nuevas obras en el catálogo.
* Actualización automática e invalidación de caché (`invalidateQueries`).
* Pull-to-refresh en la lista principal para recargar datos con `refetch`.
* Manejo de estados de carga (`ActivityIndicator`), error con botón de reintento y estado vacío.
* Descripciones históricas completas integradas en las 10 obras de arte.
* Pantallas `HomeScreen`, `DetailScreen` y modal `CreateScreen` navegables.
* Diseño en modo oscuro consistente con las semanas anteriores.
* Proyecto realizado con TypeScript sin errores de tipado.

Proyecto realizado para la **Semana 05 — React Native**.
