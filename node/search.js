var Web3 = require("web3");
var trackAddress = ["0x304a554a310c7e546dfe434669c62820b7d83490","0x304a554a310c7e546dfe434669c62820b7d83490","0xe592ac96747db16337ac8f2e9d1e3dc8fd8bcca7"];

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
  if (trackAddress.indexOf(address) != -1) {
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

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
     if (i % 1000 == 0) {
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

  return 0;
}

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("Starting Search");
var eth = web3.eth;
//console.log(web3.eth.blockNumber);
getTransactionsForAccount(1540683,null);
