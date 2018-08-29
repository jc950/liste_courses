import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CaregiverClass } from '../../domain/caregiver.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomRegExp } from '../../util/CustomRegExp';
import { CaregiverService } from '../../services/caregiver.service';
import { ElderlyClass } from '../../domain/elderly.class';
import { HeaderService } from '../../services/header.services';

@Component({
  selector: 'app-caregiver-form',
  templateUrl: './caregiver-form.component.html',
  styleUrls: ['./caregiver-form.component.css']
})
export class CaregiverFormComponent implements OnInit, Deactivable {

  public elderly: ElderlyClass;
  public caregiverForm: FormGroup;

  constructor(
    private caregiverService: CaregiverService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private location: Location
  ) {
    this.elderly = this.route.snapshot.data['elderly'] || new ElderlyClass();
  }

  ngOnInit() {
    console.log(this.elderly)
    this.caregiverForm = new FormGroup({
      'firstname': new FormControl(this.elderly.caregivers.firstname, Validators.required),
      'lastname': new FormControl(this.elderly.caregivers.lastname, Validators.required),
      'address': new FormControl(this.elderly.caregivers.address),
      'postalCode': new FormControl(this.elderly.caregivers.postalCode, Validators.pattern(CustomRegExp.ZIPCODE)),
      'email': new FormControl(this.elderly.caregivers.email),
      'phone': new FormControl(this.elderly.caregivers.phone)
    });

    this.headerService.doReturn = () => {
      this.location.back();
    };
    this.headerService.showHome = true;
    this.headerService.showProfile = true;
    this.headerService.elderlyId = this.elderly.id;
  }

  canDeactivate(): boolean {
    return !this.caregiverForm || this.caregiverForm.pristine;
  }

  public submitForm(value) {
    Object.assign(this.elderly.caregivers, new CaregiverClass(value));

    if (this.elderly.caregivers.id) {
      this.caregiverService.update(this.elderly.caregivers).subscribe(res => {
        this.elderly.caregivers = res;
        this.caregiverForm.markAsPristine();
        this.router.navigate(['../caregiver-availability'], { relativeTo: this.route });
      });
    }
    else {
      this.caregiverService.create(this.elderly.id, this.elderly.caregivers).subscribe(res => {
        this.elderly.caregivers = res;
        this.caregiverForm.markAsPristine();
        this.router.navigate(['../caregiver-availability'], { relativeTo: this.route });
      });
    }
  }
}
