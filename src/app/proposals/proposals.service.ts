import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Proposal } from './proposal.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {
  private proposalAPIBaseUrl = 'http://localhost:3002/';

  proposals: Proposal[];
  proposalsChanged = new Subject<Proposal[]>();

  constructor(private httpClient: HttpClient) { }

  getProposals() {
    return this.proposals.slice();
  }

  getProposal(id: number) {
    return this.proposals.find((proposal) => proposal.id === id);
  }

  fetchProposals(): Observable<Proposal[]> {
    return this.httpClient.get<Proposal[]>(this.proposalAPIBaseUrl + 'proposals.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((props: Proposal[]) => {
        this.setProposals(props);
        return props;
      }),
      catchError((error) => throwError(error))
    );
  }

  setProposals(props: Proposal[]) {
    this.proposals = props;
    this.proposalsChanged.next(this.proposals.slice());
  }

  addProposal(proposal: Proposal) {
    this.proposals.push(proposal);
  }

  updateProposal(id: number, newProposal: Proposal) {
    const proposal = this.getProposal(id);
    const index = this.proposals.indexOf(proposal);
    this.proposals[index] = newProposal;
  }

  deleteProposal(id: number) {
    const proposal = this.getProposal(id);
    const index = this.proposals.indexOf(proposal);
    this.proposals.splice(index, 1);
  }
}
