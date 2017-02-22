import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {CarService} from "./car.service";
import {ChatService} from "./chat.service";
import {FileService} from "./file.service";
import {SyncService} from "./sync.service";
import {UserService} from "./user.service";
import {RouterModule} from "@angular/router";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {CarListComponent} from "./car-list/car-list.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat.component";
import {FormsModule} from "@angular/forms";
import {MessageComponent} from "./message.component";
import {HttpModule} from "@angular/http";
import {appRoutes} from "./app.routes";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule,
        RouterModule.forRoot(appRoutes)
    ],       // module dependencies
    declarations: [AppComponent, LogoutComponent, LoginComponent, ChatComponent, CarListComponent, MessageComponent, CarDetailComponent],   // components and directives
    bootstrap: [AppComponent],     // root component
    providers: [CarService, ChatService, FileService, SyncService, UserService,
        // provideRouter(appRoutes),
        {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {
}

