import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface Radio {

  id?: string;

  name: string;

  year: number;

  description: string;

  image: string;

  specs?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreRadioService {

  private firestore = inject(Firestore);

  private radiosCollection = collection(
    this.firestore,
    'radios'
  );

  radios$ = collectionData(
    this.radiosCollection,
    {
      idField: 'id'
    }
  ) as Observable<Radio[]>;

  async addRadio(radio: Omit<Radio, 'id'>) {

    return addDoc(
      this.radiosCollection,
      radio
    );
  }

  async deleteRadio(id: string) {

    const radioDoc = doc(
      this.firestore,
      `radios/${id}`
    );

    return deleteDoc(radioDoc);
  }
}