function isInstalled() {
    return (typeof window.web3 !== 'undefined');
}

function doIfUnlocked(callback) {
    if (!isInstalled()) {
        console.log('MetaMask is not installed.');
        return;
    }

    window.web3.eth.getAccounts(function (err, accounts) {
        if (err != null) {
            console.log(err);
        } else if (accounts.length === 0) {
            console.log('MetaMask is locked');
        } else {
            callback(accounts[0]);
        }
    });
}

var Geno = null;

function register() {
    var form = document.forms[0];
    var vorname = form.vorname.value;
    var nachname = form.nachname.value;
    var strasse = form.anschrift.value;
    var ort = form.plz.value + " " + form.ort.value;
    var email = form.email.value;
    var username = form.nickname.value;

    Geno
        .addMitglied(vorname, nachname, strasse, ort, email, username,
        (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(result);
        });
}

function listMembers() {
    Geno.getMitgliederCount({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result.s, 'Mitglieder');

        for (var i = 0; i < result.s; ++i) {
            Geno.mitglieder(i, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(result);
            });
        }
    });
}

$(document).ready(() => {
    doIfUnlocked((account) => {
        const GenoContract = web3.eth.contract(
            [
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_vorname",
                            "type": "string"
                        },
                        {
                            "name": "_nachname",
                            "type": "string"
                        },
                        {
                            "name": "_strasse",
                            "type": "string"
                        },
                        {
                            "name": "_ort",
                            "type": "string"
                        },
                        {
                            "name": "_email",
                            "type": "string"
                        },
                        {
                            "name": "_username",
                            "type": "string"
                        }
                    ],
                    "name": "addMitglied",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [],
                    "name": "buyToken",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "_costOfToken",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getMitgliederCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "mitglieder",
                    "outputs": [
                        {
                            "name": "vorname",
                            "type": "string"
                        },
                        {
                            "name": "nachname",
                            "type": "string"
                        },
                        {
                            "name": "strasse",
                            "type": "string"
                        },
                        {
                            "name": "ort",
                            "type": "string"
                        },
                        {
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "name": "isValid",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        );
        Geno = GenoContract.at('0x8e66c14752f0be8204d88cf57b83dc2670bb1a47');
        listMembers();
    });
});