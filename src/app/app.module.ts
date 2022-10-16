import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { LoginComponent } from './core/pages/login/login.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { CollectionsComponent } from './core/pages/collections/collections.component';
import { TransactionListComponent } from './core/pages/transaction-list/transaction-list.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { SidepanelComponent } from './core/components/sidepanel/sidepanel.component';
import { ModalComponent } from './core/components/modal/modal.component';
import { ContentModalComponent } from './core/components/content-modal/content-modal.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StakingComponent } from './core/pages/staking/staking.component';
import { ReportsComponent } from './core/pages/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    CollectionsComponent,
    TransactionListComponent,
    NotificationComponent,
    SidepanelComponent,
    ModalComponent,
    ContentModalComponent,
    StakingComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    CollectionsComponent,
    TransactionListComponent,
    NotificationComponent,
    SidepanelComponent,
    ModalComponent,
    ContentModalComponent,
    StakingComponent,
    ReportsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
