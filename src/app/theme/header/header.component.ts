import { Component, OnInit } from '@angular/core';
//import { AppConfigService } from '../../app.config';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'main-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  show = false;
  clientId:string
  constructor(public auth: AuthService, private route: ActivatedRoute) {

  }
  toggleCollapse() {
    this.show = !this.show;
  }
  logout() {
  	this.auth.signOut()
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get("id")
      console.log('ci', this.clientId)
    })
  }
}

