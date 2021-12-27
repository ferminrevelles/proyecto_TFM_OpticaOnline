import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { faMapMarkedAlt, faBuilding, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService],
})
export class ContactComponent implements OnInit {
  
  faMapMarkedAlt = faMapMarkedAlt;    //Variables para iconos
  faBuilding = faBuilding;  //Variables para iconos
  faPhone = faPhoneAlt; //Variables para iconos

  submitted = false;
  errorLogin = false;
  msgSend:boolean=false;
  showFormContact:boolean=true;

  constructor(
    private formBuilder: FormBuilder,
    private contact: ContactService,
    private router: Router
  ) { }

  contactForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    comment: ['', Validators.required]
  });
 

  ngOnInit(): void {
  }

  onSubmit(contactForm:any) {
    this.contact.PostMessage(contactForm).subscribe(response => {
    this.msgSend=true;
    this.showFormContact=false;
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
  }

  back(){
    this.router.navigate(['/']);
  }

  getErrorMessageName() {
    if (this.contactForm.value.name=="") {
          return 'You must enter a name';
        }
          return 'Not a valid name';
      }

  getErrorMessageSurname() {
    if (this.contactForm.value.surname=="") {
          return 'You must enter a surname';
        }
          return 'Not a valid surname';
      }

  getErrorMessageEmail() {
  if (this.contactForm.value.email=="") {
        return 'You must enter a valid email';
      }
        return 'Not a valid email';
    }
    getErrorMessagePhone() {
      if (this.contactForm.value.phone=="") {
            return 'You must enter a phone';
          }
        return "Value must be nine number";
      }

  getErrorMessageComment() {
    if (this.contactForm.value.comment=="") {
          return 'You must enter a comment';
        }
      return "You must enter a comment";
    }


}
