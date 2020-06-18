import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constGlobal} from '@MasConfig/global';
import {BackEndPoints} from '@MasConfig/backEndPoints';
import {SystemConfig} from '@MasConfig/systemConfig';

@Injectable()
export class AppConfig {
  constructor(private http: HttpClient) {}

  private static setGlobal({global = null}) {
    if (global) {
      constGlobal.appName = global.appName || constGlobal.appName;
      constGlobal.shortAppName = global.shortAppName || constGlobal.shortAppName;
      constGlobal.home = global.home || constGlobal.home;
      constGlobal.baseHref = global.baseHref || constGlobal.baseHref;
    }
  }

  private static setEndPoints({endPoints = null}) {
    if (endPoints) {
      // BackEndPoints.domain = endPoints.domain || BackEndPoints.domain;
    }
  }

  private static setSystemConfig({systemConfig = null}) {
    if (systemConfig) {
      SystemConfig.timeOut = systemConfig.timeOut || SystemConfig.timeOut;
      SystemConfig.retry = systemConfig.retry || SystemConfig.retry;
      SystemConfig.timeshow = systemConfig.timeshow || SystemConfig.timeshow;
      SystemConfig.dateFormat = systemConfig.dateFormat || SystemConfig.dateFormat;
      SystemConfig.dateTimeFormat = systemConfig.dateTimeFormat || SystemConfig.dateTimeFormat;
      SystemConfig.timeFormat = systemConfig.timeFormat || SystemConfig.timeFormat;
      SystemConfig.activeMods = systemConfig.activeMods || SystemConfig.activeMods;
    }
  }

  public async load() {
    const configEnv = await this.http.get(`${constGlobal.baseHref}assets/config/config.json`).toPromise() as any;
    if (configEnv) {
      AppConfig.setGlobal(configEnv);
      AppConfig.setEndPoints(configEnv);
      AppConfig.setSystemConfig(configEnv);
    }
  }
}

