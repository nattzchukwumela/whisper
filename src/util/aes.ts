import CryptoJS from "crypto-js";

const key = process.env.SECRET_KEY!;
class EncryptMessageString {
  private secretKey: string; // explicitly typed and private

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  // encrypt
  public encrypt(message: string): string {
    return CryptoJS.AES.encrypt(message, this.secretKey).toString();
  }

  // decryption
  public decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export { EncryptMessageString };
