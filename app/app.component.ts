import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { CarService }        from './car.service';
import { ChatService }        from './chat.service';
import './rxjs-extensions';
@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <!--<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>-->
      <!--<a [routerLink]="['/cars']" routerLinkActive="active">Cars</a>-->
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CarService, ChatService
    ]
})
export class AppComponent {
    title = 'Phoenix chat demo';
}
