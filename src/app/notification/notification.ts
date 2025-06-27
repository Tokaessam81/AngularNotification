// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NotificationService } from './notification.spec'; // تأكدي من المسار الصحيح للخ

// @Component({
//   selector: 'app-notification',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div *ngFor="let note of notifications">
//       <div class="notification">{{ note }}</div>
//     </div>
//   `,
//   styles: [`
//     .notification {
//       padding: 10px;
//       margin: 5px;
//       background: #f9f9f9;
//       border-left: 5px solid #2196F3;
//       border-radius: 4px;
//       font-family: Arial, sans-serif;
//     }
//   `]
// })
// export class NotificationComponent implements OnInit {
//   notifications: string[] = [];

//   constructor(private notificationService: NotificationService) {}

//   ngOnInit(): void {
//     this.notificationService.notifications$.subscribe((msg) => {
//       if (msg) {
//         this.notifications.unshift(msg);
//       }
//     });
//   }
//    sendTestNotification(): void {
//   const fakeMessage = `🧪 Test Notification at ${new Date().toLocaleTimeString()}`;
//   console.log('✅ Adding test notification:', fakeMessage); // 🔍 Debug
//   this.notifications.unshift(fakeMessage);
// }

// }
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.spec'; // تأكدي من المسار الصحيح للخدمة

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((message: string | null) => {
      if (message) {
        console.log('📩 Got notification:', message);
        this.notifications.unshift(message);
      }
    });
  }

  sendTestNotification(): void {
    const fakeMessage = `🧪 Test Notification at ${new Date().toLocaleTimeString()}`;
    console.log('✅ Adding test notification:', fakeMessage);
    this.notifications.unshift(fakeMessage);
  }
}
