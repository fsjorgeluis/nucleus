![Build Status](https://img.shields.io/badge/Dashboard-v0.1.0-green)
![Build Status](https://img.shields.io/badge/build-passing-green)
![Build Status](https://img.shields.io/badge/nodejs-v14.15.3-blue)
![Build Status](https://img.shields.io/badge/Licence-GPL_v3-blue)
# Nucleus - Graphql API para "Jw Cartelera Digital"

API desarrollada en nodejs con graphql para la aplicación cartelera digital, permite administrar distintas funciones administrativas inherentes a la cartelera y actividades programadas.

## Documentación

Una vez clonado el repositorio, duplicar el archivo *.env.sample* y renombrar a *.env*, editar los parámetros de entorno a conveniencia, instalar los paquetes necesarios utilizando npm y ejecutar el servidor.

```
npm install

npm run dev
```

A continuación se describen las posibles peticiones en base a los query y mutations disponibles en la API. Todas las peticiones son realizadas mediante el método **POST** a un unico endpoint. 

```
POST: /graphql
```

Ejemplo de estructura de los query y mutations.

```
query {
    books {
        title
        author
  }
}

mutation {
    book(title:"title" author:"author") {
        title
        author
    }
}
```

## Prerrequisitos

Para ejecutar el proyecto localmente se requiere la instalación previa de **Nodejs** en su version 14.15.3 en adelante, descargable desde el sitio oficial del desarrollador:

```
Nodejs v14.15.3
```

## Herramientas utilizadas

* [Visual Studio Code](https://code.visualstudio.com/) - Editor de código.
* [Nodejs](https://nodejs.org/es/) - Entorno de desarrollo.
* [MongoDB Atlas](https://www.mongodb.com/es/cloud/atlas) - Motor de Base de Datos.

## Versiones

Se utiliza [SemVer](http://semver.org/) en el versionado. Para encontrar las versiones disponibles, mira [tags en este repositorio](https://github.com/Hobbylayer/dashboard/tags). 

## Autores (origen de idea)

* **Jorge Fernández** - *Software Developer* - [fsjorgeluis](https://github.com/fsjorgeluis/)
* **Javier Mora** - *Frontend / UI Developer* - [j4viermora](https://github.com/j4viermora)

## Licencia

GNU GPL v3.

