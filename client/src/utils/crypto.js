import aes from "crypto-js/aes";
import { enc, lib } from "crypto-js";

export function generate(length) {
  return lib.WordArray.random(length).toString(enc.Base64).replace("/", "_").replace("+", "-");
}

export function encrypt(content, length = 15) {
  const privateKey = generate(length);

  return {
    ecnrypted: aes.encrypt(content, privateKey).toString(),
    privateKey,
  };
}

export function decrypt(ecrypted, privateKey) {
  const bytes = aes.decrypt(ecrypted, privateKey);
  const decrypted = bytes.toString(enc.Utf8);
  if (!decrypted.trim()) throw new Error("Wrong private key");
  return decrypted;
}
