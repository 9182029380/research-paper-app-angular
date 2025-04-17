import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaperService } from '../../services/paper.service';
import { Paper } from '../../models/paper.model';

@Component({
  selector: 'app-my-papers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-papers-container">
      <h2>My Papers</h2>
      
      <div class="paper-status-nav">
        <button 
          [class.active]="currentStatus === 'all'" 
          (click)="filterPapers('all')">
          All
        </button>
        <button 
          [class.active]="currentStatus === 'draft'" 
          (click)="filterPapers('draft')">
          Drafts
        </button>
        <button 
          [class.active]="currentStatus === 'submitted'" 
          (click)="filterPapers('submitted')">
          Submitted
        </button>
        <button 
          [class.active]="currentStatus === 'published'" 
          (click)="filterPapers('published')">
          Published
        </button>
        <button 
          [class.active]="currentStatus === 'rejected'" 
          (click)="filterPapers('rejected')">
          Rejected
        </button>
      </div>
      
      <div class="papers-grid" *ngIf="filteredPapers.length > 0; else noPapers">
        <div 
          class="paper-card" 
          *ngFor="let paper of filteredPapers" 
          [class]="paper.status">
          <h3><a [routerLink]="['/papers', paper.id]">{{ paper.title }}</a></h3>
          <p class="paper-status">{{ paper.status | titlecase }}</p>
          <p class="paper-date" *ngIf="paper.publicationDate">
            {{ paper.publicationDate | date }}
          </p>
          <div class="paper-actions">
            <a [routerLink]="['/papers', paper.id]" class="view-btn">View</a>
            <a *ngIf="paper.status === 'draft'" [routerLink]="['/submit', paper.id]" class="edit-btn">Edit</a>
            <button 
              *ngIf="paper.status === 'draft'" 
              class="submit-btn" 
              (click)="submitPaper(paper.id || '')">
              Submit
            </button>
          </div>
        </div>
      </div>
      
      <ng-template #noPapers>
        <div class="no-papers">
          <p>You haven't created any papers yet.</p>
          <a routerLink="/submit" class="create-btn">Create New Paper</a>
        </div>
      </ng-template>
      
      <div class="new-paper">
        <a routerLink="/submit" class="create-btn">+ Create New Paper</a>
      </div>
    </div>
  `,
  styles: [`
    .my-papers-container {
      padding: 20px;
    }
    .paper-status-nav {
      display: flex;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .paper-status-nav button {
      background: none;
      border: none;
      padding: 10px 15px;
      margin-right: 10px;
      cursor: pointer;
      font-weight: bold;
      color: #666;
    }
    .paper-status-nav button.active {
      color: #0066cc;
      border-bottom: 2px solid #0066cc;
    }
    .papers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .paper-card {
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 20px;
      position: relative;
    }
    .paper-card.draft { border-left: 4px solid #f8f9fa; }
    .paper-card.submitted { border-left: 4px solid #fff3cd; }
    .paper-card.published { border-left: 4px solid #d4edda; }
    .paper-card.rejected { border-left: 4px solid #f8d7da; }
    .paper-card h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }
    .paper-card h3 a {
      color: #0066cc;
      text-decoration: none;
    }
    .paper-status {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 3px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .paper-date {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    .paper-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    .paper-actions a, .paper-actions button {
      padding: 5px 10px;
      border-radius: 3px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: bold;
    }
    .view-btn {
      background-color: #e9ecef;
      color: #495057;
    }
    .edit-btn {
      background-color: #e7f5ff;
      color: #1971c2;
    }
    .submit-btn {
      background-color: #0066cc;
      color: white;
      border: none;
      cursor: pointer;
    }
    .no-papers {
      text-align: center;
      padding: 50px 0;
    }
    .new-paper {
      margin-top: 30px;
      text-align: right;
    }
    .create-btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #0066cc;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
  `]
})
export class MyPapersComponent implements OnInit {
  papers: Paper[] = [];
  filteredPapers: Paper[] = [];
  currentStatus: string = 'all';
  
  constructor(private paperService: PaperService) {}
  
  ngOnInit(): void {
    this.paperService.getPapers().subscribe(papers => {
      // In a real app, you would filter by the logged-in user
      this.papers = papers;
      this.filterPapers('all');
    });
  }
  
  filterPapers(status: string): void {
    this.currentStatus = status;
    
    if (status === 'all') {
      this.filteredPapers = [...this.papers];
    } else {
      this.filteredPapers = this.papers.filter(paper => paper.status === status);
    }
  }
  
  submitPaper(paperId: string): void {
    this.paperService.submitPaper(paperId);
    // Update status in the local array
    const paper = this.papers.find(p => p.id === paperId);
    if (paper) {
      paper.status = 'submitted';
    }
    this.filterPapers(this.currentStatus);
  }
}
