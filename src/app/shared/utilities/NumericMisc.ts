export abstract class NumericMisc {
    static between(x, min, max) {
        return x >= min && x <= max;
    }

    static isNumber(n: any): boolean {
        return (n && !isNaN(n));
    }

    static getRandomNo(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
