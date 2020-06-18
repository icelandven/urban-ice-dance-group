import {Injector} from '@angular/core';

export function InjectorMisc(provider: any): any {
  const injector = Injector.create({providers: [{provide: provider, deps: []}]});
  return injector.get(provider);
}
