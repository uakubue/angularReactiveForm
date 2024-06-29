import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.validator'


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit{

  title = 'reactiveForm';
  formData: any = {};
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email, CustomValidators.noSpaceAllowed]),
      username: new FormControl(null, Validators.required, CustomValidators.checkUserName ),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      skills: new FormArray([
        new FormControl(null, Validators.required),
        
      ]),
      experience: new FormArray([
            new FormGroup({
          company: new FormControl(null, Validators.required),
          position: new FormControl(null, Validators.required),
          totalExp: new FormControl(null, Validators.required),
          start: new FormControl(null, Validators.required),
          end: new FormControl(null, Validators.required),
        })
      ])
    })

    // this.reactiveForm.get('firstname').valueChanges.subscribe((value) => {
    //   console.log(value)
    // })

    // this.reactiveForm.valueChanges.subscribe((data) => {
    //   console.log(data);
    // })

    this.reactiveForm.get('email').statusChanges.subscribe((value) => {
      console.log(value);
    })

    this.reactiveForm.get('username').statusChanges.subscribe((value) => {
      console.log(value);
    })
  }

  

  onFormSubmitted(){
    console.log(this.reactiveForm.value);
    this.formData = this.reactiveForm.value;
  } 

  AddSkills(){
    (<FormArray>this.reactiveForm.get('skills'))
    .push(new FormControl(null, Validators.required));
  }

  deleteSkill(index: number){
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  addExperience(){
    const frmGroup = new FormGroup({
      company: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      totalExp: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);


  }

  delExp(index: number){
    const deleteExp = <FormArray>this.reactiveForm.get('experience');
    deleteExp.removeAt(index)
  }

  generateUsername(){
    let username = "";

    const Fname: string = this.reactiveForm.get('firstname').value;
    const Lname: string = this.reactiveForm.get('lastname').value;
    const dateOB: string = this.reactiveForm.get('dob').value;

    if(Fname.length >= 3){
      username += Fname.slice(0, 3);
    }else{
      username += Fname;
    }

    if(Lname.length >= 3){
      username += Lname.slice(0, 3);
    }else{
      username += Lname;
    }

    let dateTime = new Date(dateOB);
    username += dateTime.getFullYear();

    username = username.toLowerCase();

    //console.log(username)

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // })

    // this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username: username
    })

  }

}
