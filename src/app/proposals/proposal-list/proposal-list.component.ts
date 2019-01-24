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

  timedSubscription: Subscription;
  timerProposals: Observable<number>;

  constructor(private proposalService: ProposalsService) {}

  ngOnInit() {
    this.timerProposals = timer(0, 6000);

    this.subscription = this.proposalService.proposalsChanged
      .subscribe(
        (proposals: Proposal[]) => {
          this.proposals = proposals;
        }
      );

    // this.fetchProposals();
    this.timedSubscription = this.timerProposals.subscribe(() => this.fetchProposals());
  }

  fetchProposals() {
    this.proposalService.fetchProposals().subscribe(
      () => {},
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.timedSubscription.unsubscribe();
  }
}
