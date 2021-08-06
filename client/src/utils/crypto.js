import aes from "crypto-js/aes";
import { enc, lib } from "crypto-js";

export function generate(length) {
  return lib.WordArray.random(length).toString(enc.Base64);
}

export function encrypt(content, privateKeyLength = 15) {
  const privateKey = generate(privateKeyLength).replace("/", "_").replace("+", "-");

  return {
    encrypted: aes.encrypt(content, privateKey).toString(),
    privateKey,
  };
}

export function decrypt(ecrypted, privateKey) {
  const bytes = aes.decrypt(ecrypted, privateKey);
  const decrypted = bytes.toString(enc.Utf8);
  if (!decrypted.trim()) throw new Error("Wrong private key");
  return decrypted;
}
