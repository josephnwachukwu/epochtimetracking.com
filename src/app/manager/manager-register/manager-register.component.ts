import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ManagerService } from '../manager.service' 
import { AuthService } from '../../auth/auth.service';

// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Invite } from '../models/invite.model'
// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user.model'

@Component({
  selector: 'manager-register',
  templateUrl: './manager-register.component.html',
  styleUrls: ['./manager-register.component.scss']
})

export class ManagerRegisterComponent implements OnInit {

  id:string;
  inviteId: string;
  user:any = new User();

  private inviteDocument: AngularFirestoreDocument<Invite>
  invite: Observable<Invite>

  constructor(private route: ActivatedRoute, private managerService: ManagerService, private afs: AngularFirestore, private auth: AuthService) { }

  ngOnInit() {
  	this.inviteId = this.route.snapshot.paramMap.get("id");
  	this.inviteDocument = this.afs.doc<Invite>('invitations/' + this.inviteId)
  	this.invite = this.inviteDocument.valueChanges();
  	//console.log(this.invite)
  	this.invite.subscribe(data => {
  		this.user = {
	  		email: data['managerEmail'],
	  		displayName: data['managerName'],
	  		isAdmin: true,
	  		tier:  'manager',
	  	}
  	})
  	
  }

  register(user) {
  	return this.auth.managerEmailSignUp(user)
  }

}
