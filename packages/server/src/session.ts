import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
export const secret = crypto.randomBytes(32);

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();

interface Cookie {
  id: number | bigint;
  token: string;
}

export function encrypt(data: Cookie) {
  const text = JSON.stringify(data);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
export function decrypt(encryptedText: string): Cookie {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}
