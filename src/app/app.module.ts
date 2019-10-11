import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ApiProviderService } from './api-provider.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path:'',
          component:DetailsComponent
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'details/:location/:start_date',
          component: DetailsComponent
        }
      ], { useHash: false}
    )
  ],
  providers: [ApiProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
