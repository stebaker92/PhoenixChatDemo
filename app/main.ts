// The usual bootstrapping imports
import {platformBrowserDynamic}      from '@angular/platform-browser-dynamic';

import {enableProdMode} from '@angular/core';
import {AppModule} from "./app.module";

enableProdMode(); // hide "expression has changed shit"

platformBrowserDynamic().bootstrapModule(AppModule);
