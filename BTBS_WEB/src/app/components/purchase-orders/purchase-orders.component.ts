import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { PrimengImports } from '../../shared/primeng-imports';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
    statusnew?: string;
}
@Component({
  selector: 'app-purchase-orders',
 imports: [CommonModule, FormsModule, PrimengImports, ReactiveFormsModule,],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css',
  providers: [MessageService]
})
export class PurchaseOrdersComponent {
 date1: Date | undefined;
  isExpanded = false;
  visible: boolean = false;
  visibleHistory: boolean = false;
   events: EventItem[];
   userMenuItems: MenuItem[] = [];
  showDialog() {
    this.visible = true;
  }
  showHistoryDialog() {
    this.visibleHistory = true;
  }

  items = [
    { itemNo: 'ITM-7845', desc: 'Surgical Gloves', uom: 'Box', qty: 100, unitPrice: 1.25 },
    { itemNo: 'ITM-7848', desc: 'N-95 Masks', uom: 'Carton', qty: 800, unitPrice: 1.20 },
    { itemNo: 'ITM-5862', desc: 'Digital Thermometers', uom: 'Each', qty: 200, unitPrice: 3.00 },
    { itemNo: 'ITM-8981', desc: 'Disinfectant Wipes', uom: 'Carton', qty: 150, unitPrice: 1.80 },
    { itemNo: 'ITM-3509', desc: 'Digital Thermometers', uom: 'Each', qty: 25, unitPrice: 25.00 }
  ];

  get totalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  }


  

    constructor() {
       this.events = [
            { status: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature...', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg', },
            { status: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature...', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature...', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature...', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];

    }

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
}
