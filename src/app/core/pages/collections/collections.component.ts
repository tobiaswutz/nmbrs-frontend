import { Component, OnInit,  } from '@angular/core';
import { Subject } from 'rxjs';
import { Collection } from '../../models/collection';
import { ModalService } from '../../services/modal.service';
import { SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  public collections$: Subject<Collection[]> | undefined
  public loading: boolean = true;

  constructor(
    private collectionService: CollectionService,
    private modalService: ModalService,
  ) { }

  public async ngOnInit() {
    this.collectionService.fetchCollections();
    this.collections$ = this.collectionService.collectionsSubject;
  }

  public createCollection() {
    this.modalService.createModal("Test", "Test", "Test", "Test");
  }
}
