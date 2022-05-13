# Decentraland Test Task

## Technologies

- NodeJS: LTS/Gallium
- React: 17.0.2
- Redux: 4.0.5
- Redux-Saga: 1.1.3
- Typescript: 4.2.4
- Jest: 26.6.3
- Ethers: 5.1.2
- Decentraland-UI: 3.1.3

## Project Setup

To run this project, install it locally using npm:

1. Copy the example environment file and fill the variables

```
cp .env.example .env
```

2. Install the npm dependencies

```
npm install
```

3. Start the project

```
npm start
```

You could use this deployed Dummy token in the Ropsten testnet:

```
REACT_APP_TOKEN_ADDRESS=0xA8a16e22ec7cEF817512f2F7AC08913177BA7e08
```

Deployer Private Key Wallet with Dummy token and ETH funds in Ropsten

```
ea4539c43abc282e07e46da4ae4e9c1ede18f7f762136beff237e7345d10aa18
```

or you could setup a local ethereum development environment and deploy the Dummy Token there, to do that [follow these instructions](https://github.com/decentraland/dummy-token#setup).

## Deployment

### Compiles and minifies for production

1. Compile the project

```
npm run build
```

2. Copy the folder `/dist` to your public webserver.

```
ex. Nginx: /usr/share/nginx/html
ex. Apache: /var/www/html
```

### Using Docker

1. Build the docker image

```
docker build --build-arg REACT_APP_TOKEN_ADDRESS=0xA8a16e22ec7cEF817512f2F7AC08913177BA7e08 . -t decentraland/webapp:latest
```

2. Start the docker image

```
docker run -p 80:80 -d decentraland/webapp:latest
```

## Testing

### Run your unit tests

```
npm run test
```

### Using Docker

```
docker run decentraland/webapp:latest npm run test
```

### Lint and fixes files

```
npm run lint
```
