window.jsPDF = window.jspdf.jsPDF;
var submit = document.getElementById('genera')
submit.addEventListener("click", createPDF)

//calcoli & layout fattura & salvaPDF
function createPDF() {
    
    // Default export is a4 paper, portrait, using millimeters for units
    var doc = new jsPDF();

    //campi pag.1
    var titolo = document.querySelector('input[name="titolo"]:checked').value
    var pre
    var cognome = document.querySelector('input[name="Cognome"]').value
    var nome = document.querySelector('input[name="Nome"]').value
    var tuoIndirizzo = document.querySelector('input[name="Indirizzo"]').value
    var tuaPiva = document.querySelector('input[name="P.IVA"]').value

    if (titolo == 'M') {
        pre = "Dott. "
    } else if (titolo == 'F'){
        pre = "Dott.ssa "
    } else {
        pre = ""
    }

    var fullname = pre + cognome + " " + nome

    //campi pag.2
    var nomePaziente = document.querySelector('input[name="name"]').value
    var taxCode = document.querySelector('input[name="taxcode"]').value
    var indirizzoPaziente = document.querySelector('input[name="address"]').value

    //campi pag.3
    var Ore = document.querySelector('input[name="Ore"]').value
    var Descrizione = document.querySelector('input[name="Descrizione"]').value
    var Unitario = document.querySelector('input[name="Unitario"]').value

    var Ore2 = document.querySelector('input[name="Ore2"]').value
    var Descrizione2 = document.querySelector('input[name="Descrizione2"]').value
    var Unitario2 = document.querySelector('input[name="Unitario2"]').value

    var Ore3 = document.querySelector('input[name="Ore3"]').value
    var Descrizione3 = document.querySelector('input[name="Descrizione3"]').value
    var Unitario3 = document.querySelector('input[name="Unitario3"]').value

    var INPS = document.getElementById("INPS").checked
    var MarcaDaBollo = document.getElementById("MarcaDaBollo").checked

    //campi pag.4
    var data = document.querySelector('input[name="Emissione"]').value 
    var dataFattura = data.split("-").reverse().join("-")
    var numFattura = document.querySelector('input[name="Numero"]').value

    //Calcoli
    var subtotal
    var totale
    var INPSper
    var INPSval
    var MarcaDaBolloVal

    if (INPS == true && MarcaDaBollo == true) {
        INPSper = 0.04
        MarcaDaBolloVal = 2
        subtotal = (Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3)
        INPSval = subtotal*INPSper
        totale = subtotal+INPSval+MarcaDaBolloVal
       } else if (INPS == true && MarcaDaBollo == false) {
        INPSper = 0.04
        MarcaDaBolloVal = 0
        subtotal = (Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3)
        INPSval = subtotal*INPSper
        totale = subtotal+INPSval+MarcaDaBolloVal
       } else if (INPS == false && MarcaDaBollo == true) {
        INPSper = 0
        MarcaDaBolloVal = 2
        subtotal = (Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3)
        INPSval = subtotal*INPSper
        totale = subtotal+INPSval+MarcaDaBolloVal
       } else {
        INPSper = 0
        MarcaDaBolloVal = 0
        subtotal = (Ore*Unitario)+(Ore2*Unitario2)+(Ore3*Unitario3)
        INPSval = subtotal*INPSper
        totale = subtotal+INPSval+MarcaDaBolloVal 
       }

    //layout fattura
    // Aggiunge il numero e la data della fattura
    doc.setFont('helvetica');
    doc.setFontSize(35);
    doc.text(28, 30, "Fattura n." + numFattura + " del " + dataFattura);

    // Aggiunge i dati del professionista e del paziente alla fattura
    doc.setFont('helvetica');
    doc.setFontSize(14);
    doc.text(20, 50, "Professionista:");

    doc.setFont('courier');
    doc.setFontSize(12);
    doc.text(20, 58, fullname);
    doc.text(20, 63, tuoIndirizzo);
    doc.text(20, 68, "P. IVA:" + tuaPiva);
    
    doc.setFont('helvetica');
    doc.setFontSize(14);
    doc.text(20, 80, "Destinatario:");

    doc.setFont('courier');
    doc.setFontSize(12);
    doc.text(20, 88, nomePaziente);
    doc.text(20, 93, indirizzoPaziente);
    doc.text(20, 98, taxCode);

    // Disegna il riquadro per la marca da bollo
    doc.setFont('helvetica');
    doc.rect(120, 108, 60, 45);
    doc.text(125, 132, "Marca da Bollo ove prevista")
    
    doc.setFontSize(14);
    doc.autoTable({
        headStyles: { halign: 'center' },
        bodyStyles: { halign: 'left' },
        theme: 'grid',
        head: [['Quantità/Ore', 'Descrizione', 'Prezzo Unitario']],
        body: [
            [Ore, Descrizione, "€ " + Unitario],
            [Ore2, Descrizione2, "€ " + Unitario2],
            [Ore3, Descrizione3, "€ " + Unitario3],
            ["","",""],
            ["","Subtotale:", "€ " + subtotal],
            ["","4% INPS:", "€ " + INPSval],
            ["", "Marca Da Bollo:", "€ " + MarcaDaBolloVal],
            ["", "Totale:", "€ " + totale]
            ],
        startY: 170,
        columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center' } },
                 })

    doc.setFontSize(9);
    doc.text(15, 270, "Operazione effettuata senza applicazione dell’IVA ai sensi dell’art.1, commi da 54 a 89, Legge n.190/2014 - Regime Forfettario.");
    doc.text(15, 275, "Si richiede la non applicazione della Ritenuta alla fonte a titolo di acconto come previsto dall’art.1, comma 67, Legge n.190/2014.");
    doc.text(15, 280, "Imposta di Bollo sull’originale (per importi superiori ad €77,47).")

    //salva file con naming convention
    var filename = 'Fattura n.'+numFattura+' del '+dataFattura+', '+nomePaziente+'.pdf'
    doc.save(filename);

    //torna in alto
    var scroll = document.getElementById("navbar");
    scroll.scrollIntoView();
}