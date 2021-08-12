const fs = require("fs");
const { BlockChain } = require("./blockchain");

const read = () => {
  try {
    if (fs.existsSync("./a")) {
      var read = fs.readFileSync("./a");
      read = JSON.parse(read);
      var blockchain = new BlockChain(read);
      return blockchain;
    } else {
      var bChain = new BlockChain({ genesis: null, blocks: null });
      fs.writeFileSync("./a", JSON.stringify(bChain, null, 2));
      return bChain;
    }
  } catch (err) {
    console.log(err);
    return new Error("Error Occured. Check Logs");
  }
};

const addBlock = (votes) => {
  try {
    var blockchain = read();
    var check = blockchain.addNewBlockToChain(
      votes,
      blockchain.getTotalVotesCount()
    );

    console.log(blockchain.getTotalVotesCount());
    if (check) {
      fs.writeFileSync("./a", JSON.stringify(blockchain, null, 2));
    } else {
      throw new Error("Block Not added");
    }
  } catch (err) {
    console.log(err);
    return new Error("Error Occured. Check logs");
  }
};

module.exports = {
  read,
  addBlock,
};
