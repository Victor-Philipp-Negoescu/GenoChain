function listProjects() {
    $('.projekt1').hide();
    $('.projekt2').hide();
    $('.projekt3').hide();

    GENO.getCrowdfunderCount({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
        const count = result.c[0];
        console.log(count, 'Projekte');

        for (var i = Math.max(0, count - 3); i < count; ++i) {
            const myI = i;
            GENO.getCrowdfunder(myI, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }

                const proj = '.projekt' + (myI+1);
                $(proj + '-sparte').text(result[0]);
                $(proj + '-name').text(result[1]);
                $(proj + '-beschreibung').text(result[2]);
                $(proj + '-bild').attr('src', result[3]);
                $(proj + '-betrag').text(result[4]);
                $(proj).show();
            });
        }
    });
}

$(document).ready(() => {
    doIfUnlocked((account) => {
        listProjects();
    });
});