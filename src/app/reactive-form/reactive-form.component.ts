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
    console.log(this.reactiveForm);
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

}
