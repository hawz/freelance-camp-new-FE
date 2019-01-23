import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private docsAPIBaseUrl = 'http://localhost:3001/';

  documents: Document[];
  documentsChanged = new Subject<Document[]>();

  constructor(private httpClient: HttpClient) { }

  getDocuments() {
    return this.documents.slice();
  }

  fetchDocuments(): Observable<Document[]> {
    return this.httpClient.get<Document[]>(this.docsAPIBaseUrl + 'freelance_documents.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((docs: Document[]) => {
        this.setDocuments(docs);
        return docs;
      }),
      catchError((error) => throwError(error) )
    );
  }

  setDocuments(docs: Document[]) {
    this.documents = docs;
    this.documentsChanged.next(this.documents.slice());
  }
}
