function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

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

var GENO = null;
var ADDRESS = null;

function checkIsMember(callback) {
    GENO.isMitglied({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Ist Mitglied?', result);
        callback(error, result);
    });
}

function doIfMember(wait, onTrue, onFalse) {
    checkIsMember((err, res) => {
        if (err) {
            console.error(err);
            onFalse();
            return;
        }

        if (res) {
            console.log('onTrue');
            onTrue();
            return;
        } else if (wait) {
            setTimeout(() => {
                doIfMember(true, onTrue, onFalse);
            }, 2000);
        } else {
            console.log('onFalse');
            onFalse();
        }
    })
}

function getAnteile(callback) {
    GENO.balanceOf(ADDRESS, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Balance:', result);
        callback(result.c[0]);
    });
}

function getTokenLimit(callback) {
    GENO.tokenLimit({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Total supply:', result);
        callback(result.c[0]);
    });
}

function getTotalSupply(callback) {
    GENO.totalSupply({}, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Total supply:', result);
        callback(result.c[0]);
    });
}

$(document).ready(() => {
    doIfUnlocked((account) => {
        const GenoContract = web3.eth.contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_projektSparte",
                        "type": "string"
                    },
                    {
                        "name": "_projektName",
                        "type": "string"
                    },
                    {
                        "name": "_kapitalBedarf",
                        "type": "uint256"
                    },
                    {
                        "name": "_projektBeschreibung",
                        "type": "string"
                    },
                    {
                        "name": "_bildUrl",
                        "type": "string"
                    }
                ],
                "name": "addCrowdfunder",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
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
                        "name": "_plz",
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
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "fund",
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
                "inputs": [],
                "name": "sellAllToken",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
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
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
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
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getCrowdfunder",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
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
                "name": "getCrowdfunderCount",
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
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getMitglied",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
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
                "inputs": [],
                "name": "isMitglied",
                "outputs": [
                    {
                        "name": "",
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
                "name": "tokenLimit",
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
        ]);
        GENO = GenoContract.at('0x154a7a4798811a7888f8ab98e203ed8046cd2ada');
        ADDRESS = account;
        console.log('address:', ADDRESS);
    });
});