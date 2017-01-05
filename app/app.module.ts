import {NgModule, ElementRef}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {CarService} from "./car.service";
import {ChatService} from "./chat.service";
import {FileService} from "./file.service";
import {SyncService} from "./sync.service";
import {UserService} from "./user.service";
import {RouterModule, Routes} from "@angular/router";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {CarListComponent} from "./car-list/car-list.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat.component";
import {NgModel, FormsModule} from "@angular/forms";
import {MessageComponent} from "./message.component";
import {HttpModule} from "@angular/http";
import {appRoutes} from "./app.routes";
// import {appRoutes} from "./app.routes";
//
// const routes: Routes = [
//     {
//         path: 'login',
//         component: LoginComponent
//     },
//     {
//         path: 'logout',
//         component: LogoutComponent
//     },
//     {
//         path: '',
//         redirectTo: '/login',
//         pathMatch: 'full'
//     },
//     {
//         path: 'list',
//         component: CarListComponent
//     },
//     {
//         path: 'detail/:id',
//         component: CarDetailComponent
//     }
// ];
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule,
        RouterModule.forRoot(appRoutes)
    ],       // module dependencies
    declarations: [AppComponent, LogoutComponent, LoginComponent, ChatComponent, CarListComponent, MessageComponent, CarDetailComponent],   // components and directives
    bootstrap: [AppComponent],     // root component
    providers: [CarService, ChatService, FileService, SyncService, UserService]                    // services
})
export class AppModule {
}