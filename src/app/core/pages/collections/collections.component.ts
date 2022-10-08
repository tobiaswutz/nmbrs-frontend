import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Collection } from '../../models/collection';
import { ModalService } from '../../services/modal.service';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  public collections: Collection[] = [];
  public loading: boolean = true;

  private alive: boolean = true;

  constructor(
    private collectionService: CollectionService,
    private sidePanelService: SidepanelService,
    private modalService: ModalService,
  ) { }

  public async ngOnInit() {
    this.collections = await this.collectionService.getCollections();
    this.loading = false;
    this.collectionService.collectionsSubject.pipe(takeWhile(() => this.alive)).subscribe((collections: Collection[]) => { this.collections = collections; });
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public createCollection() {
    // this.sidePanelService.openPanel(new SidePanelData('COLLECTION', 'CREATE'));
    this.modalService.createModal("Test", "Test", "Test", "Test");

  }
}
