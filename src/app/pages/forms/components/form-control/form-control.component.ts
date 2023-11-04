import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  firstName = new FormControl<string>('');


  lastName: string = '';

  // profileForm = new FormGroup({
  //   firstName: new FormControl<string>(''),
  //   lastName: new FormControl<string>(''),
  //   address: new FormGroup({
  //     street: new FormControl<string>(''),
  //     city: new FormControl<string>(''),
  //     state: new FormControl<string>(''),
  //     zip: new FormControl<string>('')
  //   })
  // });

  profileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
  });

  ngOnInit(): void {
    this.firstName.valueChanges.subscribe((data) => {
      if (data?.trim().toLowerCase() === 'dear') {
        this.firstName.setValue(``);
      }
      if (data!.trim().length > 0  && !data?.toLowerCase().includes('dear')) {
        this.firstName.setValue(`Dear ${data}`);
      }
    });

    this.profileForm.valueChanges.subscribe((data) => {
      // console.log(data);
    });

    this.profileForm.get('firstName')?.valueChanges.subscribe((data) => {
      console.log(data);
      if (data?.trim().toLowerCase() === 'general') {
        this.profileForm.get('firstName')!.patchValue('');
      }
      if (data!.trim().length > 0 && !data?.toLowerCase().includes('general')) {
        this.profileForm.get('firstName')!.setValue(`General ${data}`);
      }
    });

    this.profileForm.get('address.street')?.valueChanges.subscribe(value => {
      console.log('street address', value)
    })
  }

  get pf() {
    return this.profileForm.value;
  }

  profileSubmit(){
    console.warn(this.profileForm.value)
  }
}
