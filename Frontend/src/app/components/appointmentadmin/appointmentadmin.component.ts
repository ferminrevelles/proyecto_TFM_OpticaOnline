import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointmentadmin',
  templateUrl: './appointmentadmin.component.html',
  styleUrls: ['./appointmentadmin.component.css']
})
export class AppointmentadminComponent implements OnInit {

  appointmentDaySelect:any=null;
  thereIsDate:boolean=false; // //Variable que comprueba si hay citas o no. En función de esto Mostrará la tabla o no.
  dateActualy:any;
  day:any= new FormControl();
  hoursString:any = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","18:00","18:30","19:00","19:30","20:00"];
  sortArray:any;

  constructor(
    private appointmentService: AppointmentService,
    private date: DateAdapter<Date>,) { 
      date.getFirstDayOfWeek = ()=>1;
    }

  ngOnInit(): void {
    const today = new Date();
    this.dateActualy = new Date(today.getFullYear(),today.getMonth(),today.getDate());  // Se crea la fecha actual sin horas que es como se guarda con el datapicker.
    this.day.value=this.dateActualy;
    this.appointmentService.readAppointment(this.dateActualy).subscribe(response=>{
      if (response.dataAppointment.hourAndUser.length!=0) {
        
        //ordenar Array de horas para mostrar la tabla ordenada.
        const collator = new Intl.Collator('es');
        this.sortArray = response.dataAppointment.hourAndUser.sort(SortArray);
        function SortArray(x:any,y:any){
          return collator.compare(x.hour,y.hour);
        }        

        this.appointmentDaySelect=response;
        this.thereIsDate=true;
      }  else this.thereIsDate=false;
    });

  }
  showAppointmentDay(){
    this.appointmentService.readAppointment(this.day.value).subscribe(response=>{
      if (response.dataAppointment.hourAndUser.length!=0) {
        this.appointmentDaySelect=response; // Muestra tabla si hay citas pedidas, si no muestra notificación
        this.thereIsDate=true;
      }  else this.thereIsDate=false;
    });
    }

    deleteAppointment(appointments:any){
      const delAppointment = {
        "day" : this.appointmentDaySelect.dataAppointment.appointment,
        "delHour": appointments.hour, 
      }

      this.appointmentService.modifyAppointment(delAppointment).subscribe(response=>{
        if (response.newAppointment.hourAndUser.length!=0) { // Muestra tabla si hay citas pedidas, si no muestra notificación
          //ordenar Array de horas para mostrar la tabla ordenada.
        const collator = new Intl.Collator('es');
        this.sortArray = response.newAppointment.hourAndUser.sort(SortArray);
        function SortArray(x:any,y:any){
          return collator.compare(x.hour,y.hour);
        }        
         this.appointmentDaySelect.dataAppointment=response.newAppointment;
          this.thereIsDate=true;
        }  else this.thereIsDate=false;

        this.appointmentService.deleteAppointmentUser(appointments.user.email).subscribe(response=>{
        },error=>{
          console.warn(error.responseText)
          console.log({ error })
        });
        
      },error=>{
       console.warn(error.responseText)
       console.log({ error })
      });
    }
}
