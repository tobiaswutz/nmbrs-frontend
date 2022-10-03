import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Collection } from '../../models/collection';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  public collections: Collection[] = [];

  private alive: boolean = true;

  constructor(
    private collectionService: CollectionService,
    private sidePanelService: SidepanelService,
  ) { }

  public async ngOnInit() {
    this.collections = await this.collectionService.getCollections();
    this.collectionService.collectionsSubject.pipe(takeWhile(() => this.alive)).subscribe((collections: Collection[]) => { this.collections = collections; });
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public createCollection() {
    this.sidePanelService.openPanel(new SidePanelData('collection'));
  }
}
