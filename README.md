# Corrector de texto con IA

App web para corregir ortografía y gramática en español, con soporte para texto e imágenes.

## Estructura

```
corrector-app/
├── api/
│   └── correct.js      ← Serverless function (proxy a Anthropic)
├── public/
│   └── index.html      ← Frontend completo
├── vercel.json         ← Configuración de Vercel
└── package.json
```

## Deploy en Vercel (5 minutos)

### 1. Sube el proyecto a GitHub
```bash
git init
git add .
git commit -m "corrector inicial"
git remote add origin https://github.com/TU_USUARIO/corrector-app.git
git push -u origin main
```

### 2. Conéctalo a Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **Add New → Project**
3. Selecciona el repositorio `corrector-app`
4. Haz clic en **Deploy** (los ajustes por defecto están bien)

### 3. Agrega la API key de Anthropic
1. En el dashboard de Vercel, entra a tu proyecto
2. Ve a **Settings → Environment Variables**
3. Agrega:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (tu key de [console.anthropic.com](https://console.anthropic.com))
4. Haz clic en **Save**
5. Ve a **Deployments** y haz **Redeploy** para que tome efecto

### 4. Listo
Vercel te da un link tipo `https://corrector-app-xxx.vercel.app` que puedes compartir con los chicos.

## Obtener API key de Anthropic
1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Crea una cuenta (tiene créditos gratis para empezar)
3. Ve a **API Keys → Create Key**
4. Copia la key y pégala en Vercel

## Costos aproximados
- Con uso moderado (50-100 correcciones/día): menos de $1 USD/mes
- Los modelos de texto son muy baratos; las imágenes cuestan un poco más
