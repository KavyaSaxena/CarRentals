import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  constructor(public Http: HttpClient) {

   }
 getLocation(){
    return this.Http.get(environment.api+"311576ae-321a-43e3-9a5b-61b3ac373d85").pipe(map((res:any)=>{
      //stroing data on local storage so we need not to fetch again
      localStorage.setItem("data", JSON.stringify(res));
      const r = [];
      // extracted locations
      for(const loc of res){
        r.push(loc['location']);
      }
      return new Set(r);
    }));
 }
}
