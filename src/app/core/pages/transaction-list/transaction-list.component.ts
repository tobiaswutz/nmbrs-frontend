import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { Collection } from '../../models/collection';
import { Transaction } from '../../models/transaction';
import { DynamicModalData, ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from '../collections/collection.service';
import { TransactionService } from './transaction.service';
import { PaginatedTransactions } from './transactions';

@Component({
  host: {
    "(document:click)": "onClick($event)",
  },
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  public collection: Collection | undefined | null;
  public transactionListiId: number | undefined;
  public transactions: Transaction[] = [];
  public dropdownOpen: boolean = false;

  public page: number = 1;
  public totalTransactions: number = 0;
  public transactionsPerPage: number = 50;

  public collectionEditModalOpen: boolean = false;

  public editCollectionForm: FormGroup | undefined;

  public transactionsLoaiding: number[] = [];

  private alive: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private sidepanel: SidepanelService,
    private collectionService: CollectionService,
    private eref: ElementRef,
    private notify: NotificationService,
    private modal: ModalService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.collection = await this.collectionService.getCollectionById(parseInt(this.activatedRoute.snapshot.params['id']));
    this.transactionService.openCollectionId = this.collection?.id;
    this.transactionService.paginatedTransactions.pipe(takeWhile(() => this.alive)).subscribe((paginatedTransactions: PaginatedTransactions) => { this.handlePageChange(paginatedTransactions) });
    await this.transactionService.getTransactionsPaginated(this.page, this.transactionsPerPage);
  }

  public async handlePageChange(paginatedTransactions: PaginatedTransactions) {
    this.transactions = paginatedTransactions.transactions;
    this.page = paginatedTransactions.page;
    this.totalTransactions = paginatedTransactions.numberOfTransactions;
  }

  public async switchPage(directtion: 'next' | 'previous') {
    if (this.page === 1 && directtion === 'previous') { return; }
    if (this.page === Math.ceil(this.totalTransactions / this.transactionsPerPage) && directtion === 'next') { return; }
    directtion === 'next' ? this.page++ : this.page--;
    await this.transactionService.getTransactionsPaginated(this.page, this.transactionsPerPage);
  }

  public onClick(event: { target: any; }) {
    if (!this.eref.nativeElement.contains(event.target))
      this.dropdownOpen = false;
  }


  public ngOnDestroy() {
    this.alive = false;
    this.transactionService.openCollectionId = null;
    this.collection = null;
    this.page = 1;
    this.totalTransactions = 0;
  }

  public showListInfo() {
    this.collectionEditModalOpen = true;
    this.editCollectionForm = new FormGroup({
      name: new FormControl(this.collection?.name),
      description: new FormControl(this.collection?.description)
    });
  }

  public abort(): void {
    this.editCollectionForm = undefined;
    this.collectionEditModalOpen = false;
  }

  public async updateCollectionInfo() {
    if (!this.collection?.id || !this.collection?.name) { return; }
    const collection = new Collection(this.collection.id, this.editCollectionForm?.get('name')?.value, this.editCollectionForm?.get('description')?.value);
    await this.collectionService.updateCollection(collection);
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.collection = await this.collectionService.getCollectionById(this.collection.id);
    this.editCollectionForm = undefined;
    this.collectionEditModalOpen = false;
  }

  public export() {
    this.transactionService.exportTransactions();
  }

  public editTransaction(id: number) {
    const tranasctionInEdit = this.transactions.find(t => t.id === id);
    this.sidepanel.openPanel(new SidePanelData('TRANSACTION', 'EDIT', tranasctionInEdit));
  }

  public async deleteTransaction(transactionId: number) {
    this.deleteLoading(transactionId);
    await this.transactionService.deleteTransaction(transactionId);
    this.transactionsLoaiding = [];
  }

  public isLoading(transactionId: number): boolean {
    return this.transactionsLoaiding.includes(transactionId);
  }

  public deleteLoading(transactionId: number) {
    const transaction = this.transactions.find(t => t.id === transactionId);
    if (!transaction) { return; }
    this.transactionsLoaiding.push(transaction.id);
  }

  public addTransactions(): void {
    this.sidepanel.openPanel(new SidePanelData('TRANSACTION', 'CREATE'));
  }

  public deleteTradeList() {
    if (this.transactions.length) { this.notify.warning('You can not delete a list with transactions'); return; }
    if (!this.collection?.id || !this.collection?.name) { return; }
    if (confirm("Are you sure you want to delete this trade list?")) {
      // delete all transactions in this list TODO

      //delete the list
      this.collectionService.deleteCollection(this.collection.id);
    }
  }
}
