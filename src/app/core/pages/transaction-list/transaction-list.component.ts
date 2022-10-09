import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { Collection } from '../../models/collection';
import { Transaction } from '../../models/transaction';
import { NotificationService } from '../../services/notification.service';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from '../collections/collection.service';
import { TransactionService } from './transaction.service';

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

  public transactionsLoaiding: number[] = [];

  private alive: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private sidepanel: SidepanelService,
    private collectionService: CollectionService,
    private eref: ElementRef,
    private notify: NotificationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.collection = await this.collectionService.getCollectionById(parseInt(this.activatedRoute.snapshot.params['id']));
    this.transactionService.openCollectionId = this.collection?.id;
    this.transactionService.transactionsSubject.pipe(takeWhile(() => this.alive)).subscribe((transactions: Transaction[]) => { this.transactions = transactions; });
    await this.transactionService.getTransactionsByListId();
  }

  onClick(event: { target: any; }) {
    if (!this.eref.nativeElement.contains(event.target))
      this.dropdownOpen = false;
  }

  public ngOnDestroy() {
    this.alive = false;
    this.transactionService.openCollectionId = null;
    this.collection = null;
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
