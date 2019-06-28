function listProjects() {
    /*$('.projekt1').css('visibility', 'hidden');
    $('.projekt2').css('visibility', 'hidden');
    $('.projekt3').css('visibility', 'hidden');*/

    GENO.getCrowdfunderCount({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
        const count = result.c[0];
        console.log(count, 'Projekte');

        var k = 0;
        for (var i = count-1; i >= Math.max(0, count - 3); --i) {
            const myI = i;
            const myK = k;
            GENO.getCrowdfunder(myI, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }

                const proj = '.projekt' + (myK+1);
                $(proj + '-sparte').text(result[0]);
                $(proj + '-name').text(result[1]);
                $(proj + '-beschreibung').text(result[2]);
                $(proj + '-bild').attr('src', result[3]);
                $(proj + '-betrag').text(result[4]);
                //$(proj).css('visibility', 'visible');
            });
            ++k;
        }
    });
}

function invest(id) {
    GENO.fund(id, 1, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        
        alert('Vielen Dank!\n\nDu hast 1 GenoToken in das Projekt investiert!');
    });
}

function loadAnteile() {
    getAnteile((count) => {
        $('#anteil-count').text(count);
        $('#anteil-betrag').text(count * 50);
    });
}

$(document).ready(() => {
    doIfUnlocked((account) => {
        listProjects();
        setInterval(listProjects, 10000);
        doIfMember(
            false,
            () => {
                loadAnteile();
                setInterval(loadAnteile, 10000);
            },
            () => {
                
            }
        );
    });
});