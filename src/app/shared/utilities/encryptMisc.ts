import SimpleCrypto from 'simple-crypto-js';

export abstract class EncryptMisc {
    private static key: string;
    private static simpleCrypto: any;
    static setKey(key: string): void {
        if (key && key.length > 0) {
            this.key = key;
            this.simpleCrypto = new SimpleCrypto(this.key);
        }
    }
    static hasEncryption(): boolean {
        return (this.key && this.key.length > 0 && this.simpleCrypto);
    }
    static encrypt(data: any): string {
        if (this.hasEncryption() && data) {
            return this.simpleCrypto.encrypt(data);
        } else {
            return '';
        }
    }
    static decrypt(ciphered: string): any {
        if (this.hasEncryption() && ciphered && ciphered.length > 0) {
            let val: any = this.simpleCrypto.decrypt(ciphered);
            try {
                val = JSON.parse(val);
            } catch (e) {}
            return val;
        } else {
            return null;
        }
    }
    static generateKey() {
        return SimpleCrypto.generateRandom();
    }
}
