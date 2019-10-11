import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProviderService } from '../api-provider.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formObject: FormGroup;
  hid=true;
  locations: any;
  constructor(private router: Router, private api: ApiProviderService,private fb: FormBuilder) {
    this.formObject = this.fb.group({
      locate: new FormControl(null, Validators.required),
      dateArrival: new FormControl(new Date().toISOString().substring(0,10),Validators.required)
    })
 }

  ngOnInit() {
 this.api.getLocation().subscribe(res=> this.locations = res)
  }
  
onSucessSubmit(form: FormGroup){
  if(this.formObject.invalid){
    this.hid=false;
      }
      else{
        let path = [
          'details',
          this.formObject.controls.locate.value,
          this.formObject.controls.dateArrival.value
        ];
  
        this.router.navigate(path);
      }
}
}
