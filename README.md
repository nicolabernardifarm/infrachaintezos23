# FRT - Fund Reporting Tokenization
by Digiblock team - Infrachain Tezos Challenge 2023

## Slides of the pitch
You can access them [here](DIGIBLOCK.pdf).

## Organization of the code
Smart contracts are in the `contracts` folder. They have been deployed to
the local testnet provided, and now have the following addresses:
- FundNFT: `0x19bB9eE5E2BBCF56efCf35a8e0e0b4cB46dA3266`
- FundDataNFT: `0x92cfD520Fef2C95E22CC702e700f50f4Bb8747DB`
The front-end of the dApp is inside the folder `src`.

## Notes for running

Smart contract are deployed, the only thing you need to do is to run the dApp, which is nodejs based.

So execute (from the root folder)
- `npm run dev`

to launch the web user interface. 
You can access the web app at `localhost:3000`

In order for the application to work as intended, you need:
- Metamask extension installed in your browser
- the testnet configured in your metamask: **chainId** `128123`, **RPC endpoint** http://212.66.67.61:8545/ and **explorer** http://212.66.67.61:8545/
- an account on the testnet with a little amount of XTZ to pay for the transactions
 

