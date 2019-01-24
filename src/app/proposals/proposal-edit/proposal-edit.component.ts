import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Proposal } from '../proposal.model';
import { ProposalsService } from '../proposals.service';

@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.less']
})
export class ProposalEditComponent implements OnInit {
  @ViewChild('proposalForm') proposalForm: NgForm;
  proposal: Proposal = new Proposal();
  id: number;
  editMode = false;
  submitted = false;
  showConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('inside the ProposalEditComponent', this.id, this.editMode);
      this.initForm();
    });
  }

  onSubmit() {
    this.submitted = true;
    this.showConfirm = false;
    if (this.editMode) {
      this.proposalService.updateProposal(this.id, this.proposalForm.value)
        .subscribe(
          (res) => {
            this.showConfirm = true;
            this.submitted = false;
          }
        );
    } else {
      this.proposalService.addProposal(this.proposalForm.value)
        .subscribe(
          (res) => {
            this.submitted = false;
            this.toastr.success('Success', 'Your proposal has been created!');
            this.router.navigate(['proposals']);
          }
        );
    }
  }

  private initForm() {
    if (this.editMode) {
      this.proposalService.fetchProposal(this.id).subscribe(
        (prop: Proposal) => this.proposal = prop
      );
      // this.proposal = this.proposalService.getProposal(this.id);
      // console.log(this.proposal);
    }
    // this one in editMode should fill the form with the selected proposal
  }
}
