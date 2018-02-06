import { Component, Input } from '@angular/core';

import { ProjectService } from '../project.service';

import { Project } from '../project-model';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent {

  @Input()
  project: Project;

  constructor(private projectService: ProjectService) { }

  deleteProject(id: string) {
    this.projectService.deleteProject(id);
  }

}
