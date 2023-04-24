# README
Este es un proyecto de prueba técnica que utiliza Vue.js 3 para el cliente y Node.js para el servidor sobre Express.JS, y hace uso de websockets para la comunicación en tiempo real entre el cliente y el servidor.

## Instalación
Para instalar las dependencias del cliente y del servidor, ejecuta el siguiente comando en la raíz del proyecto:

```npm install```
## Ejecución
Para ejecutar el cliente y el servidor, ejecuta el siguiente comando en la raíz del proyecto:

```npm run dev```
## Funcionalidad
El proyecto consiste en una aplicación de chat en tiempo real que permite a los usuarios registrarse y conectarse a una sala de chat específica. Los usuarios pueden enviar mensajes en las salas de chat y ver los mensajes de otros usuarios en tiempo real.

La aplicación utiliza websockets para la comunicación en tiempo real entre el cliente y el servidor, mas especificamente Socket.io y la información de los usuarios y las salas de chat se almacena en una base de datos de MongoDB en la nube a través de MongoDB Atlas.

Los formularios de registro, inicio de sesión  y envio de mensajes tienen integradas validaciones de campos obligatorios y de formato.
