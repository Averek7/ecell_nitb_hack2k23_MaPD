# Problem

Supply chain management is a crucial aspect of business operations, as it helps companies
to track the movement of goods and services from raw material sourcing to the end
customer. However, the current supply chain management systems are fragmented, lack
transparency, and are vulnerable to fraud and counterfeiting, leading to inefficiencies and a
loss of trust between different stakeholders.

# Solution

We are using blockchain-based decentralised supply chain management system to
provide a secure, transparent, and tamper-proof record of transactions and traceability of
products throughout the supply chain. It aims to improve supply chain efficiency, reduce
costs, enhance transparency, increase trust among supply chain partners, and prevent
counterfeits and frauds. The decentralised nature of the system leads to improved collaboration, increased transparency, and reduced
operational costs for all participants.

# Project WorkFlow

1. Manufacturer registers the product on the mint page of the website by entering the details of the product (Title, Description, Image and Video).
2. The Video is uploaded using the livepeer and the video data is combined with all other product inormation and uploaded on IPFS network.
3. A QR is generated for all the information which is then minted as an nft using the manufaturers wallet.
4. Manufaturer of the project needs to print this QR Code and attach this to the product physically before shipping of the project.
5. Now whenever anyone scans this QR, he/she is redirected to a page where all the real time information about the product can be seen which includes the current owner of the product as well as the images or videos attached along the supply chain while shipping. It can be scanned using any QR code scanner being user-friendly.
6. At every level of the supply chain, whenever the product is transffered from one person to another, current owner needs to scan the QR code and trnsfer the nft to another person. In this way, all the past transactions about the product are recorded along with the nft information making it fully transparent in nature.
7. We can use the "Secure QR", which is a non-copieble QR code i.e it losts it data on reprinting/photocopying so that to avoid frauds like fake products selling, etc.  
   
# Quick Start for frontend

📄 Clone or fork this repo :`https://github.com/Prasang023/EthForAll_EthermionsV2.git`:

```sh
git clone https://github.com/Prasang023/EthForAll_EthermionsV2.git
```

💿 Install all dependencies:

```sh
npm install
```

🚴‍♂️ Run your App:

```sh
npm run dev
```

# Quick Start for Backend

📄 Clone or fork this repo :
`https://github.com/Prasang023/EthForAll_EthermionsV2.git`:

```sh
git clone https://github.com/Prasang023/EthForAll_EthermionsV2.git
```

💿 Install all dependencies:

```sh
cd server
npm install
```

🚴‍♂️ Run your App:

```sh
npm run dev
```

# What this App uses

### This App has four main parts 
- [`Frontend`](#Frontend)
- [`Backend`](#Backend)
- [`Blockchain`](#Blockchain)


# Frontend

We are using Next.JS for rendering the frontend of the project. The frontend is integrated with both the backend and blockchain.
We are using Redux-thunk along in javascript to make our webapp modular and easy to use. 

# Backend

At the `Backend` of this App , A `Nodejs` server is running, which manages all the `requests` and `responses` from the user. 

This App Uses Some Node_Modules in order to work properly which includes:
- `Mongoose`
  - To make requests from backend to MongoDB
- `dotenv`
    - To fetch a .env file from the backend into any file and use it as process.env.example
- `cors`
    - allows a server to indicate any origins other than its own from which a browser should permit loading resources.
- `Express`
  - create a web-server
  - handles request and response


# Blockchain

We chose polygon as the primary chain to deploy the smart contacts. This was due to polygons low gas fees and high supportibility. 
The Contract Address are:
1. nft contract : [0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd](https://mumbai.polygonscan.com/address/0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd#code)
1. Products Registry: [0x573e31dF36aCb997aAC134d26Ba69d8C09b6C995](https://mumbai.polygonscan.com/address/0x573e31dF36aCb997aAC134d26Ba69d8C09b6C995#code)

# Sponsors Used for making App
## Livepeer : 
We are using LivePeer for uploading videos of the product at every level of the supply chain and store the metaData about the video on IPFS. It is displayed on the product details page using Livepeer Player every time user scans the QR code attached to the product. 
## Arcana :
We are using Arcana integrated with rainbowKit for social media authentication and authentication via email address. 
## Polygon ID : 
We are using Polygon ID for authenticating and while we are trnsfering the nfts on the polygon chain.
## Polygon : 
The best L-2 Solution outthere. Polygon was our first choice to deploy the smart contract wherein the contracts were directy deployed to the testnet for testing and no local host testing took place. Here's the Contract address of the contract's used here:
1. NFT Contract - 0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd
2. Products Contract - 0x573e31dF36aCb997aAC134d26Ba69d8C09b6C995

# Where is this App deployed

`Frontend` 
- The frontend of this app is deployed on vercel :
https://eth-for-all-ethermions-v2-alpha.vercel.app/


`Backend`
- The Backend of this app is deployed on https://ethforall.onrender.com/