# ETH Blockchain Transactions

This application is meant to stream transactions on the blockchain in real time.

## Getting Started

* Requirements
* Technologies Stack.
* Installation
* API Documentation
* Testing

### Requirements

* Subscription to the following events via socket.io:
    * All events.
    * Only events where an address is either the sender or receiver.
    * Only events where an address is the sender.
    * Only events where an address is the receiver.
    * Assume that 1 ETH = $5,000 and send events within the ranges.
        * 0 - 100
        * 100 - 500
        * 500 - 2000
        * 2000 - 5000
        * Greater than 5000
* Authentication middleware for the socket.io API endpoints.
* Pooling of RPC connections.

### Technologies Stack

* Node.js/Typescript.
* Socket.io
* MySQL.
* TypeORM.
* TypeDi.

### Installation

#### Step 1: Clone the repository

```shell
git clone https://github.com/ayodeleoniosun/ethereum-transactions.git
```

#### Step 2: Switch to the repo folder

```shell
cd ethereum-transactions
```

#### Step 3: Setup environment variable

- Copy `.env.example` to `.env` i.e `cp .env.example .env`
- Update all the variables as needed

#### Step 4: Dockerize app

```bash
bash setup.sh
```

### API Documentation

The Postman API collection is locally available [Here](/docs/postman_collection.json). <br/>

### Testing

An end-to-end test and unit tests are written for the routes and services. <br/>

To run test, use the following command:

```bash
docker-compose exec app npm run test
```

