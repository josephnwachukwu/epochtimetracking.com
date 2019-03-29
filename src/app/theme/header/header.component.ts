import { Component } from '@angular/core';
//import { AppConfigService } from '../../app.config';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  show = false;
  constructor(public auth: AuthService) {

  }
  toggleCollapse() {
    this.show = !this.show;
  }
  logout() {
  	this.auth.signOut()
  }
}
