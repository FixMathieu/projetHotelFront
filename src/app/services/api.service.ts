import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';

import { Hotel } from '../model/hotel';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  constructor(
    private http: HttpClient, private tokenSerive: TokenStorageService
  ) {
  }

  private authHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenSerive.getToken(),
  });


  //get all hotels from api
  public getHotels() {
    return this.http.get<Hotel[]>(environment.host + '/hotels');
  }

  //get hotel by id
  public getOneHotel(id: number) {
    return this.http.get<Hotel>(environment.host + '/hotel/' + id);
  }

  //add one hotel
  public add(hotelData: FormData) {
    return this.http.post<Hotel>(
      environment.host + '/hotels',
      hotelData,  {headers : this.authHeader}
    );
  }

  //delete
  public deleteHl(id: number) {
    return this.http.delete<Hotel>(environment.host + '/hotels/' + id, {headers : this.authHeader});
  }

  public update(id: number, hotelData: FormData) {
    return this.http.put<Hotel>(
      environment.host + '/hotel/' + id,
      hotelData,  {headers : this.authHeader}
    );
  }

  public getByCities(id: number) {
    return this.http.get<Hotel[]>(
      environment.host + '/city/' + id + '/hotels'
    );
  }

 

  public getCities() {
    return this.http.get<City[]>(environment.host + '/cities');
  }

  public getOneCity(id: number) {
    return this.http.get<City>(environment.host + '/city/' + id);
  }

  public getHotelImage(id: number) {
    return this.http.get(environment.host + '/hotelImage/' + id);
  }

  

 

}
