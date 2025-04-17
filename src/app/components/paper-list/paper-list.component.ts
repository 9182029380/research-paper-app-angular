import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../models/paper.model';

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="paper-list-container">
      <h2>Research Papers</h2>
      
      <div class="search-filter">
        <input 
          type="text" 
          placeholder="Search papers..." 
          [(ngModel)]="searchQuery" 
          (input)="searchPapers()">
      </div>
      
      <div *ngIf="papers.length > 0; else noPapers">
        <div class="paper-item" *ngFor="let paper of papers">
          <h3><a [routerLink]="['/papers', paper.id]">{{ paper.title }}</a></h3>
          <p class="authors">
            <strong>Authors:</strong> {{ paper.authors.join(', ') }}
          </p>
          <p class="abstract">{{ paper.abstract }}</p>
          <div class="paper-meta">
            <span class="keywords">
              <strong>Keywords:</strong> {{ paper.keywords.join(', ') }}
            </span>
            <span class="publication-date" *ngIf="paper.publicationDate">
              <strong>Published:</strong> {{ paper.publicationDate | date }}
            </span>
            <span class="status" [class]="paper.status">
              {{ paper.status | titlecase }}
            </span>
          </div>
        </div>
      </div>
      
      <ng-template #noPapers>
        <p class="no-results">No papers found matching your criteria.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .paper-list-container {
      padding: 20px;
    }
    .search-filter {
      margin-bottom: 20px;
    }
    .search-filter input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .paper-item {
      border: 1px solid #eee;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
    .paper-item h3 {
      margin-top: 0;
    }
    .paper-item h3 a {
      color: #0066cc;
      text-decoration: none;
    }
    .abstract {
      margin: 10px 0;
    }
    .paper-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 15px;
      font-size: 0.9rem;
    }
    .status {
      padding: 3px 8px;
      border-radius: 3px;
      font-weight: bold;
    }
    .draft {
      background-color: #f8f9fa;
    }
    .submitted {
      background-color: #fff3cd;
    }
    .published {
      background-color: #d4edda;
    }
    .rejected {
      background-color: #f8d7da;
    }
    .no-results {
      text-align: center;
      padding: 40px;
      font-style: italic;
      color: #666;
    }
  `]
})
export class PaperListComponent implements OnInit {
  papers: Paper[] = [];
  searchQuery: string = '';
  
  constructor(
    private paperService: PaperService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.searchPapers();
    });
  }
  
  searchPapers(): void {
    this.paperService.searchPapers(this.searchQuery).subscribe(results => {
      this.papers = results;
    });
  }
}