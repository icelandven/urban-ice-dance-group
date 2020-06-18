import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export abstract class StringMisc {
    /** STRINGS ***** */
    private static sanitizer: DomSanitizer;
    static setSanitizerInstance(sanitizer?: DomSanitizer) {
        if (!this.sanitizer && sanitizer) {
            this.sanitizer = sanitizer;
        }
    }
    static isString(val: any): boolean {
        return (typeof val === 'string' || val instanceof String);
    }

    static removeAccents(text: string): string {
        return text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
    }

    static StringToNumber(st: string): number {
        return parseInt(st, 10);
    }

    static Utf8Encode(st: string): string {
        // return this.b64._utf8_encode(st);
        // const sst = this.utf8.utf8decode(st);
        return st;
    }

    static isEmpty(text: string): boolean {
        return (text === '');
    }

    static bypassSecurityTrustUrl(text: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(text);
    }

    static multipleReplace(mapObj: any, str: string): string {
        const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
        str = str.replace(re, (matched) => {
            return mapObj[matched];
        });
        return str;
    }

    static uuid4() {
        const ho = (n, p) => n.toString(16).padStart(p, 0);
        const view = new DataView(new ArrayBuffer(16));
        crypto.getRandomValues(new Uint8Array(view.buffer));
      // tslint:disable-next-line:no-bitwise
        view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40);
      // tslint:disable-next-line:no-bitwise
        view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80);
        return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}
        -${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`;
    }

    static getFileExtension(file: string): string {
        const re = /(?:\.([^.]+))?$/;
        return re.exec(file)[1];
    }

    static getFileWithOutExtension(file: string): string {
        const re = /(?:\.([^.]+))?$/;
        const fullExt = re.exec(file)[0];
        return (file.split(fullExt))[0];
    }

    static strinUrlToObject(strUrl: string): any[] {
        const url = strUrl.split(';');
        const dirUrl = url.shift();
        const vars = {};
        url.forEach(data => {
            const dd = data.split('=');
            vars[dd[0]] = dd[1];
        });
        return [dirUrl, vars];
    }

    /** ***** STRINGS */

    static randomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}
