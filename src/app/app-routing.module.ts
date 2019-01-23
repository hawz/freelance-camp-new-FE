import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalDetailsComponent } from './proposals/proposal-details/proposal-details.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'proposals', component: ProposalsComponent },
  { path: 'proposals/new', component: ProposalEditComponent },
  { path: 'proposals/:id', component: ProposalDetailsComponent },
  { path: 'proposals/:id/edit', component: ProposalEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
