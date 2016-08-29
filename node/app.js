var Web3 = require("web3");
var trackAddress = ["0x304a554a310c7e546dfe434669c62820b7d83490","0x304a554a310c7e546dfe434669c62820b7d83490","0xe592ac96747db16337ac8f2e9d1e3dc8fd8bcca7"];

var excludeAddress = ["0x204a554a310c7e546dfe434669c62820b7d83490"];

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};


function saveAndDisplay(block,transaction){
addToArray(transaction.from);
addToArray(transaction.to);

  console.log("  tx hash          : " + transaction.hash + "\n"
  + "   nonce           : " + transaction.nonce + "\n"
  + "   blockHash       : " + transaction.blockHash + "\n"
  + "   blockNumber     : " + transaction.blockNumber + "\n"
  + "   transactionIndex: " + transaction.transactionIndex + "\n"
  + "   from            : " + transaction.from + "\n"
  + "   to              : " + transaction.to + "\n"
  + "   value           : " + transaction.value + "\n"
  + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
  + "   gasPrice        : " + transaction.gasPrice + "\n"
  + "   gas             : " + transaction.gas + "\n"
  + "   input           : " + transaction.input);

}

function addToArray(address){
  if ((excludeAddress.indexOf(address)==-1) && (trackAddress.indexOf(address) != -1)) {
    trackAddress.push(address);
  }
}

function getTransactionsForAccount(startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account within blocks "  + startBlockNumber + " and " + endBlockNumber);
  setStatus("Searching");
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
     if (i % 500 == 0) {
       console.log("Searching block " + i);
     }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
        //console.log("got trans");
        block.transactions.forEach( function(e) {
              if ((trackAddress.indexOf(e.from)!=-1)|| (trackAddress.indexOf(e.to)!=-1)){
                  saveAndDisplay(block,e);
                }

              })
    }
    }
    setStatus("Finished");
  return 0;
}

// mist loading proposal https://gist.github.com/frozeman/fbc7465d0b0e6c1c4c23
if(typeof web3 !== 'undefined'){   // eg: If accessed via mist
  provider = web3.currentProvider; // Keep provider info given from mist `web3` object
  web3 = new Web3;                 // Re-instantiate `web3` using `Web3` from Dapp
}else{
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));         // Define and instantiate `web3` if accessed from web browser
  window.web3 = web3;
}


console.log("Starting Search");
var eth = web3.eth;

getTransactionsForAccount(1559736,null);
