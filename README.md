# droptext

Web app to send encrypted text fast.

Uses Go & Gin for the server, MongoDB for the database and React for the client.

After submitting your text, it gets encrypted locally, and a private key is also generated locally. The encrypted contents are sent to the server. The server sends back an ID, which lets you can share your url that consists of the ID and the private key.

The server only knows the IDs and the encrypted contents. It cannot decrypt the text.

Demo: https://droptext.netlify.app/

## Usage
### Server
Navigate to the `server` directory. Copy `.env.example` to `.env` and change the parameters accordingly.

Install dependencies with `go get .`

Run with `go run .`

### Client
Navigate to the `client` directory. Copy `.env.example` to `.env` and change the parameters accordingly.

Install dependencies with `yarn install` (or npm if you prefer).

Run with `yarn start` and build with `yarn build` (or npm if you prefer).
