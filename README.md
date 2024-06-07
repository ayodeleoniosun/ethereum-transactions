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
* Socket.io.
* MySQL.
* TypeORM.
* TypeDi.
* Redis.

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

- Copy `.env.example` to `.env` i.e `cp .env.example .env` especially the jwt secret
- Update all the variables as needed

#### Step 4: Dockerize app

```bash
bash setup.sh
```

### API Documentation

The Postman API collection is locally available [Here](./src/docs/postman_collection.json). <br/>

### Socket.io connection between the server and client

The `client/index.html` must be launched and the port specified in `client/js/script.js` should be the same as the port
running on the docker container as shown below:

```
const socket = io('http://localhost:3001', {
    auth: {
        token: 'test_token'
    }
});
```

where `3001` is the container port and `test_token` should be updated with the jwt token retrieved from login endpoint.

Moreso, the port specified in `src/sockets/index.ts` must be the same as the `client` port as shown below:

```
const socketIo = new Server(server, {
    cors: {
        origin: ['http://localhost:63342', 'https://admin.socket.io'],
        credentials: true,
    }
});
```

where `63342` is the client port.

`https://admin.socket.io` is for displaying the different socket activities, where the server URL upon launching would
be `http://localhost:3001` where `3001` can be updated to the container port.

### Automated Testing

An end-to-end test and unit tests are written for the authentications as I couldn't complete the tests for ethereum and
streaming related tasks. <br/>

To run test, use the following command:

```bash
docker-compose exec app npm run test
```

