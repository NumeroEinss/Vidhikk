import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private key = "JhimtapakdUmum";

  constructor() { }

  encryptData(data: string): string {

    return CryptoJS.AES.encrypt(data, this.key).toString();

  }

  decryptData(data: string): string {

    const bytes = CryptoJS.AES.decrypt(data, this.key);

    return bytes.toString(CryptoJS.enc.Utf8);

  }
}
