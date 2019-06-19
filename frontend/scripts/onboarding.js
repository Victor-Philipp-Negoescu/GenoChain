function register() {
    var form = document.forms[0];
    var vorname = form.vorname.value;
    var nachname = form.nachname.value;
    var strasse = form.anschrift.value;
    var plz = form.plz.value;
    var ort = form.ort.value;
    var email = form.email.value;
    var username = form.nickname.value;

    GENO
        .addMitglied(vorname, nachname, strasse, plz, ort, email, username,
        (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(result);
            document.location.href = '/anmelden.html?target=dashboard&wait=true';
        });
}

$(document).ready(() => {
    doIfUnlocked((account) => {
        checkIsMember((err, res) => {
            if (res) {
                document.location.href = '/dashboard.html';
            }
        })
    });
});