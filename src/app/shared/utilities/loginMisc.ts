import {SessionMisc} from './sessionMisc';
import notify from 'devextreme/ui/notify';
import {EncryptMisc} from '@MasUtilities/encryptMisc';
import {ObjectMisc} from '@MasUtilities/objectMisc';
import {AuthPerson, Person} from '@MasInterfaces/persons';

export abstract class LoginMisc {
  /** LOGGIN ***** */
  private static LoginKey() {
      if (EncryptMisc.hasEncryption()) {
          return btoa(EncryptMisc.encrypt(this.getCurrentUser()));
      } else {
          return btoa(JSON.stringify(this.getCurrentUser()));
      }
  }
  static isLoggedin(): boolean {
      let key: string;
      if (EncryptMisc.hasEncryption()) {
          key = EncryptMisc.decrypt(atob(SessionMisc.getSession('isLoggedin')));
          return ObjectMisc.areEquals(key, this.getCurrentUser());
      } else {
          const log = SessionMisc.getSession('isLoggedin');
          if (log === null) {
              return false;
          }
          key = atob(log);
          return ObjectMisc.areEquals(JSON.parse(key), this.getCurrentUser());
      }
  }

  static setLoggedin(): void {
      SessionMisc.setSession('isLoggedin', this.LoginKey());
  }

  static logOff(): void {
    sessionStorage.clear();
  }

  static logFail(err) {
      this.logOff();
      notify(err.statusText, 'error', 5000);
  }

  /** ** CURRENTUSER ***** */

  static setCurrentUser(value: any): void {
    SessionMisc.setSession('currentUser', value);
  }

  static getCurrentUser(): any {
      return SessionMisc.getSession('currentUser');
  }

  static getCurrentUserInfo(): AuthPerson {
    const {name, firstName, lastName, photoUrl, email} = this.getCurrentUser();
    return {name, firstName, lastName, photoUrl, email};
  }

  static getPersonInfo(): Person {
    const {firstName, lastName, email} = this.getCurrentUser();
    return {name: firstName, lastName, email};
  }

  static getCurrentUserID(): any {
    const crr = this.getCurrentUser() || {};
    return crr.id;
  }

  static getCurrentUserPhotoUrl(): any {
    const crr = this.getCurrentUser();
    return crr.photoUrl;
  }

  static getCurrentUserEmail(): any {
    const crr = this.getCurrentUser();
    return crr.email;
  }

  static  setIsAdmin(admin: boolean) {
    SessionMisc.setSession('isAdmin', admin);
  }

  static getIsAdmin(): any {
    // return SessionMisc.getSession('isAdmin');
    return this.isAppAdmin();
  }

  static setCurrentUserTokenID(idToken: string): void {
    SessionMisc.setSession('idToken', idToken);
  }

  static getCurrentUserTokenID(): string {
    return SessionMisc.getSession('idToken');
  }

  static setCurrentUserAuthToken(authToken: string): any {
    SessionMisc.setSession('authToken', authToken);
  }

  static getCurrentUserAuthToken(): any {
    return SessionMisc.getSession('authToken');
  }

  static setAppRoles(roles) {
    SessionMisc.setSession('appRoles', roles);
  }

  static getAppRoles() {
    return SessionMisc.getSession('appRoles');
  }

  static isAppAdmin() {
    const roles = this.getAppRoles();
    return roles.includes('admin');
  }

  /** ***** ** CURRENTUSER */
  /** ***** LOGGIN */
}
