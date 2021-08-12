# droptext

Web app to send encrypted text fast.

Uses Node.js & Express for the server, React for the client and levelup as a persistent key-value database.

After submitting your text, it gets encrypted locally, and a private key is also generated locall. The encrypted contents are sent to the server. The server returns back an ID, and now you can share your url that consists of the ID and the private key.

The server only knows the IDs and the encrypted contents. It cannot decrypt the text.

Demo: https://droptext.netlify.app/
