# ✨ ToDo API ✨

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.3-38B2AC?style=flat-square&logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.14.1-336791?style=flat-square&logo=postgresql)

Una elegante aplicación de gestión de tareas con una interfaz moderna y funcionalidades completas. Construida con React, TypeScript, Tailwind CSS y respaldada por una API Express con PostgreSQL.

## 🚀 Características

- ✅ Interfaz de usuario moderna y responsive
- 🌓 Modo oscuro/claro integrado
- ⚡ Animaciones fluidas con Framer Motion
- 🔄 Operaciones CRUD completas para tareas
- 🔒 Conexión segura a base de datos PostgreSQL

## 📋 Requisitos previos

- Node.js (v18 o superior)
- PostgreSQL
- npm o yarn

## 🛠️ Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/Junlovin/todo_api.git
cd todo_api
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example`:

```
DB_HOST=tu_host_aquí
DB_PORT=5432
DB_DATABASE=nombre_de_tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
POOL_MODE=session
```

4. **Configura tu base de datos**

Crea una base de datos PostgreSQL y una tabla `tasks` con la siguiente estructura:

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
);
```

5. **Inicia el servidor de desarrollo**

```bash
# Para iniciar el servidor backend.
npm run start
# En otra termianl, inicia el frontend.
npm run dev
```

## 🌐 Endpoints de la API

### Obtener todas las tareas

```plaintext
GET http://localhost:3000/tareas
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "created_at": "2023-06-15T10:30:00.000Z",
    "name": "Ejemplo de tarea",
    "description": "Esta es una descripción de ejemplo",
    "completed": false
  },
  ...
]
```

### Obtener una tarea específica

```plaintext
GET http://localhost:3000/tareas/:id
```

**Respuesta:**

```json
{
  "id": 1,
  "created_at": "2023-06-15T10:30:00.000Z",
  "name": "Ejemplo de tarea",
  "description": "Esta es una descripción de ejemplo",
  "completed": false
}
```

### Crear una nueva tarea

```plaintext
POST http://localhost:3000/tareas
```

**Cuerpo de la solicitud:**

```json
{
  "name": "Nueva tarea",
  "description": "Descripción de la nueva tarea"
}
```

**Respuesta:**

```json
{
  "success": "Tarea creada correctamente",
  "id": 2
}
```

### Actualizar una tarea existente

```plaintext
PUT http://localhost:3000/tareas/:id
```

**Cuerpo de la solicitud:**

```json
{
  "name": "Tarea actualizada",
  "description": "Descripción actualizada",
}
```

**Respuesta:**

```json
{
  "success": "Se actualizó la tarea correctamente."
}
```

### Eliminar una tarea

```plaintext
DELETE http://localhost:3000/tareas/:id
```

**Respuesta:**

```json
{
  "success": "Tarea eliminada correctamente"
}
```

## 🖥️ Uso de la aplicación

1. Página de inicio : Presenta la aplicación y solicita tu nombre para personalizar la experiencia.
2. Lista de tareas : Visualiza todas tus tareas con opciones para crear, editar y eliminar.
3. Detalles de tarea : Haz clic en cualquier tarea para ver sus detalles completos.
4. Crear/Editar tarea : Formularios intuitivos para gestionar tus tareas.
5. Modo oscuro : Cambia entre modo claro y oscuro con un solo clic.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias, no dudes en abrir un issue o enviar un pull request.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 📞 Contacto

Si tienes preguntas o comentarios, puedes contactarme a través de:

- Email: [mathiassaid7@gmail.com](mailto:mathiassaid7@gmail.com)
- GitHub: [JunLovin](https://github.com/junlovin)
- LinkedIn: Mathias Rendon