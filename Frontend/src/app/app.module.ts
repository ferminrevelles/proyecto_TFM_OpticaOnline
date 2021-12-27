import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StartComponent } from './components/start/start.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { WeusComponent } from './components/weus/weus.component';
import { ServComponent } from './components/serv/serv.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ModifyproductComponent } from './components/modifyproduct/modifyproduct.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShoptypeproductComponent } from './components/shop/shoptypeproduct/shoptypeproduct.component';
import { DetailproductComponent } from './components/shop/detailproduct/detailproduct.component';
import { SummaryshopComponent } from './components/shop/summaryshop/summaryshop.component';
import { ListproductsComponent } from './components/listproducts/listproducts.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ModifyorderComponent } from './components/modifyorder/modifyorder.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { UsersComponent } from './components/users/users.component';
import { ModifyuserComponent } from './components/modifyuser/modifyuser.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmenthoursComponent } from './components/appointment/appointmenthours/appointmenthours.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppointmentadminComponent } from './components/appointmentadmin/appointmentadmin.component';
import { RegisterComponent } from './components/register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    ContactComponent,
    CarouselComponent,
    FooterComponent,
    WeusComponent,
    ServComponent,
    SigninComponent,
    AdminComponent,
    CreateproductComponent,
    ModifyproductComponent,
    ShopComponent,
    ShoptypeproductComponent,
    DetailproductComponent,
    SummaryshopComponent,
    ListproductsComponent,
    OrdersComponent,
    ModifyorderComponent,
    CreateuserComponent,
    UsersComponent,
    ModifyuserComponent,
    AppointmentComponent,
    AppointmenthoursComponent,
    AppointmentadminComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    NgxMatFileInputModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    ContactService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
