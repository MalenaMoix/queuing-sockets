var socket = io();

var label = $("small");
//El escritorio se manda por el url entonces lo voy a obtener desde alli
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("Debe ingresar el escritorio");
}

var escritorio = searchParams.get("escritorio");

$("h1").text("Escritorio " + escritorio);

$("button").on("click", function() {
    socket.emit("atenderTicket", { escritorio: escritorio }, function(
        respuesta
    ) {
        if (respuesta === "No hay tickets por atender") {
            label.text(respuesta);
            alert(respuesta);
            return;
        }
        label.text("Ticket " + respuesta.numero);
    });
});