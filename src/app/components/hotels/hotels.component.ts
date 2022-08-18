import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { Hotel } from 'src/app/model/hotel';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  listHotels: Hotel[] | undefined;
  cities: City[] | undefined;
  error = null;
  title: string = '';
  citLink:number = 0;
  url:string = environment.host + "/hotelImage/";

  constructor(    private router: Router,
    private api: ApiService,) { }
  



  ngOnInit(): void {
    this.getAllHotels();
    this.getCities();
  }


  getByCities(id: number) {
    this.citLink = id;
    this.api.getByCities(id).subscribe({
      next: (data) => (this.listHotels = data, this.title = data[0].city.name),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getAllHotels() {
    this.citLink = 0;
    this.api.getHotels().subscribe({
      next: (data) => (this.listHotels = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.title = 'Toutes les formations';
  }
  getCities() {
    this.api.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
