import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private isStarted = false;
  public notifications$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.startConnection();
  }

  private startConnection(): void {
    if (this.isStarted) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://educredit.runasp.net/notificationHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.isStarted = true;
        console.log('✅ SignalR Connected');
      })
      .catch(err => console.error('❌ SignalR Error:', err));

    this.hubConnection.on('EnrollmentStatusUpdated', (data: any) => {
      const formatted = `🧑‍🎓 Status: ${data.Status}, Notes: ${data.GuideNotes}`;
      this.notifications$.next(formatted);
    });

    this.hubConnection.on('StudentEnrollmentChanged', (message: string) => {
      const formatted = `👨‍🏫 ${message}`;
      this.notifications$.next(formatted);
    });
  }
}
