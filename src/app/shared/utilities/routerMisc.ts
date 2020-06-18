import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {SessionMisc} from './sessionMisc';
import {ArrayMisc} from './arrayMisc';


export abstract class RouterMisc {
  /** Router ***** */
  private static router: Router;

  static setRouterInstance(router?: Router) {
    if (!this.router && router) {
      this.router = router;
    }
  }

  static getRerouteUrl(modulo: string, tipo: string, end?: any): string {
    if (this.router) {
      let url: string;
      const mod = modulo.toUpperCase();
      const tt = tipo.toUpperCase();
      const urlroute: string = this.router.url;
      if (urlroute.indexOf('/' + mod + '/') >= 0) {
        url = '/' + mod + 'R/' + tt + '/';
      } else if (urlroute.indexOf('/' + mod + 'R/') >= 0) {
        url = '/' + mod + '/' + tt + '/';
      }
      if (end) {
        url += end.toString();
      }
      return url;
    } else {
      return '/';
    }
  }

  static navigate(url: string) {
      this.router.navigate([url]);
  }
    static navigateKeys(url: string, keys: any) {
        this.router.navigate([url, keys]);
    }

    static navigateObj(obj: any) {
        this.router.navigate([obj]);
    }

  static navigateReroute(mod: string, type: string, end: string) {
      this.navigate(this.getRerouteUrl(mod, type, end));
  }

  static setDinamicDirUrl(mod: string, id: number): string {
    return '/SG/' + mod.toUpperCase() + '/' + id.toString();
  }

  static setCustomDirUrl(sys: string, mod: string): string {
    return '/ST/' + sys + '/' + mod;
  }

  static evalPerm(extra?: any): void {
    if (this.router) {
      let url: string = this.router.url;
      const sinDrouter = url.split('(');
      url = sinDrouter[0];
      if (url.indexOf(';') >= 0) {
        const surl = url.split(';');
        url = surl[0];
      }
      if (extra) {
        url = url.replace(extra, '');
      }
      if (url.indexOf('/SGR/') >= 0) {
        url = url.replace(/\/SGR\//, '/SG/');
      } else if (url.indexOf('/STR/') >= 0) {
        url = url.replace(/\/STR\//, '/ST/');
      }
      if (
        (
          url.indexOf('/SG/') >= 0
          || url.indexOf('/SGR/') >= 0
          || url.indexOf('/ST/') >= 0
          || url.indexOf('/STR/') >= 0
        )
        &&
        this.urlNotAllowed(url)
      ) {
        this.router.navigate(['/not-allowed']);
      }
    } else {
      this.router.navigate(['/not-allowed']);
    }
  }

  static getSegmentsRoute(route: string, params: any = {}, lista = false): (any | any)[] {
      const tree: UrlTree = this.router.parseUrl(route); // 'utilities/combinacionCorrespondencia'
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;
      const final: any[] = s.map(p => {
          return p.path;
      });
      if (lista) {
          return [...final, ...['Lista'], ...[params]];
      } else {
          return [...final, ...[params]];
      }
  }

    static getSegmentsRouteId(route: string, id: number, params: any = {}, lista = false): (any | any)[] {
        const tree: UrlTree = this.router.parseUrl(route); // 'utilities/combinacionCorrespondencia'
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        const final: any[] = s.map(p => {
            return p.path;
        });
        if (lista) {
            return [...final, ...[id.toString()], ...['Lista'], ...[params]];
        } else {
            return [...final, ...[id.toString()], ...[params]];
        }
    }
  /** ***** Router */

  /** Not Allowed PAGE ***** */
  static setNotAllowMen(men: string): void {
    SessionMisc.setSession('notallowedmen', men);
  }

  static getNotAllowMen(menset: string): string {
    let men: any = SessionMisc.getSession('notallowedmen');
    if (men !== null) {
      SessionMisc.deleteSession('notallowedmen');
    } else {
      men = menset;
    }
    return men;
  }
  /** ***** Not Allowed Page */

  /** Allowed URL ***** */
  static setAllowedUrl(url: any): void {
    SessionMisc.setSession('allowedurl', url);
  }

  static urlNotAllowed(url: string): boolean {
    const urlsAllowed = SessionMisc.getSession('allowedurl');
    let notA = true;
    if (urlsAllowed !== null) {
      notA = ArrayMisc.notInArray(urlsAllowed, url);
    }

    return notA;
  }
  /** ***** Allowed URL */

  static  getUrlParams(search: string, separator = ';'): any {
      const [domain, para] = search.split(separator);
      if (!para) {
          return {};
      }
      const hashes = para.split('&');
      // const hashes = search.slice(search.indexOf(separator) + 1).split('&');
      return hashes.reduce((params, hash) => {
          const [key, val] = hash.split('=');
          return Object.assign(params, {[key]: decodeURIComponent(val)});
      }, {});
  }
  static getUrlWithoutParams(search: string, separator = ';'): any {
    const url = search.split(separator);
    return url[0];
  }
}
