import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }
  filter(data:any,query_input,trans_type_input,car_type_input,fuel_type_input,items,input_loc,sort_type,date) {
   console.log(query_input)
   console.log(trans_type_input)
   console.log(data)


    let newItems: any[] = [...data];
    if (query_input && query_input.length > 1) {
 
      const query = query_input.trim().toLowerCase();
      //filter by car name
      newItems = newItems.filter(x => x['name'].toLowerCase().indexOf(query) > -1);
      if(newItems.length==0){

        newItems= [...data];
        //filter by car type
        newItems = newItems.filter(x => x['car_Type'].toLowerCase().indexOf(query) > -1);
      }
     
    }

    if (trans_type_input && trans_type_input !== "Transmission") {
      //filter by transition type

      newItems = newItems.filter(x => x['transmission'] === trans_type_input);
    }

    if (car_type_input && car_type_input !== "Cars") {
      //filter by car type

      newItems = newItems.filter(x => x['car_Type'] === car_type_input);
    }

    if (fuel_type_input && fuel_type_input !== "Fuel") {
      //fuel type filter

      newItems = newItems.filter(x => x['fuel_Type'] === fuel_type_input);
    }

    if (input_loc) {

      //location filter
      newItems = newItems.filter(x => x['location'] === input_loc);
    }


    items.length = 0;
    items.push(...newItems);
    console.log(items)
    //sort data by the type;
    this.sort(items,sort_type,items,date);
    console.log(items);
    return items;
  }

  sort_by = [ 'Price: Low to High', 'Price: High to Low'];
  sort(items,sort_type,data,date){
    if (sort_type) {
      switch (sort_type) {
        case this.sort_by[0]:
          items.sort((x: any, y: any) => {
            const temp1 = x['price'];
            const temp2 = y['price'];

            if (temp1 > temp2) {
              return 1;
            }
            if (temp1 < temp2) {
              return -1;
            }
            return 0;
          });
          break;

        case this.sort_by[1]:
          items.sort((x: any, y: any) => {
            const temp1 = x['price'];
            const temp2 = y['price'];

            if (temp1 > temp2) {
              return -1;
            }
            if (temp1 < temp2) {
              return 1;
            }
            return 0;
          });
          break;

        default:
          break;
          
      }
    }

    items.sort((x: any, y: any) => {
      const temp1 = +this.checkAvailability(x,date);
      const temp2 = +this.checkAvailability(y,date);

      if (temp1 > temp2) {
        return -1;
      }
      if (temp1 < temp2) {
        return 1;
      }
      return 0;
    });
  return items;
  
  }

  checkAvailability(item,date) {
    //short form of the day of selected date
    let day = (new Date(date)).toLocaleDateString('en', { weekday: 'short' }).toLowerCase();
    //check if there is matching day with the given day of a date
    if (item && item['availability'] && item['availability'].toLowerCase().indexOf(day) > -1) {
      return true;
    }
    return false;
  }
}
