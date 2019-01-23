import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Proposal } from '../proposal.model';
import { ProposalsService } from '../proposals.service';

@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.less']
})
export class ProposalEditComponent implements OnInit {
  proposalForm: FormGroup;
  proposal: Proposal = new Proposal;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private proposalService: ProposalsService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('inside the ProposalEditComponent', this.id, this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log('form submitted');
  }

  private initForm() {
    if (this.editMode) {
      this.proposal = this.proposalService.getProposal(this.id);
      console.log(this.proposal);
    }
    // this one in editMode should fill the form with the selected proposal
  }

}
