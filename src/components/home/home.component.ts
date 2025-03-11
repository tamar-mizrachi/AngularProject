import { Component } from '@angular/core';
import { RouterOutlet,Router,RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, RouterOutlet,RouterLink]
})
export class HomeComponent {
  role: string|any=localStorage.getItem('role');
}

