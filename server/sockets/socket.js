const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
    console.log("Usuario conectado");

    client.on("siguienteTicket", (callback) => {
        let siguiente = ticketControl.siguienteTicket();

        console.log(`El siguiente ticket es el ${siguiente}`);
        callback(siguiente);
    });

    client.emit("estadoActual", {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro(),
    });

    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "Tiene que enviar el escritorio",
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit("ultimosCuatro", {
            ultimosCuatro: ticketControl.getUltimosCuatro(),
        });
    });
});