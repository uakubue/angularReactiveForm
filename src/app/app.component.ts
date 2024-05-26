import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'reactive-form';

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
