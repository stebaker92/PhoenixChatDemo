import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car }        from './car';
import { CarService } from './car.service';
import {ChatComponent} from "./chat.component";
@Component({
    selector: 'my-car-detail',
    templateUrl: 'app/car-detail.component.html',
    styleUrls: ['app/car-detail.component.css'],
    directives: [ChatComponent]
})
export class CarDetailComponent implements OnInit, OnDestroy {
    @Input() car: Car;
    error: any;
    sub: any;
    navigated = false; // true if navigated here
    constructor(
        private carService: CarService,
        private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.carService.getCar(id)
                    .then(car => this.car = car);
            } else {
                this.navigated = false;
                this.car = new Car();
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    goBack() {
        if (this.navigated) { window.history.back(); }
    }
}
