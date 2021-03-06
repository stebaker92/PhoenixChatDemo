import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';
import {Car}                from '../models/car';
import {CarService}         from '../car.service';
import {SyncService} from "../sync.service";

@Component({
    selector: 'car-list',
    templateUrl: 'app/car-list/car-list.component.html',
    styleUrls: ['app/car-list/car-list.component.css']
})
export class CarListComponent implements OnInit {
    cars: Car[];
    selectedCar: Car;
    error: any;

    constructor(private router: Router, private carService: CarService, private syncService: SyncService) {
    }

    ngOnInit() {
        this.getCars();

        if (this.selectedCar) {
            this.syncService.updateContext("viewing " + this.selectedCar.name);
        } else {
            this.syncService.updateContext("on car search");
        }
    }

    getCars() {
        this.carService
            .getCars()
            .then(cars => this.cars = cars)
            .catch(error => this.error = error);
    }

    close(savedCar: Car) {
        if (savedCar) {
            this.getCars();
        }
    }

    onSelect(car: Car) {
        this.selectedCar = car;
        this.router.navigate(['/detail', this.selectedCar.id]);
    }
}
