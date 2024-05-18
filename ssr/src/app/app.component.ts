import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssr';
  httpClient = inject(HttpClient);
  data = [];
  ngOnInit() {
    this.httpClient.get('/get-users').subscribe((res: any) => {
      this.data = res;
    })
  }
}
