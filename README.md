# droptext

Web app to send encrypted text fast.

Uses Node.js & Express for the server, React for the client and levelup as a persistent key-value database.

After submitting your text, it gets encrypted locally, and a private key is also generated locally. The encrypted contents are sent to the server. The server sends back an ID, which lets you can share your url that consists of the ID and the private key.

The server only knows the IDs and the encrypted contents. It cannot decrypt the text.

Demo: https://droptext.netlify.app/

## Usage

In both the server and client directories, copy .env.example to .env and change the parameters accordingly.

To run the server/client execute `yarn start` (or npm) in the respective directory.

## Docker

A [docker image](https://hub.docker.com/r/reaperberri/droptext-server) is available for the server.

Expose the port you set the server to use (8080 by default).

## Different Servers

There are branches for a Rust server with Actix and Go with Gin.
