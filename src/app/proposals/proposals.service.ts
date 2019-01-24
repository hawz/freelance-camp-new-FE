import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
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

  getProposal(id: number) {
    return this.proposals.find((proposal) => proposal.id === id);
  }

  getProposals() {
    return this.proposals.slice();
  }

  fetchProposal(id: number) {
    return this.httpClient.get(this.proposalAPIBaseUrl + 'proposals/' + id + '.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      catchError((error) => throwError(error))
    );
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

  addProposal(newProposal: Proposal) {
    return this.httpClient.post(this.proposalAPIBaseUrl + 'proposals', newProposal, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((res) => console.log(res)),
      catchError((error) => throwError(error))
    );
  }

  updateProposal(id: number, updatedProposal: Proposal) {
    return this.httpClient.put(this.proposalAPIBaseUrl + 'proposals/' + id, updatedProposal, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((res) => console.log(res)),
      catchError((error) => throwError(error))
    );
  }

  deleteProposal(id: number) {
    console.log('proposalService.deleteProposal');
    return this.httpClient.delete(this.proposalAPIBaseUrl + 'proposals/' + id, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      catchError((error) => throwError(error))
    );
  }
}
