import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../project.service';
import { ClientService } from '../../clients/client.service'

import { Project } from '../project-model';
import { Client } from '../../clients/client-model'

import { Observable } from 'rxjs';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {

  projects: Observable<Project[]>;
  clients: Observable<Client[]>;
  
  name: string;
  client:string;


  constructor(private projectService: ProjectService, private clientService: ClientService) { }

  ngOnInit() {
    this.projects = this.projectService.getSnapshot();
    this.clients = this.clientService.getSnapshot();
  }

  createProject() {
    this.projectService.create(this.name, this.client);
    this.name = '';
  }

}
