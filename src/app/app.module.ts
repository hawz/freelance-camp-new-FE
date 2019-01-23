import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';
import { ProposalDetailsComponent } from './proposals/proposal-details/proposal-details.component';
import { ProposalListComponent } from './proposals/proposal-list/proposal-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DocumentsComponent,
    ProposalsComponent,
    ProposalEditComponent,
    ProposalDetailsComponent,
    ProposalListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
