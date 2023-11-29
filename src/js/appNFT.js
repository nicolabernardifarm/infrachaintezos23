window.addEventListener('load', async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Accounts now exposed
            window.web3 = web3;
            return App.init(window.ethereum);
        } catch (error) {
            console.error(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use MetaMask/Mist's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return App.init(window.web3.currentProvider);
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        window.web3 = web3;
        return App.init(provider);
    }
});

App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,

    init: function (provider) {
        App.web3Provider = provider;
        return App.initContract();
    },



    initContract: function () {
        $.getJSON("DwellingNFT.json", function (dnft) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.DwellingNFT = TruffleContract(dnft);
            // Connect provider to interact with contract
            App.contracts.DwellingNFT.setProvider(App.web3Provider);

            /*App.listenForEvents();*/

            return App.render();
        });
    },

    // Listen for events emitted from the contract
    listenForEvents: function() {
      App.contracts.DwellingNFT.deployed().then(function(instance) {
        // Restart Chrome if you are unable to receive this event
        // This is a known issue with Metamask
        // https://github.com/MetaMask/metamask-extension/issues/2393
        instance.MetadataUpdated({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("event triggered", event)
          // Reload when NFT's metadata are changed
          App.render();
        });
      });
    },

    render: function () {
        var dnftInstance;
        var loader = $("#loader");
        var content = $("#content");

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
                console.log(account);
            }
        });

        // Load contract data
        App.contracts.DwellingNFT.deployed().then(function (instance) {
            dnftInstance = instance;
            return dnftInstance.mint("Nicoca", "our first NFT", "https://ipfs.io/ipfs/QmYjreSANYBiFFzEy4NXKj8NjppS4Zzq5pkLG59DsEWNJy?filename=the-bear.png");
        }).then(function (data) {

            /*var candidatesResults = $("#candidatesResults");
            candidatesResults.empty();
      
            var candidatesSelect = $('#candidatesSelect');
            candidatesSelect.empty();*/

            console.log(data);
            $("#candidatesResults").html("<p>" + data + "</p>");

            /*for (var i = 1; i <= candidatesCount; i++) {
              electionInstance.candidates(i).then(function(candidate) {
                var id = candidate[0];
                var name = candidate[1];
                var voteCount = candidate[2];
      
                // Render candidate Result
                var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
                candidatesResults.append(candidateTemplate);
      
                // Render candidate ballot option
                var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
                candidatesSelect.append(candidateOption);
              });
            }*/

            //return electionInstance.voters(App.account);
            return dnftInstance.getMetadata();
        }).then(function(metadata){
            console.log(metadata);
            $("#candidatesResults").html("<p>" + metadata + "</p>");
        }).catch(function (error) {
            console.warn(error);
        });
    },

};