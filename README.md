# droptext

Web app to send encrypted text fast.

Uses Rust & Actix for the server, MongoDB for the database and React for the client.

After submitting your text, it gets encrypted locally, and a private key is also generated locally. The encrypted contents are sent to the server. The server sends back an ID, which lets you can share your url that consists of the ID and the private key.

The server only knows the IDs and the encrypted contents. It cannot decrypt the text.

Demo: https://droptext.netlify.app/

## Usage

For both the server and the user, copy `.env.example` to `.env` and set the parameters to your needs.

### Server

Navigate to the `server` directory and run `cargo run` or `cargo run --release`

### Client

Navigate to the `client` directory and run `yarn install` and `yarn start` (or npm if you prefer).
In both the server and client directories, copy .env.example to .env and change the parameters accordingly.
