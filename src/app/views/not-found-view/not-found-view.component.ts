import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-view',
  imports: [],
  templateUrl: './not-found-view.component.html',
  styleUrl: './not-found-view.component.css'
})
export class NotFoundViewComponent implements OnInit {
  constructor(private router : Router){}
  ngOnInit(): void {
  }

  navigateToList(){
    this.router.navigate(['/api-ricky']);
  }

}
