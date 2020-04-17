//Establecer la conexion
var socket = io();

//Referencia al elemento html con JQuery
var labelSiguienteTicket = $("#lblNuevoTicket");

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
    console.log("Desconectado del servidor");
});

socket.on("estadoActual", function(ticketActual) {
    labelSiguienteTicket.text(ticketActual.actual);
});

//Establecer un listener al boton Generar Nuevo Ticket
//Con JQuery
//Todos los botones al hacer click en esta pantalla van a disparar esta funcion
$("button").on("click", function() {
    console.log("click");

    socket.emit("siguienteTicket", function(siguienteTicket) {
        labelSiguienteTicket.text(siguienteTicket);
    });
});