function buyToken() {
    var weiValue = web3.toWei(0.01, 'ether');
    GENO.buyToken({
        value: weiValue
    }, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

function sellToken() {
    GENO.sellToken({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

var chart = null;
function loadAnteile() {
    getTokenLimit((limit) => {
        getTotalSupply((supply) => {
            getAnteile((count) => {
                const avail = Math.max(0, limit - supply);
                $('#anteil-count').text(count);
                $('#anteil-available').text(avail);
                $('#anteil-betrag').text(count * 50);
        
                var data = google.visualization.arrayToDataTable([
                    ['Typ', 'Anzahl'],
                    ['Gezeichnet', count],
                    ['Verfügbar', avail]
                ]);
            
                var options = {
                    //title: 'My Daily Activities',
                    pieHole: 0.7,
                    colors: ['#FF6711', '#0066B3'],
                    legend: {position: 'none'},
                    pieSliceText: "none"
                };
            
                if (chart == null) {
                    chart = new google.visualization.PieChart(document.getElementById('anteile-chart'));
                }
                chart.draw(data, options);
            }); 
        });
    });
}

function listMembers() {
    $("#mitgliederliste > tr").remove();
    GENO.getMitgliederCount({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result);
        const count = result.c[0];
        console.log(count, 'Mitglieder');

        for (var i = 0; i < count; ++i) {
            GENO.getMitglied(i, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(result);

                $("#mitgliederliste").append("<tr>" +
                "<td>" + result[4] + "</td>" +
                "<td>" + result[0] + "</td>" +
                "<td>" + result[3] + "</td>" +
                "<td>" + result[1] + ", " + result[2] + "</td>" +
                "</tr>");
            });
        }
    });
}

$(document).ready(() => {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(() => {
        doIfUnlocked((account) => {
            doIfMember(
                false,
                () => {
                    listMembers();
                    loadAnteile();
                    setInterval(loadAnteile, 10000);
                },
                () => {
                    document.location.href = '/startseite.html';
                }
            );
        });
    });
});