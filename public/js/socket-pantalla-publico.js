var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");
var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4,
];

socket.on("estadoActual", function(data) {
    let ultimosCuatro = data.ultimosCuatro;
    actualizarHTML(ultimosCuatro);
});

socket.on("ultimosCuatro", function(ultimosCuatro) {
    var audio = new Audio("../audio/new-ticket.mp3");
    audio.play();

    actualizarHTML(ultimosCuatro.ultimosCuatro);
});

function actualizarHTML(ultimosCuatro) {
    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        var numeroTicket = ultimosCuatro[i].numero;
        var numeroEscritorio = ultimosCuatro[i].escritorio;

        lblTickets[i].text(`Ticket ${numeroTicket}`);
        lblEscritorios[i].text(`Escritorio ${numeroEscritorio}`);
    }

    lblTicket1.text(`Ticket ${ultimosCuatro[0].numero}`);
    lblEscritorio1.text(`Escritorio ${ultimosCuatro[0].escritorio}`);
}