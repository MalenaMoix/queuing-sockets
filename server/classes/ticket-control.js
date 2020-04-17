const fs = require("fs");

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //Este arreglo va a contener todos los tickets que esten pendientes
        this.tickets = [];

        //Arreglo para los 4 tickets que se ven en la pantalla
        this.ultimosCuatro = [];

        let data = require("../data/data.json");

        //Cada vez que empieza un nuevo dia quiero reiniciar el proceso
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return "No hay tickets por atender";
        }

        let primerTicket = this.tickets[0].numero;

        //Elimino la primera posicion de tickets
        this.tickets.shift();

        //Creo el ticket que voy a atender y lo coloco en la primera posicion del arreglo que se va a ver en pantalla
        let atenderTicket = new Ticket(primerTicket, escritorio);
        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); //Elimina el ultimo
        }
        console.log("Ultimos 4:");
        console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log("Se ha inicializado el sistema");
        this.grabarArchivo();
    }

    grabarArchivo() {
        //Informacion que quiero grabar
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro,
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketControl,
};