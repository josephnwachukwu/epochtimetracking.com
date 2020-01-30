import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Project } from './project-model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ProjectService {

  projectsCollection: AngularFirestoreCollection<Project>;
  projectDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    //this.projectsCollection = this.afs.collection('projects', (ref) => ref.orderBy('time', 'desc'));
  }

  getData(): Observable<Project[]> {
    return this.projectsCollection.valueChanges();
  }

  getSnapshot(clientId): Observable<Project[]> {
    //console.log('ci', clientId);
    this.projectsCollection = this.afs.collection('projects', (ref) => ref.where('clientId', '==', clientId).orderBy('time', 'desc'));
    return this.projectsCollection.snapshotChanges().pipe(
      map((actions:any[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Project;
          return { id: a.payload.doc.id, ...data };
        });
      })
    )
  }

  getProject(id: string) {
    return this.afs.doc<Project>(`projects/${id}`);
  }

  create(name: string, clientName: string) {
    const project = {
      name,
      clientName,
      time: new Date().getTime(),
    };
    return this.projectsCollection.add(project);
  }

  createProject(proj) {
    var project = Object.assign({}, proj)
    project.time = new Date().getTime();
    return this.projectsCollection.add(project);
  }

  updateProject(id: string, data: Partial<Project>) {
    return this.getProject(id).update(data);
  }

  deleteProject(id: string) {
    return this.getProject(id).delete();
  }
}
