# Invitación a Mi Confirmación - Marcel Vladimir Pilaloa Zea

Web de invitación elegante y responsive para el evento de Confirmación.

## Características

- 🎨 Diseño elegante, formal y religioso
- 📱 Totalmente responsive (móvil y escritorio)
- ✨ Efectos interactivos y animaciones suaves
- 📝 Sistema de confirmación de asistencia
- 🗄️ Base de datos MongoDB para almacenar confirmaciones
- 🗺️ Integración con Google Maps
- 📸 Enlace a álbum compartido de iCloud

## Requisitos Previos

- Python 3.8 o superior
- MongoDB (local o MongoDB Atlas)
- pip (gestor de paquetes de Python)

## Instalación

1. **Clonar o descargar el proyecto**

2. **Crear un entorno virtual (recomendado)**
```bash
python -m venv venv

# En Windows:
venv\Scripts\activate

# En Linux/Mac:
source venv/bin/activate
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar MongoDB**

   **Opción A: MongoDB Local**
   - Instalar MongoDB Community Edition desde https://www.mongodb.com/try/download/community
   - Iniciar el servicio de MongoDB
   - La aplicación se conectará automáticamente a `mongodb://localhost:27017/confirmacion_db`

   **Opción B: MongoDB Atlas (Nube - Recomendado)**
   - Crear una cuenta gratuita en https://www.mongodb.com/cloud/atlas
   - Crear un cluster gratuito
   - Obtener la cadena de conexión
   - Crear un archivo `.env` basado en `.env.example` y agregar tu URI:
     ```
     MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/confirmacion_db?retryWrites=true&w=majority
     ```

5. **Agregar la foto de perfil**
   - Coloca tu imagen `profile.png` en la carpeta `static/images/`

## Ejecución

1. **Iniciar la aplicación**
```bash
python app.py
```

2. **Abrir en el navegador**
   - Visita: http://localhost:5000
   - En dispositivos móviles de la misma red: http://[TU_IP]:5000

## Estructura del Proyecto

```
invitacion_marcel/
│
├── app.py                      # Aplicación Flask principal
├── requirements.txt            # Dependencias de Python
├── .env.example               # Ejemplo de configuración
├── README.md                  # Este archivo
│
├── templates/
│   └── index.html             # Plantilla HTML principal
│
└── static/
    ├── css/
    │   └── styles.css         # Estilos CSS
    ├── js/
    │   └── script.js          # JavaScript para interactividad
    └── images/
        └── profile.png        # Foto de perfil (agregar aquí)
```

## Funcionalidades

### Para los Invitados
- ✅ Ver información del evento
- ✅ Ver ubicación en Google Maps
- ✅ Confirmar asistencia con formulario
- ✅ Indicar número de invitados
- ✅ Dejar un mensaje opcional
- ✅ Acceder al álbum compartido de fotos

### Para el Administrador
- ✅ Ver todas las confirmaciones en `/confirmaciones`

## Despliegue en Producción

### Opción 1: Render.com (Recomendado - Gratis)
1. Crear cuenta en https://render.com
2. Conectar repositorio de GitHub
3. Configurar variables de entorno (MONGO_URI)
4. Desplegar automáticamente

### Opción 2: PythonAnywhere
1. Crear cuenta en https://www.pythonanywhere.com
2. Subir archivos
3. Configurar WSGI
4. Configurar variables de entorno

### Opción 3: Heroku
1. Crear `Procfile`:
   ```
   web: python app.py
   ```
2. Desplegar con Heroku CLI

## Personalización

### Cambiar Colores
Edita las variables CSS en `static/css/styles.css`:
```css
:root {
    --color-primary: #1a1a2e;
    --color-secondary: #8b7355;
    --color-gold: #d4af37;
    /* ... más colores */
}
```

### Modificar Información del Evento
Edita el archivo `templates/index.html` con tu información específica.

## Tecnologías Utilizadas

- **Backend**: Flask (Python)
- **Base de Datos**: MongoDB
- **Frontend**: HTML5, CSS3, JavaScript
- **Fuentes**: Google Fonts (Cormorant Garamond, Montserrat)
- **Iconos**: Font Awesome

## Soporte

Para problemas o preguntas, contacta al desarrollador.

## Licencia

Este proyecto fue creado para el evento de Confirmación de Marcel Vladimir Pilaloa Zea.

---

**Evento**: Mi Confirmación
**Fecha**: Sábado, 10 de enero, 2:00 p.m.
**Lugar**: Machala, El Oro, Ecuador
**Familia**: Pilaloa Zea

¡Esperamos contar con tu presencia! 🙏✨
