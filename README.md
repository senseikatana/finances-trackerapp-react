# Finanzas App — Control de Finanzas Personales

> **Ubicación:** `08-Lecturas/Apps/finanzas-app/`

App web progresiva (PWA) para gestionar finanzas personales. Sin login, sin backend — **todo en localStorage**.

## Funcionalidades

| Vista | Descripción |
|-------|-------------|
| **📊 Dashboard** | Panel de control con ingresos, gastos, ahorro, tasa de ahorro, suscripciones activas y progreso de metas |
| **💰 Ingresos** | Registro de ingresos (nómina, freelance, inversiones...) |
| **📋 Gastos Fijos** | Gastos mensuales recurrentes con control de pagado |
| **🛒 Gastos Variables** | Gastos del día a día con filtro necesario/capricho |
| **🔄 Suscripciones** | Gestión de suscripciones mensuales y **anuales** (Google One, Proton, Internxt...) |
| **📝 Registro Diario** | Anotación rápida de gastos con clasificación Fijo/Variable/Extraordinario |
| **🎯 Presupuesto** | Presupuesto mensual vs real con indicadores ✅⚠️❌ |
| **🏦 Metas Ahorro** | Seguimiento de objetivos de ahorro con progreso visual |
| **💳 Deudas** | Control de préstamos y pagos pendientes |

## Para suscripciones anuales

El módulo de Suscripciones soporta ciclos **mensuales** y **anuales**. Las suscripciones anuales (Proton Unlimited, Internxt Drive, etc.) se convierten automáticamente a coste mensual equivalente en el Dashboard.

## Cómo ejecutar

```bash
cd "08-Lecturas/Apps/finanzas-app"
npx vite
```

O abre directamente `dist/index.html` en tu navegador (versión compilada).

## Construir para producción

```bash
npx vite build
```

Los archivos estáticos se generan en `dist/`. Puedes subirlos a cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Estructura de datos

Todos los datos se guardan en `localStorage` bajo la clave `finanzas-app-data`. No hay servidor, no hay registro, no hay cookies.
