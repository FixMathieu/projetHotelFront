import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { Hotel } from 'src/app/model/hotel';
import { ApiService } from 'src/app/services/api.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  error = null;
  myForm: FormGroup;
  hotel: Hotel | undefined;
  displayForm: boolean = false;
  status: boolean = false;
  isAdmin: boolean = false;
  title: string = 'Ajouter un hotel';
  cities: City[] | undefined;
  city: City = new City(0, '');
  url: string = environment.host + '/hotelImage/';
  file: File | undefined;
  constructor( private authService: AuthentificationService,
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) { 
      this.myForm = this.formBuilder.group({
        id: [0, [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        phone:['', [Validators.required]],
        star:['', [Validators.required]],
        nbrRoom:['', [Validators.required]],
        price: ['', [Validators.required]],
        city: [null, Validators.required],
        image:['']
      });
    }

  ngOnInit(): void {
    if (this.authService.isAdmin) {
      this.getCities();
      let id = this.route.snapshot.params['id'];
      if (id > 0) {
        this.status = true;
        this.title = 'Modifier cette formation';
        this.api.getOneHotel(id).subscribe({
          next: (data) => {
            this.hotel = data;
            this.myForm.setValue({
              id: this.hotel.id,
              name: this.hotel.name,
              address: this.hotel.address,
              phone : this.hotel.phone,
              star : this.hotel.star,
              nbrRoom : this.hotel.nbrRoom,
              price: this.hotel.price,
              city: this.hotel.city.id,
              image: this.hotel.image
            });
          },
          error: (err) => (this.error = err),
        });
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onSaveHotel(myForm: FormGroup) {
    if (myForm.valid) {
      const hotelData = new FormData();
      hotelData.append('image', this.file as Blob);
      this.hotel = new Hotel(
        myForm.value.id,
        myForm.value.name,
        myForm.value.address,
        myForm.value.phone,
        myForm.value.star,
        myForm.value.nbrRoom,
        
        myForm.value.price,
        
        this.hotel != null ? myForm.value.image : '', 
        new City(myForm.value.city, '')
      );
      hotelData.append('hotel', JSON.stringify(this.hotel));
      console.log(this.hotel)
      if (this.status) {
        this.updateHotel(this.hotel.id, hotelData);
      } else {
        this.addHotel(hotelData);
      }
      console.log(hotelData)
    }
  }
  addHotel(hotelData:FormData) {
    this.api.add(hotelData).subscribe({
      next: (data) => console.log("ok"),
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin'),
    });
  }
  updateHotel(hotelId:number, hotelData:FormData) {
    this.api.update(hotelId, hotelData).subscribe({
      next: (data) => console.log(data),
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin'),
    });
  }
  getCities() {
    this.api.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
  getOneCity(id: number) {
    this.api.getOneCity(id).subscribe({
      next: (data) => (this.city = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
  public onFileChanged(event: any) {
    this.file = event.target.files[0];
  }
}
