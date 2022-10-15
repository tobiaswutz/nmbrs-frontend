import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Collection } from '../../models/collection';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';

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
  ) { }

  public async getCollectionById(id: number): Promise<Collection | undefined> {
    if (!this.collections.length) { await this.getCollections(); }
    return this.collections.find((collection: Collection) => collection.id === id);
  }

  public async addCollection(formValue: any): Promise<boolean> {
    if (await this.webService.postAuthCall('collection', formValue)) {
      this.note.success("Sammlung erstellt");
      this.getCollections();
      return true;
    } else {
      this.note.error("Sammlung konnte nicht erstellt werden");
      return false;
    }

  }
  
  public async updateCollection(collection: Collection): Promise<boolean> {
    if (await this.webService.patchAuthCall('collection/' + collection.id, { name: collection?.name , description: collection?.description })) {
      this.note.success("Sammlung aktualisiert");
      this.getCollections();
      return true;
    } else {
      this.note.error("Sammlung konnte nicht aktualisiert werden");
      return false;
    }
  }

  public async deleteCollection(id: number): Promise<void> {
    try {
      await this.webService.deleteAuthCall('collection/' + id);
      this.note.success("Sammlung gelöscht");
      this.getCollections();
      this.router.navigate(['/collections']);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async getCollections(): Promise<Collection[]> {
    const res: any = await this.webService.getAuthCall("collection");
    if (res) {
      this.collections = res;
      this.collectionsSubject.next(res);
      return res;
    } else {
      this.note.error("Sammlungen konnten nicht geladen werden");
    }
    return [];
  }
}
