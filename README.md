![Build Status](https://img.shields.io/badge/Dashboard-v0.1.0-green)
![Build Status](https://img.shields.io/badge/build-passing-green)
![Build Status](https://img.shields.io/badge/nodejs-v14.15.3-blue)
![Build Status](https://img.shields.io/badge/Licence-GPL_v3-blue)
# Nucleus - Graphql API para "Jw Cartelera Digital"

API REST desarrollada en nodejs para la aplicación cartelera digital, permite administrar distintas funciones administrativas inherentes a la cartelera y actividades programadas.

## Documentación

Una vez clonado el repositorio, duplicar el archivo *.env.sample* y renombrar a *.env*, editar los parámetros de entorno a conveniencia, instalar los paquetes necesarios utilizando npm y ejecutar el servidor.

```
npm install

npm run dev
```

A continuación se describen las posibles peticiones disponibles en la API. 

```
GET: /
```

Información sobre la estatus de la api.

```
GET: /api/users/
```

Ruta protegida, lista todos los usuarios, se requiere cómo mínimo rol de administrador.

```
GET: /api/users/:id
```

Ruta protegida, obtiene un usuario según su id, retorna objeto con { **_id**, **name**, **lastName**, **email**, **nickname**, **address**, **phone2**, **isGroupSupervisor**, **isGroupAssistant**, **isAux**, **isPr**, **monthlyReport**, **role**, **status**, **phone1**, **group**, **createdAt**, **updatedAt** } se requiere cómo mínimo rol de administrador.

```
POST: /api/users/login

{
    "email": <String>,
    "password": <String>
}
```

Ruta pública, recibe objeto con { **email** y **clave** } de usuario registrado, devuelve **token** e información del usuario.

```
POST: /api/users/register

{
    "name": <String>,
    "lastName": <String>,
    "email": <String>,
    "password": <String>,
    "phone1": <String>,
    "group": <Int>
}
```

Ruta pública, recibe objeto con { **name**, **lastName**, **email**, **password**, **phone1**, **group** } retorna objeto con { **id**, **name**, **email**, **role** } del usuario creado.


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

