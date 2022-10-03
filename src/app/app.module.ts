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
import { DashboardViewComponent } from './core/views/dashboard-view/dashboard-view.component';
import { CollectionsComponent } from './core/pages/collections/collections.component';
import { TransactionListComponent } from './core/pages/transaction-list/transaction-list.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { SidepanelComponent } from './core/components/sidepanel/sidepanel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    DashboardViewComponent,
    CollectionsComponent,
    TransactionListComponent,
    NotificationComponent,
    SidepanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    DashboardViewComponent,
    CollectionsComponent,
    TransactionListComponent,
    NotificationComponent,
    SidepanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
