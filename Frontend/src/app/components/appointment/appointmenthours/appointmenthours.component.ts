import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointmenthours',
  templateUrl: './appointmenthours.component.html',
  styleUrls: ['./appointmenthours.component.css']
})
export class AppointmenthoursComponent implements OnInit {

  @Input() daySelect: any;
  hourId:any;
  hours:any = [true,true,true,true,true,true,true,true,true,true,true,true,true];
  hoursString:any = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","18:00","18:30","19:00","19:30","20:00"];
  hourSelect:boolean=false;
  
  constructor(
    private appointmentService :AppointmentService
  ) {
    //console.log(this.appointmentService.hours);
    this.appointmentService.hours.forEach((element:any) => {
      this.hours[element.hour-1] = false;
    });
    //console.log(this.hours);
   }

  ngOnInit(): void {
  }

  hour(hour:number){
    this.appointmentService.hourId=hour;
    this.hourId=hour;
    this.hourSelect=true;
    this.appointmentService.hourSelect=hour;    //Se guarda en el servicio la hora seleccionada.
  }
}
