// The usual bootstrapping imports
import {bootstrap}      from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent}         from './app.component';
import {appRouterProviders}   from './app.routes';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {enableProdMode} from '@angular/core';

enableProdMode(); // hide "expression has changed shit"
bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {provide: XHRBackend, useClass: InMemoryBackendService}, // in-mem server
    // {provide: SEED_DATA, useClass: InMemoryDataService}      // in-mem server data
]);
