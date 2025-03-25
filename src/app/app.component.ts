import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pageTitle: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const routeData = this.activatedRoute.firstChild?.snapshot.data;
      if (routeData && routeData['title']) {
        this.pageTitle = routeData['title'];
      }
    });
  }

}
