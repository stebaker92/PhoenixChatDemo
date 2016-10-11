import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Car}        from '../models/car';
import {CarService} from '../car.service';
import {SyncService} from "../sync.service";

@Component({
    selector: 'my-car-detail',
    templateUrl: 'app/car-detail/car-detail.component.html',
    styleUrls: ['app/car-detail/car-detail.component.css']
})

export class CarDetailComponent implements OnInit, OnDestroy {
    @Input() car: Car;
    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(private carService: CarService,
                private route: ActivatedRoute,
                private syncService: SyncService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.carService.getCar(id)
                    .then(car => {
                        this.car = car;
                        this.syncService.updateContext("Currently viewing :" + car.name);
                    });
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
        if (this.navigated) {
            window.history.back();
        }
    }
}
