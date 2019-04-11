import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from '../project.service';
import { ClientService } from '../../clients/client.service'

import { Project } from '../project-model';
import { Client } from '../../clients/client.model'

import { Observable } from 'rxjs';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  @Input() clientId:string;

  addProjectActive: boolean = false;
  projects: Observable<Project[]>;
  clients: Observable<Client[]>;
  proj: any;

  constructor(private projectService: ProjectService, private clientService: ClientService) {
  }

  ngOnInit() {
    this.projects = this.projectService.getSnapshot(this.clientId);
    this.clients = this.clientService.getData();
  }

  createProject() {
    this.proj.clientId = this.clientId;
    this.projectService.createProject(this.proj)
    this.proj = {};
    this.addProjectActive = false;
  }

  newProject  = () => {
    this.proj = new Project();
    this.addProjectActive = true;
  }
}
