import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule,  MatToolbarModule,
    MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isVisible = false;
  mobile = false;
  menus = [
    {
      name: 'Ricky Morty',
      link: '/api-ricky'
    },
    {
      name: 'Api Mapa',
      link: '/api-maps'
    },
  ];

  constructor(private router: Router,){}
  ngOnInit(): void {

  }

}
