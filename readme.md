# Delilah Restó

_Trabajo número 3 del curso de desarrollo Web Full Stack de Acámica, donde creamos el backend de una app de pedidos de comida de un restaurante llamado Delilah Restó._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local._

### Pre-requisitos 📋

_Antes de comenzar a correr el proyecto, asegurate de tener instaladas las siguientes tecnologías:_

```
Node.js
MySQL
Postman
DBeaver
```

_Es opcional el uso de nvm en lugar de node.js, como también el uso de Docker para comenzar o terminar procesos como por ejemplo: MySQL_

### Instalación 🔧

_Comenzaremos abriendo el programa DBeaver, donde creamos nuestra base de datos llamada: delilah_resto. Luego descargamos el proyecto en nuestra máquina local._

```
git clone https://github.com/Vera177/delilahresto.git
```

_Ahora, procedemos a instalar las dependencias necesarias:_

_Ubicados en la carpeta donde descargamos el proyecto, ejecutar:_

```
npm i
```

_Luego ejecutaremos los siguientes comandos para crear las tablas (migrar) y luego ingresar los datos en ellas (seedar)_

```
npm run db:migrate
```

```
npm run db:seed:all
```

_En caso de querer volver un paso atrás en nuestras migraciones, ejecutaremos:_

```
npm run db:migrate:undo
```
_Para eliminar todas las tablas y comenzar nuevamente, ejecutaremos:_

```
npm run db:migrate:reset
```
_Para levantar nuestro proyecto, escribimos en nuestra terminal:_

```
npm run dev
```

_Para consultar nuestra base de datos, podemos utilizar Postman en conjunto con Swagger, donde tenemos documentados nuestros endpoints. Con nuestro proyecto levantado, nos vamos a dirigir a http://localhost:3000/api-docs/#/_

