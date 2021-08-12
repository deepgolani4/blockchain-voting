// "use strict";
var blake2 = require("blake2");

class Vote {
  constructor({ from, to, timestamp }) {
    this.from = from;
    this.to = to;
    this.timestamp = timestamp;
  }

  get getVote() {
    return JSON.stringify(this.getSerializeVote());
  }

  getSerializeVote() {
    return {
      from: this.from,
      to: this.to,
      timestamp: this.timestamp,
    };
  }
}

class Block {
  constructor({ timestamp, votes, previousHash, count, currentHash }) {
    this.timestamp = timestamp;
    this.votes = votes.map((vote) => {
      return new Vote(vote);
    });
    this.previousHash = previousHash;
    this.count = count;
    this.totalVotesThisBlock = votes.length;
    this.currentHash = currentHash;
  }

  #getData() {
    return {
      timestamp: this.timestamp,
      votes: this.votes,
      previousHash: this.previousHash,
      count: this.count,
    };
  }

  generateCounts() {
    this.votes.forEach((vote) => {
      vote.to in this.count
        ? (this.count[vote.to] = this.count[vote.to] + 1)
        : (this.count[vote.to] = 1);
    });
  }

  getCounts() {
    return this.count;
  }

  generateHash() {
    var h = blake2.createHash("blake2b");
    h.update(Buffer.from(JSON.stringify(this.#getData())));
    this.currentHash = h.digest("hex");
  }

  #checkGenerate() {
    var h = blake2.createHash("blake2b");
    h.update(Buffer.from(JSON.stringify(this.#getData())));
    var a = h.digest("hex");
    return a;
  }

  getHash() {
    return this.currentHash;
  }

  getPreviousHash() {
    return this.previousHash;
  }

  isValidBlock() {
    return this.currentHash == this.#checkGenerate();
  }
}

class BlockChain {
  constructor({ genesis, blocks }) {
    if (!(genesis && blocks)) {
      console.log("Suc1");
      this.genesis = new Block({
        timestamp: Date.now(),
        votes: [
          new Vote({ from: "genesis", to: "Genesis", timestamp: Date.now() }),
        ],
        previousHash: "Genesis",
        count: {},
      });
      this.genesis.generateHash();
      this.blocks = [this.genesis];
    } else {
      this.genesis = new Block(genesis);
      this.blocks = blocks.map((block) => {
        return new Block(block);
      });
    }
  }

  proofOfWork() {
    for (let i = 1; i < this.blocks.length; i++) {
      // if (!this.blocks[i].isValidBlock()) {
      //   console.log("F1", this.blocks[i]);
      //   return false;
      // }
      if (this.blocks[i].getPreviousHash() != this.blocks[i - 1].getHash()) {
        console.log("F2");
        return false;
      }
    }
    return true;
  }

  getLatestHash() {
    return this.blocks[this.blocks.length - 1].getHash();
  }

  generateNewBlock(votes, previousHash, count) {
    var block = new Block({
      timestamp: Date.now(),
      votes: votes,
      previousHash: previousHash,
      count: count,
    });
    block.generateCounts();
    block.generateHash();
    return block;
  }

  addNewBlockToChain(votes, count) {
    this.blocks.push(this.generateNewBlock(votes, this.getLatestHash(), count));
    // return true;
    if (this.proofOfWork()) {
      console.log("Success");
      return true;
    } else {
      console.log("F");
      this.blocks = this.blocks.slice(0, this.blocks.length - 1);
      return false;
    }
  }

  getTotalVotesCount() {
    return this.blocks[this.blocks.length - 1].getCounts();
  }
}

// ============== BLOCK VERIFY CHECK ==========

// const a = new BlockChain({ genesis: null, blocks: null });

// a.addNewBlockToChain(
//   [
//     new Vote({ from: "b", to: "a", timestamp: Date.now() }),
//     new Vote({ from: "d", to: "c", timestamp: Date.now() }),
//   ],
//   a.getTotalVotesCount()
// );

// a.addNewBlockToChain(
//   [new Vote({ from: "g", to: "a", timestamp: Date.now() })],
//   a.getTotalVotesCount()
// );

// console.log(a, a.blocks[2].votes);

// fs.writeFileSync("./a", JSON.stringify(a));

// var read = fs.readFileSync("./a");

// read = JSON.parse(read);

// var b = new BlockChain(read);

// console.log(b.getTotalVotesCount());

// b.addNewBlockToChain(
//   [new Vote({ from: "f", to: "a", timestamp: Date.now() })],
//   b.getTotalVotesCount()
// );

// console.log(b.getTotalVotesCount());

// fs.writeFileSync("./a", JSON.stringify(b));

// console.log(read.getTotalVotesCount());

// read.addNewBlockToChain(
//   [new Vote("f", "a", Date.now())],
//   read.getTotalVotesCount()
// );

// console.log(read.blocks[0] instanceof Block);

module.exports = {
  Block: Block,
  Vote: Vote,
  BlockChain: BlockChain,
};
