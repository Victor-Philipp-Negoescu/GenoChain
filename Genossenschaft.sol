pragma solidity ^0.5.0;


import "./ERC20.sol";

contract Genossenschaft is ERC20 {
    using SafeMath for uint256;
    
    mapping (address => Mitglied) private _mitglieder;
    
    Mitglied[] public mitglieder;
    
    uint256 private costOfToken;
    
    uint256 private mitgliederCount;

    
    constructor (uint256 _costOfToken) public{
        costOfToken = _costOfToken;
        mitgliederCount = 0;
    }
    
    struct Mitglied {
        string vorname;
        string nachname; 
        string strasse; 
        string ort; 
        string email; 
        string username;
        bool isValid;
    }
    

    function addMitglied(string memory _vorname, 
        string memory _nachname, 
        string memory _strasse, 
        string memory _hausnummer, 
        string memory _plz, 
        string memory _ort, 
        string memory _email, 
        string memory _username) public {
        
        require(!_mitglieder[msg.sender].isValid);
        
        Mitglied memory mitglied = Mitglied(_vorname,_nachname,_strasse,_ort,_email,_username,true);
        mitglieder.push(mitglied);
        _mitglieder[msg.sender] = mitglied;
        _mint(msg.sender, 0);
        mitgliederCount++;
     
    }
    
    function buyToken() public payable{
        
        require(!_mitglieder[msg.sender].isValid);
        uint256 value = msg.value;
        uint256 amountOfTokenToBuy = value.div(costOfToken);
        _mint(msg.sender, amountOfTokenToBuy);
    }
    
 /**  function getMitglieder() public view returns (Mitglied[] memory) {
        return mitglieder;
        //Mitglied[] memory _mitglieder = new s[] (mitglieder.length);
      //  return _nachname;
    } */
    
    function getMitgliederCount() public view returns(uint256){
        return mitgliederCount;
    }
    
 /**   function getMitglied(uint256 index) public view returns (string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory){
        Mitglied memory mitglied = mitglieder[index];
        return (mitglied.vorname,
            mitglied.nachname,
            mitglied.strasse,
            mitglied.hausnummer,
            mitglied.plz,
            mitglied.ort,
            mitglied.email,
            mitglied.username);
    }*/
    
    
    
   
}