import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { timer } from 'rxjs';

import { Proposal } from '../proposal.model';
import { ProposalsService } from '../proposals.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.less']
})
export class ProposalListComponent implements OnInit, OnDestroy {
  proposals: Proposal[];
  subscription: Subscription;
  timedSubscription: Observable<number>;

  constructor(private proposalService: ProposalsService) {}

  ngOnInit() {
    this.timedSubscription = timer(0, 60000);

    this.subscription = this.proposalService.proposalsChanged
      .subscribe(
        (proposals: Proposal[]) => {
          console.log('proposals are changed');
          this.proposals = proposals;
        }
      );

    // this.fetchProposals();
    this.timedSubscription.subscribe(() => this.fetchProposals());
  }

  fetchProposals() {
    this.proposalService.fetchProposals().subscribe(
      (proposals) => console.log('fetched proposals', proposals),
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
