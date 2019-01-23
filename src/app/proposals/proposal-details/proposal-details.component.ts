import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Proposal } from '../proposal.model';
import { ProposalsService } from '../proposals.service';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.less']
})
export class ProposalDetailsComponent implements OnInit {
  id: number;
  proposal: Proposal;

  constructor(private route: ActivatedRoute, private proposalService: ProposalsService) { }

  ngOnInit() {
    console.log('inside the ProposalDetailsComponent');
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.proposal = this.proposalService.getProposal(this.id);
      }
    );
  }

}
