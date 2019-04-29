import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ManagerService } from '../manager.service' 

// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Invite } from '../models/invite.model'
// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'manager-invite',
  templateUrl: './manager-invite.component.html',
  styleUrls: ['./manager-invite.component.scss']
})
export class ManagerInviteComponent implements OnInit {

  id:string;
  inviteId: string;

  private inviteDocument: AngularFirestoreDocument<Invite>
  invite: Observable<Invite>

  constructor(private route: ActivatedRoute, private managerService: ManagerService, private afs: AngularFirestore) { }

  ngOnInit() {
  	this.inviteId = this.route.snapshot.paramMap.get("id");
  	this.inviteDocument = this.afs.doc<Invite>('invitations/' + this.inviteId)
  	this.invite = this.inviteDocument.valueChanges();
  }

}
