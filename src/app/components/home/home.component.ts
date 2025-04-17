import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <h1>Welcome to the Research Paper Repository</h1>
        <p>A platform for researchers to share and discover academic papers</p>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search for papers..." 
            [(ngModel)]="searchQuery"
            (keyup.enter)="search()">
          <button (click)="search()">Search</button>
        </div>
      </section>
      
      <section class="features">
        <div class="feature">
          <h3>Browse Papers</h3>
          <p>Explore our collection of academic papers across various disciplines.</p>
          <a routerLink="/papers">Browse</a>
        </div>
        
        <div class="feature">
          <h3>Submit Your Research</h3>
          <p>Share your findings with the academic community.</p>
          <a routerLink="/submit">Submit Paper</a>
        </div>
        
        <div class="feature">
          <h3>Track Submissions</h3>
          <p>Monitor the status of your submitted papers.</p>
          <a routerLink="/my-papers">My Papers</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
    }
    .hero {
      margin-bottom: 40px;
      padding: 40px 0;
    }
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    .search-container {
      max-width: 600px;
      margin: 30px auto;
      display: flex;
    }
    .search-container input {
      flex: 1;
      padding: 12px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    .search-container button {
      padding: 12px 24px;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    .features {
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
    }
    .feature {
      width: 30%;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 5px;
    }
    .feature a {
      display: inline-block;
      margin-top: 15px;
      padding: 8px 16px;
      background: #0066cc;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class HomeComponent {
  searchQuery: string = '';
  
  constructor(private router: Router) {}
  
  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/papers'], { 
        queryParams: { query: this.searchQuery } 
      });
    }
  }
}