import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';



export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
        
           { path: 'purchase-orders', component: PurchaseOrdersComponent },
        ]
    }
];
