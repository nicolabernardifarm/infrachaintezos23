var HDWalletProvider = require("@truffle/hdwallet-provider");
//load single private key as string
var provider = new HDWalletProvider("22aae6e36021acbf8d4a05a169d77919929d390dab212c609c319ea99c4dd298", "http://localhost:8545");


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1993",
      from: "b97c8bb676df1a1bd1ae5860a17d68c390ad2ccd",
      provider: provider
    }
  },
  compilers:{
    solc:{
      version: "0.6.2"
    }
  }
};
