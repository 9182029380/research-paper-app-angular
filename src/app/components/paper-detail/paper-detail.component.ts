import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../models/paper.model';

@Component({
  selector: 'app-paper-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="paper-detail-container" *ngIf="paper; else loading">
      <div class="paper-header">
        <h2>{{ paper.title }}</h2>
        <div class="paper-meta">
          <p class="authors"><strong>Authors:</strong> {{ paper.authors.join(', ') }}</p>
          <p class="keywords"><strong>Keywords:</strong> {{ paper.keywords.join(', ') }}</p>
          <p class="status" [class]="paper.status">
            <strong>Status:</strong> {{ paper.status | titlecase }}
          </p>
          <p class="date" *ngIf="paper.publicationDate">
            <strong>Published:</strong> {{ paper.publicationDate | date:'longDate' }}
          </p>
        </div>
      </div>
      
      <div class="paper-abstract">
        <h3>Abstract</h3>
        <p>{{ paper.abstract }}</p>
      </div>
      
      <div class="paper-content">
        <h3>Content</h3>
        <div>{{ paper.content }}</div>
      </div>
      
      <div class="actions" *ngIf="paper.status === 'draft'">
        <button class="edit-btn" (click)="editPaper()">Edit</button>
        <button class="submit-btn" (click)="submitPaper()">Submit</button>
      </div>
    </div>
    
    <ng-template #loading>
      <div class="loading">Loading paper...</div>
    </ng-template>
  `,
  styles: [`
    .paper-detail-container {
      padding: 20px;
    }
    .paper-header {
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .paper-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
      margin-top: 20px;
    }
    .paper-abstract, .paper-content {
      margin-bottom: 30px;
    }
    .paper-content {
      line-height: 1.6;
    }
    .actions {
      margin-top: 30px;
      display: flex;
      gap: 15px;
    }
    .actions button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .edit-btn {
      background-color: #e9ecef;
      color: #495057;
    }
    .submit-btn {
      background-color: #0066cc;
      color: white;
    }
    .status {
      padding: 5px 10px;
      border-radius: 4px;
      display: inline-block;
    }
    .draft { background-color: #f8f9fa; }
    .submitted { background-color: #fff3cd; }
    .published { background-color: #d4edda; }
    .rejected { background-color: #f8d7da; }
    .loading {
      text-align: center;
      padding: 50px;
      font-style: italic;
      color: #666;
    }
  `]
})
export class PaperDetailComponent implements OnInit {
  paper?: Paper;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paperService: PaperService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paperId = params.get('id');
      if (paperId) {
        this.paperService.getPaperById(paperId).subscribe(paper => {
          this.paper = paper;
        });
      }
    });
  }
  
  editPaper(): void {
    if (this.paper) {
      this.router.navigate(['/submit', this.paper.id]);
    }
  }
  
  submitPaper(): void {
    if (this.paper?.id) {
      this.paperService.submitPaper(this.paper.id);
      this.paper.status = 'submitted';
    }
  }
}
