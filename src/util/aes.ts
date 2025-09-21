import CryptoJS from "crypto-js";

class EncryptMessageString {
  private secretKey: string; // explicitly typed and private

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  public encrypt(message: string): string {
    return CryptoJS.AES.encrypt(message, this.secretKey).toString();
  }

  public decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

// ✅ Example usage:
const crypto = new EncryptMessageString("my_secret_key");

const encrypted = crypto.encrypt("Hello Whisper!");
console.log("Encrypted:", encrypted);

const decrypted = crypto.decrypt(encrypted);
console.log("Decrypted:", decrypted);
