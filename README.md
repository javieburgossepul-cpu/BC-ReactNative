# Semana 01 — Core Components y Flexbox

**Dominio asignado: Museo**

## ¿Qué se aprendi esta semana?

- Crear un proyecto en Expo y correrlo en el celular con la app Expo Go
- Usar los componentes básicos de React Native: vistas, textos, imágenes, listas con scroll y botones
- Acomodar los elementos en pantalla usando Flexbox (filas, columnas, alineación)
- Darle estilo a la app manteniendo un tema de color consistente
- Entender en qué se diferencia React Native de React para páginas web

## Estructura de la carpeta

```
week-01-core_components_y_flexbox/
├── 1-teoria/        # Lecturas de la semana
├── 2-practicas/     # Ejercicios guiados
└── 3-proyecto/      # App final: Museo
```

## El proyecto: Museo 

Es una app de una sola pantalla que muestra una colección de obras de arte, como si fuera un catálogo del museo.

**Qué hace la app:**

- Muestra un encabezado con el nombre del museo y cuántas obras hay
- Lista 4 obras famosas (La Gioconda, La noche estrellada, El grito, Las meninas), cada una con su imagen, nombre, artista, año y sala donde está exhibida
- Cada obra tiene un botón de estrella para marcarla como favorita
- Se puede tocar cada tarjeta y hacer scroll para ver todas

**Cómo está armada por dentro:**

- Los datos de las obras están separados del diseño, para que sea fácil agregar o cambiar obras
- La tarjeta de cada obra es un componente que se reutiliza 4 veces
- Los estilos están organizados aparte del código, no mezclados en el mismo lugar

## Cómo correr la app

```bash
cd 3-proyecto/starter
pnpm install
pnpm start
```

Y luego escanear el código QR con la app Expo Go desde el celular.

## Notas

- Las fotos de las obras están guardadas dentro del proyecto (carpeta `0-assets/`), las descargue y las guarde en el proyecto.
