import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Proposal } from '../proposal.model';
import { ProposalsService } from '../proposals.service';
import { ModalConfirmComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.less']
})
export class ProposalDetailsComponent implements OnInit {
  id: number;
  proposal: Proposal;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalsService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.proposalService.fetchProposal(this.id).subscribe(
          (proposal: Proposal) => {
            this.proposal = proposal;
          }
        );

      }
    );
  }

  confirmDelete() {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.messageToConfirm = `Are you sure you want to delete the proposal for the client ${this.proposal.customer}?`;

    modalRef.result
      .then((result) => {
        // console.log('modal closed');
        // Confirm
        this.deleteProposal();
      }, (reason) => {
        // console.log('modal dismissed');
      })
      .catch((error) => console.error(error));
  }

  deleteProposal() {
    console.log('delete proposal with id: ', this.id);
    this.proposalService.deleteProposal(this.id)
      .subscribe(
        () => {
          this.toastr.success('Proposal deleted!', 'Success');
          this.router.navigate(['proposals']);
        },
        (error) => this.toastr.error(error, 'Error')
      );
  }

}
