import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimengImports } from '../../shared/primeng-imports';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, PrimengImports],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 items: MenuItem[] | undefined;
 userMenuItems: MenuItem[] = [];

  constructor(
    private router: Router, ) { }




 
   ngOnInit() {
    this.userMenuItems = [
        {
          label: 'PROFILE',
          icon: 'pi pi-user',
          command: () => {
            //this.goToProfile();
          },
        },
        {
          label: 'SETTINGS',
          icon: 'pi pi-cog',
          command: () => {
          //  this.goToRequest();
          },
        },
        {
          label: 'LOGOUT',
          icon: 'pi pi-sign-out',
          command: () => {
           // this.onLogoutClick();
          },
        },
      ];
}

goToPurchaseOrders() {
    this.router.navigate(['/purchase-orders']);
  }
}
