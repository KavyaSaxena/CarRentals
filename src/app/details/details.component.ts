import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiProviderService } from '../api-provider.service';
import { FiltersService } from '../filters/filters.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
   // Original extracted data
   cars_data: any; 
   loc:any;
   inputSearch="";
  input_location:any
  start_date:any
  transmission= ['Transmission','Manual', 'Automatic']
  transmit= this.transmission[0];
  cars=['Cars', 'Hatchback','SUV','Mini SUV', 'Sedan']
  type_of_car= this.cars[0]
  fuel=['Fuel','Petrol','Diesel']
  fuel_type= this.fuel[0]
  sort_by= ['Price: low to high','Price: high to low']
  sorts = this.sort_by[0]
  items: any[] = [];
  page = 1;
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiProviderService,
    private filters:FiltersService) {

    this.api.getLocation().subscribe(res => this.loc = res);

    this.input_location = this.route.snapshot.params['location'];
    console.log(this.input_location)
    this.start_date = this.route.snapshot.params['start_date'];
    this.refresh()
  }
  ngOnInit() {
  }
  refresh(){
    let path = ['details'];
    if (this.input_location && this.input_location.length > 0) {
      path = ['details', this.input_location, this.start_date];
    }
    this.router.navigate(path);

    // Fetch data
    // this.api.getDetailsFor(this.input_loc).subscribe((res) => {
    this.cars_data = JSON.parse(localStorage.getItem("data"));

    console.log(this.cars_data);
    for (const item of this.cars_data) {
      //intially make selected as false;
      item.selected = false;
    }
    this.filter()
  }
  filter() {

    this.items = this.filters.filter(this.cars_data, this.inputSearch, this.transmit, this.type_of_car,
       this.fuel_type, this.items,this.input_location,this.sorts,this.start_date);
 console.log(this.items);
  }

  //service for sorting the data
  sort() {
    this.items = this.filters.sort(this.items, this.sort_by, this.cars_data,this.start_date)
  }

  
  checkAvailability(item) {
    return this.filters.checkAvailability(item,this.start_date);
  }
}

