import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Research Paper Repository</h1>
        <nav>
          <a routerLink="/">Home</a>
          <a routerLink="/papers">Browse Papers</a>
          <a routerLink="/submit">Submit Paper</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <p>© 2025 Research Paper Repository</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    nav {
      margin-top: 15px;
    }
    nav a {
      margin: 0 15px;
      text-decoration: none;
      color: #0066cc;
      font-weight: bold;
    }
    footer {
      margin-top: 50px;
      text-align: center;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
  `]
})
export class AppComponent {}

