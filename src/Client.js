const WebSocket = require('ws');

// Conectar al servidor WebSocket
const ws = new WebSocket('ws://localhost:1234');

// Evento cuando se establece la conexión
ws.on('open', function open() {
    console.log('Conectado al servidor WebSocket');
    ws.send('Hola, soy un cliente');
});

// Evento para recibir mensajes del servidor
ws.on('message', function incoming(message) {
    console.log('Mensaje recibido del servidor: %s', message);
});
