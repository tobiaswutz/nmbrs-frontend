import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { LoginComponent } from './core/pages/login/login.component';
import { AuthService } from './core/services/auth.service';
import { TradelistComponent } from './core/pages/tradelist/tradelist.component';
import { ReportsComponent } from './core/pages/reports/reports.component';
import { DocumentsComponent } from './core/pages/documents/documents.component';
import { TradelistoverviewComponent } from './core/pages/tradelistoverview/tradelistoverview.component';
import { EditTradeComponent } from './core/pages/edit-trade/edit-trade.component';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tradelist', component: TradelistoverviewComponent, canActivate: [AuthGuard] },
  { path: 'tradelist/:id', component: TradelistComponent, canActivate: [AuthGuard] },
  { path: 'tradelist/:id/edit', component: EditTradeComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
