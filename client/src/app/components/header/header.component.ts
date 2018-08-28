import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication.service';
import { HeaderService } from '../../services/header.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private headerService: HeaderService) { }

  ngOnInit() {
  }

  public isConnected() {
    return this.authenticationService.isConnected;
  }

  public get doReturn(): Function {
    return this.headerService.doReturn;
  }

  public get showHome(): boolean {
    return this.headerService.showHome;
  }

  public get showProfile(): boolean {
    return this.headerService.showProfile;
  }

  public get elderlyId(): number {
    return this.headerService.elderlyId;
  }

  public signout() {
    this.authenticationService.signout().subscribe(res => {
      this.router.navigate(['/home']);
    });
  }
}
