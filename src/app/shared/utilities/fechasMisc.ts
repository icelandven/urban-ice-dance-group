export abstract class FechasMisc {
  /** FECHAS ***** */

  static toDate(DateOri, RemoveHour?): any {
    let DateObj = DateOri;
    if (DateOri) {
      try {
        const isDate = (typeof DateObj.getMonth === 'function');
        if (!isDate) {
          const part = DateObj.split('.');
          DateObj = Date.parse(part[0]);
        }
        if (RemoveHour) {
          DateObj.setHours(0, 0, 0, 0);
        }
        return DateObj;
      } catch (e) {
      }
    }
    return null;
  }

  static unsetTimeZero(time: string): string {
    return time ? time.replace( /0001-01-01T00:00:00\.0000000/, '') : '';
  }

  static unsetAnytimeZero(set: any): any {
    Object.keys(set).forEach(prop => {
      if (set[prop] === '0001-01-01T00:00:00.0000000') {
        set[prop] = this.unsetTimeZero(set[prop]);
      }
    });
    return set;
  }

  static unsetArrayTimeZero(set: any[]): any[] {
    const final: any[] = [];
    for (let s of set) {
      s = this.unsetAnytimeZero(s);
      final.push(s);
    }
    return final;
  }

  static isWeekend(date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  static isToday(date): boolean {
    const today = new Date();
    return (date === today);
  }

  static toDateFromString(stDate: string): Date {
    return new Date(stDate);
  }

  static isValidDate(input) {
    return typeof input.getMonth === 'function';
  }

  static joinObj(obj, seperator) {
    /*const out = [];
    for (k in obj) {
      out.push(k);
    }*/
    const out = Object.keys(obj);
    return out.join(seperator);
  }

  static getDateObj(inDate: Date, meridian = false): any {
    const hour = inDate.getHours();
    return {
      M: inDate.getMonth() + 1,
      d: inDate.getDate(),
      D: inDate.getDate(),
      h: hour > 12 ? hour - 12 : hour,
      m: inDate.getMinutes(),
      s: inDate.getSeconds(),
      y: inDate.getFullYear(),
      Y: inDate.getFullYear(),
      a: meridian ? (hour >= 12 ? 'PM' : 'AM') : null,
    };
  }

  static DateToStringFormat(inDate, formatString) {

    if (!this.isValidDate(inDate)) {
      inDate = new Date(inDate);
    }

    const isM = formatString.includes('a');

    const dateObject = this.getDateObj(inDate, isM);

    const dateMatchRegex = this.joinObj(dateObject, '+|') + '+';
    const regEx = new RegExp(dateMatchRegex, 'g');
    let tokenLength;
    formatString = formatString.replace(regEx, formatToken => {
      const datePartValue = dateObject[formatToken.slice(-1)];
      tokenLength = formatToken.length;

      if (formatToken.indexOf('y') < 0 && formatToken.indexOf('Y') < 0) {
        // Expand single digit format token 'd' to multi digit value '10' when needed
        tokenLength = Math.max(formatToken.length, datePartValue.toString().length);
      }
      const zeroPad = (datePartValue.toString().length < formatToken.length ? '0'.repeat(tokenLength) : '');
      return (zeroPad + datePartValue).slice(-tokenLength);
    });

    return formatString;
  }

  /**
   * Genera una cadena en formato ISO a partir del objeto de fecha especificado
   * @param  date Objeto de fecha a procesar
   * @param  [dateOnly] Opcional. Indica si la cadena debe contener la hora o no
   * @return  Cadena en formato ISO con la fecha especificada
   */
  static dateAsISOString(date: Date, dateOnly?: boolean): string {

      if (!date) { return null; }

      const td = (n) => `0${n}`.slice(-2);

      return `${date.getFullYear()}-${td(date.getMonth() + 1)}-${td(date.getDate())}`
          + (dateOnly ? ''
          : `T${td(date.getHours())}:${td(date.getMinutes())}:${td(date.getSeconds())}`);
  }
  /** ***** FECHAS */

  static stringTimeToDateWithFormat(strDate: string): Date {
    if (!strDate) {
      return null;
    }
    let mdtype = 24;
    let md = '';
    if (strDate.includes('am') || strDate.includes('pm')) {
      mdtype = 12;
      const sttd = strDate.split(' ');
      strDate = sttd[0];
      md = sttd[1];
    }
    const newStr = strDate.split(':');
    let hh = +newStr[0];
    const mm = +newStr[1];
    const ss = +newStr[2];
    if (mdtype === 12 && hh === 12 && md === 'am') {
      hh = 0;
    } else if (mdtype === 12 && hh !== 12 && md === 'pm') {
      hh = hh + 12;
    }
    const ndd = new Date();
    if ((Number.isNaN(hh) || hh === 0) && Number.isNaN(mm) && Number.isNaN(ss)) {
      return null;
    }
    return new Date(ndd.getFullYear(), ndd.getMonth(), ndd.getDate(), hh, mm, ss);
  }
}
