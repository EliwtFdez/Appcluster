# WebAppCluster

Este proyecto fue generado usando Angular CLI versión 19.0.7.

## Development server

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abre tu navegador y navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

## Code scaffolding

Angular CLI incluye herramientas potentes para generar código. Para generar un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para obtener una lista completa de esquemas disponibles (como componentes, directivas o pipes), ejecuta:

```bash
ng generate --help
```

## Building

Para compilar el proyecto, ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.

## Running unit tests

Para ejecutar pruebas unitarias con el test runner Karma, usa el siguiente comando:

```bash
ng test
```

## Running end-to-end tests

Para ejecutar pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Tecnologías utilizadas

- **Frontend**: Angular  
- **Backend**: Node.js (si aplica)  
- **Base de datos**: MongoDB (si aplica)  
- **Orquestación**: Docker y Docker Compose (si aplica)  

## Requisitos previos

- Node.js instalado (v16 o superior)
- Angular CLI instalado (`npm install -g @angular/cli`)
- Docker instalado (si usas Docker)
- Docker Compose instalado (si usas Docker Compose)

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/EliwtFdez/web-app-cluster.git
cd web-app-cluster
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
ng serve
```

### 4. Acceder a la aplicación

Abre tu navegador y visita [http://localhost:4200/](http://localhost:4200/).

## Uso de Docker (si aplica)

### 1. Construir la imagen de Docker

```bash
docker build -t nombre-de-tu-imagen .
```

### 2. Ejecutar el contenedor

```bash
docker run -p 4200:80 nombre-de-tu-imagen
```

### 3. Usar Docker Compose

Si tu proyecto incluye un archivo `docker-compose.yml`, puedes ejecutar:

```bash
docker-compose up --build
```

Esto levantará los servicios definidos en el archivo `docker-compose.yml`.

## Estructura del proyecto

```
/src                # Código fuente de la aplicación Angular
/dist               # Carpeta de salida después de ejecutar `ng build`
/docker-compose.yml # Configuración de Docker Compose (si aplica)
/Dockerfile         # Archivo de configuración de Docker (si aplica)
```

## Contribuir

Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu feature:
   ```bash
   git checkout -b mi-feature
   ```
3. Haz commit de tus cambios:
   ```bash
   git commit -m 'Añadir nueva feature'
   ```
4. Haz push a la rama:
   ```bash
   git push origin mi-feature
   ```
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Recursos adicionales

Para más información sobre Angular CLI y comandos detallados, visita la [documentación oficial de Angular CLI](https://angular.io/cli).
