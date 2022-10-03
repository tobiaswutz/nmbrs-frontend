import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Collection } from '../../models/collection';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';
import { TransactionService } from '../transaction-list/transaction.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  public collectionsSubject: Subject<Collection[]> = new Subject<Collection[]>();

  public collections: Collection[] = []

  constructor(
    private webService: WebService,
    private note: NotificationService,
    private router: Router,
    private transactionService: TransactionService,
  ) { }

  public async getCollectionById(id: number): Promise<Collection | undefined> {
    if (!this.collections.length) { await this.getCollections(); }
    return this.collections.find((collection: Collection) => collection.id === id);
  }

  public async addCollection(formValue: any): Promise<void> {
    try {
      const result = await this.webService.postAuthCall('transaction-list', formValue);
      if (result) {
        this.note.success("Transaction list created");
        this.getCollections();
      }
    } catch (error: any) {
      console.error(error);
      this.note.error(error);
    }
  }

  public async deleteCollection(id: number): Promise<void> {
    try {
      await this.webService.deleteAuthCall('transaction-list/' + id);
      this.note.success("Transaction list deleted");
      this.getCollections();
      this.router.navigate(['/collections']);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async getCollections(): Promise<Collection[]> {
    const res: any = await this.webService.getAuthCall("transaction-list");
    if (res) {
      this.collections = res;
      this.collectionsSubject.next(res);
      return res;
    } else {
      this.note.error("Could not get transaction lists");
    }
    return [];
  }
}
