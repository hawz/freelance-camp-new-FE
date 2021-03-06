import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { timer } from 'rxjs';

import { Document } from './document';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documents: Document[];
  subscription: Subscription;
  timedSubscription: Observable<number>;

  constructor(private documentsService: DocumentService) { }

  ngOnInit() {
    this.timedSubscription = timer(0, 60000);

    this.subscription = this.documentsService.documentsChanged
      .subscribe(
        (documents: Document[]) => {
          console.log('documents are changed');
          this.documents = documents;
        }
      );

    // this.fetchDocuments();
    this.timedSubscription.subscribe(() => this.fetchDocuments());
  }

  fetchDocuments() {
    this.documentsService.fetchDocuments().subscribe(
      (docs) => console.log('fetched documents', docs),
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
