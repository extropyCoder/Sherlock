var Web3 = require("web3");
function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber, nonce) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
     if (i % 1000 == 0) {
       console.log("Searching block " + i);
     }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
        //console.log("got trans");
        block.transactions.forEach( function(e) {
          var fromAddress  = e.from;
//          if (e.hash=="0xf6dc750d6ce1c710a18482cc1b37e82f0636d149dca8078c1154a7a9840fa3b1")   { //&& nonce == e.transactionIndex) {
            if (e.from=="0x05694d29b7c6c65abce2a7c45317d0e177339d35")   { //&& nonce == e.transactionIndex) {

        //    Do something with the trasaction
              console.log("  tx hash          : " + e.hash + "\n"
              + "   nonce           : " + e.nonce + "\n"
              + "   blockHash       : " + e.blockHash + "\n"
              + "   blockNumber     : " + e.blockNumber + "\n"
              + "   transactionIndex: " + e.transactionIndex + "\n"
              + "   from            : " + e.from + "\n"
              + "   to              : " + e.to + "\n"
              + "   value           : " + e.value + "\n"
              + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
              + "   gasPrice        : " + e.gasPrice + "\n"
              + "   gas             : " + e.gas + "\n"
              + "   input           : " + e.input);

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
getTransactionsByAccount("0x05694d29b7c6c65abce2a7c45317d0e177339d35",1537373,null,1);
