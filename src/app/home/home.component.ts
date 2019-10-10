import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formObject: FormGroup;
  hid=true;

  constructor(private router: Router, private fb: FormBuilder) {
    this.formObject = this.fb.group({
      locate: new FormControl("", Validators.required),
      dateArrival: new FormControl(new Date().toISOString().substring(0,10),Validators.required)
    })
    
 }

  ngOnInit() {
 
  }
  // hids(){
  //   return this.hid;
  // }
onSucessSubmit(form: FormGroup){
this.hid=!this.hid;
}
}
