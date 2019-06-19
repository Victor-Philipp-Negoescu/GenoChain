function addProject() {
    var form = document.forms[0];
    var sparte = form.sparte.value;
    var name = form.name.value;
    var betrag = form.betrag.value;
    var beschreibung = form.beschreibung.value;
    var bild = form.bild.value;
    var endtermin = form.endtermin.value;

    GENO.addCrowdfunder(sparte, name, betrag, beschreibung, bild, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }

        alert("Vielen Dank!\n\nDein Projekt wird in wenigen Momenten freigeschaltet!");
        document.location.href = "/genofund.html";
    });
}

$(document).ready(() => {
   
});