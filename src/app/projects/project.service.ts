import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Project } from './project-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewProject {
  content: string;
  hearts: 0;
  time: number;
}

@Injectable()
export class ProjectService {

  projectsCollection: AngularFirestoreCollection<Project>;
  projectDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects', (ref) => ref.orderBy('time', 'desc'));
  }

  getData(): Observable<Project[]> {
    return this.projectsCollection.valueChanges();
  }

  getSnapshot(): Observable<Project[]> {
    // ['added', 'modified', 'removed']
    return this.projectsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Project;
        return { id: a.payload.doc.id, name: data.name, client: data.client, time: data.time };
      });
    });
  }

  getProject(id: string) {
    return this.afs.doc<Project>(`projects/${id}`);
  }

  create(name: string, client: string) {
    const note = {
      name,
      client,
      time: new Date().getTime(),
    };
    return this.projectsCollection.add(note);
  }

  updateProject(id: string, data: Partial<Project>) {
    return this.getProject(id).update(data);
  }

  deleteProject(id: string) {
    return this.getProject(id).delete();
  }
}
