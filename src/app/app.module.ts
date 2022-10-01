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
import { TradelistoverviewComponent } from './core/pages/tradelistoverview/tradelistoverview.component';
import { EditTradeComponent } from './core/pages/edit-trade/edit-trade.component';
import { TradelistComponent } from './core/pages/tradelist/tradelist.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { SidepanelComponent } from './core/components/sidepanel/sidepanel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    DashboardViewComponent,
    TradelistoverviewComponent,
    EditTradeComponent,
    TradelistComponent,
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
    TradelistoverviewComponent,
    EditTradeComponent,
    TradelistComponent,
    NotificationComponent,
    SidepanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
