import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppointmentService } from '../../services/appointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})

export class AppointmentComponent {

  selected: Date | null =null;
  minDate: Date;
  day= new FormControl();
  selectDay:any;  //Contiene la fecha del calendario seleccionada para posteriormente mostrar las fechas.
  selectCreateDay:any=true; // Mostrar elementos de pedir cita
  selectDelDay:any=true; //Mostrar elementos de anular cita
  selectDelDayHour:any=false; //Ocultar el formulario de anular cita
  submitted = false;
  hoursString:any = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","18:00","18:30","19:00","19:30","20:00"];
  spinner:boolean=false;

  //datos a mostrar con el Model
  confirmDay:any;
  confirmHour:any;

  //Datos Model delete Cita
  infoDeleteAppointment:String="";
  infoCreateAppointment:String="";
  
  createAppointment = this.formBuilder.group({
    name:['',Validators.required],
    email: ['', [Validators.email, Validators.required]],
    telf: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(9),Validators.maxLength(9)]],
  });

  deleteAppointment = this.formBuilder.group({
    name:['',Validators.required],
    email: ['', [Validators.email, Validators.required]],
    telf: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(9),Validators.maxLength(9)]],
    delHour:['',Validators.required],
  });

  constructor(
    date: DateAdapter<Date>,
    public appointmentService :AppointmentService,
    private formBuilder:FormBuilder,
    private router: Router
    ) {
    date.getFirstDayOfWeek = ()=>1;

    const today = new Date().getFullYear();
    this.minDate = new Date();  //Para no poder crear citas con fecha anteriores al día actual
   }

   showHours(){   //Solicitud de las horas disponibles para ese día.
    this.spinner=true;
    this.selectDay=null;  //Borra las horas antiguas para mostrar las nuevas.
    this.selectDelDay=false; // Elimina la opción de seleccionar día para anular cita.
     this.appointmentService.readAppointment(this.day.value).subscribe(response=>{
      // console.log(response);
      this.spinner=false;
      this.selectDay = response.dataAppointment;
      //console.log(this.selectDay);
     },error=>{
      console.warn(error.responseText)
      console.log({ error })
     })

   }
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !==6 && day!==0;
  };

  modal(){
    this.confirmDay=this.selectDay.appointment;
    this.confirmHour=this.hoursString[this.appointmentService.hourId];
    
  }

  onSubmitCreate(createAppointment:any) { 
    this.selectDelDay=true;
    var userWithAppointment:any;

    this.appointmentService.readAppointmentUser(createAppointment.email).subscribe(response=>{  // Se comprueba si el usuario tiene cita. Si tiene no se la asigna.
      userWithAppointment = response.appointmentExists.find((element:any) =>  element.appointmentUser==createAppointment.email);

      if(userWithAppointment==undefined){   // Si no encuentra el email de usuario que pidió la cita, la creará si lo encuentra no creará la cita.
        const dataAppointment={ //Se monta el dato para volcarlo a la BBDD
          hour: this.appointmentService.hourSelect+1,
          user: createAppointment
        }
  
        this.selectDay.hourAndUser.push(dataAppointment);
        //console.log(this.selectDay);
  
        this.appointmentService.createAppointment(this.selectDay).subscribe(response=>{  // modifica la cita con los datos actuales.
        //  console.log(response);
          
          this.appointmentService.createAppointmentUser({"appointmentUser":createAppointment.email}).subscribe(response=>{
          //  console.log(response);
          },error=>{
            console.warn(error.responseText)
            console.log({ error });
          });

          this.infoCreateAppointment="La cita se ha creado correctamente. Recuerde que para anular la cita tendrá que introducir los mismos datos que ha introducido para solicitarla."
          // Inicializan los datos de formulario.
          this.selectDay=null;
          this.appointmentService.hourSelect=null;
          this.day=new FormControl();
          this.createAppointment = this.formBuilder.group({
            name:['',Validators.required],
            email: ['', [Validators.email, Validators.required]],
            telf: ['', Validators.required],
          });
        },error=>{
          console.warn(error.responseText)
          console.log({ error });
        });
      }else{    // El usuario tiene cita
        this.infoCreateAppointment="La cita no es ha creado. El usuario 'email' con el que intenta solicitar la nueva cita ya tiene una cita anterior asignada. Debe anular la cita anterior para solicitar una nueva cita.";
        // Inicializan los datos de formulario.
        this.selectDay=null;
        this.appointmentService.hourSelect=null;
        this.day=new FormControl();
        this.createAppointment = this.formBuilder.group({
          name:['',Validators.required],
          email: ['', [Validators.email, Validators.required]],
          telf: ['', Validators.required],
        });
        console.log("Usuario tiene cita");
      }

    },error=>{
      console.warn(error.responseText)
      console.log({ error });
    });
  }

  getErrorMessageEmail() {
    if (this.createAppointment.value.email=="") {
          return 'You must enter a value';
        }
          return 'Not a valid email';
      }
  getErrorMessageTelf() {
    if (this.createAppointment.value.telf=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }
  getErrorMessageName() {
    if (this.createAppointment.value.name=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }
      
  // Métodos para anular cita.
  showFormDel(){
    this.selectCreateDay=false;  //Borra las horas antiguas para mostrar las nuevas.
    this.selectDelDay=true; // Elimina la opción de seleccionar día para anular cita.
    this.selectDelDayHour=true; //Muestra el formulario para anular la cita.
  }

  onSubmitDelete(deleteAppointment:any) { 
    const dataUser = {
      "name" : deleteAppointment.name,
      "email": deleteAppointment.email,     
      "telf" : deleteAppointment.telf,
    }
    var hourOfDay:any;
    deleteAppointment.delHour = this.hoursString.indexOf(deleteAppointment.delHour)+1;  //Sacar el ordinal de hora que es como está guardado en la BD
    deleteAppointment.day = this.day.value;
    this.appointmentService.readAppointment(this.day.value).subscribe(response=>{
      hourOfDay = response.dataAppointment.hourAndUser;
      hourOfDay.forEach((element:any)=>{
        if (element.hour == deleteAppointment.delHour){
          if (JSON.stringify(element.user) == JSON.stringify(dataUser)) {  //Si día, usuario y hora coincide se pasa a borrar cita.
            console.log("Usuario encontrado y hora");
            this.appointmentService.modifyAppointment(deleteAppointment).subscribe(response=>{

              this.appointmentService.deleteAppointmentUser(deleteAppointment.email).subscribe(response=>{
                console.log(response);
              },error=>{
                console.warn(error.responseText)
                console.log({ error })
              });
              this.infoDeleteAppointment="La cita se anulado correctamente.\n Ahora puede solicitar otra cita";
              this.selectCreateDay=true; // Mostrar elementos de pedir cita
              this.selectDelDayHour=false; //Muestra el formulario para anular la cita.
              this.selectDay=null;
              this.appointmentService.hourSelect=null;
              this.day=new FormControl();
              this.deleteAppointment = this.formBuilder.group({
                name:['',Validators.required],
                email: ['', [Validators.email, Validators.required]],
                telf: ['', Validators.required],
                delHour:['',Validators.required],
              });
            },error=>{
             console.warn(error.responseText)
             console.log({ error })
            });
          }
        }else {
          this.infoDeleteAppointment="No existen citas asignadas para los datos introducidos. No se ha borrado la cita";
          console.log("No hay citas para esa hora");  //Crear modal para indicar que no hay citas.
        }
      })  
    },error=>{
     console.warn(error.responseText)
     console.log({ error })
    })
  }
}

