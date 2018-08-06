import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ElderlyClass } from '../../../domain/elderly.class';
import { CustomRegExp } from '../../../util/CustomRegExp';

@Component({
  selector: 'app-elderly-profile-form',
  templateUrl: './elderly-profile-form.component.html',
  styleUrls: ['./elderly-profile-form.component.css']
})
export class ElderlyProfileFormComponent implements OnInit {

  public readonly today: Date = new Date();
  public profileForm: FormGroup;
  private elderly: ElderlyClass;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.elderly = this.route.snapshot.data['user'] || new ElderlyClass();
    this.initForm();
  }

  private initForm() {
    this.profileForm = new FormGroup({
      'firstname': new FormControl(this.elderly.firstname, Validators.required),
      'lastname': new FormControl(this.elderly.lastname, Validators.required),
      'birthdate': new FormControl(this.elderly.birthdate),
      'address': new FormControl(this.elderly.address),
      'postalCode': new FormControl(this.elderly.postalCode, Validators.pattern(CustomRegExp.ZIPCODE)),
      'city': new FormControl(this.elderly.city),
      'phone': new FormControl(this.elderly.phone, Validators.pattern(CustomRegExp.PHONE))
    });
  }

}
