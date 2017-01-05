// The usual bootstrapping imports
import {platformBrowserDynamic}      from '@angular/platform-browser-dynamic';
// import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent}         from './app.component';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {enableProdMode} from '@angular/core';
import {AppModule} from "./app.module";

enableProdMode(); // hide "expression has changed shit"
// bootstrap(AppComponent, [
//     appRouterProviders,
//     HTTP_PROVIDERS,
//     {provide: LocationStrategy, useClass: HashLocationStrategy},
//     // {provide: XHRBackend, useClass: InMemoryBackendService}, // in-mem server
//     // {provide: SEED_DATA, useClass: InMemoryDataService}      // in-mem server data
// ]);

platformBrowserDynamic().bootstrapModule(AppModule);
