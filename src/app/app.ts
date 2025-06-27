import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  notifications: string[] = [];
  showDropdown = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications.unshift("📢 Welcome notification!");

    this.notificationService.notifications$.subscribe((message: string | null) => {
      if (message) {
        this.notifications.unshift(message);
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  sendTestNotification(): void {
    const fakeMessage = `🧪 Test Notification at ${new Date().toLocaleTimeString()}`;
    this.notifications.unshift(fakeMessage);
  }
}
