import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Car} from './car';
@Injectable()
export class CarService {
    private carsUrl = 'app/cars.json';  // URL to web api
    constructor(private http: Http) {
    }

    getCars(): Promise<Car[]> {
        return this.http.get(this.carsUrl)
            .map(this.toCarArray)
            .toPromise();
    }

    getCar(id: number): Promise<Car> {
        return this.getCars()
            .then(cars => cars.find(car => car.id === id));
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    toCarArray(response: any): Car[] {
        return response.json().map((c)=> c);
    }

    toCar(r: any): Car {
        return r;
    }

}