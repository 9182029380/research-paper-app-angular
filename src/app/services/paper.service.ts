import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Paper } from '../models/paper.model';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  private papers: Paper[] = [
    {
      id: '1',
      title: 'Advances in Machine Learning',
      authors: ['John Doe', 'Jane Smith'],
      abstract: 'This paper discusses recent advances in machine learning techniques.',
      keywords: ['machine learning', 'AI', 'deep learning'],
      content: 'Content of the paper goes here...',
      publicationDate: new Date('2025-01-15'),
      status: 'published'
    },
    {
      id: '2',
      title: 'Quantum Computing: A New Era',
      authors: ['Robert Johnson', 'Lisa Wang'],
      abstract: 'An overview of quantum computing and its applications.',
      keywords: ['quantum computing', 'quantum physics', 'computing'],
      content: 'Content of the paper goes here...',
      publicationDate: new Date('2025-02-20'),
      status: 'published'
    }
  ];

  private papersSubject = new BehaviorSubject<Paper[]>(this.papers);

  getPapers(): Observable<Paper[]> {
    return this.papersSubject.asObservable();
  }

  getPaperById(id: string): Observable<Paper | undefined> {
    const paper = this.papers.find(p => p.id === id);
    return of(paper);
  }

  addPaper(paper: Paper): void {
    paper.id = Date.now().toString();
    paper.status = 'draft';
    this.papers.push(paper);
    this.papersSubject.next([...this.papers]);
  }

  updatePaper(updatedPaper: Paper): void {
    const index = this.papers.findIndex(p => p.id === updatedPaper.id);
    if (index !== -1) {
      this.papers[index] = updatedPaper;
      this.papersSubject.next([...this.papers]);
    }
  }

  submitPaper(paperId: string): void {
    const paper = this.papers.find(p => p.id === paperId);
    if (paper && paper.status === 'draft') {
      paper.status = 'submitted';
      this.papersSubject.next([...this.papers]);
    }
  }

  searchPapers(query: string): Observable<Paper[]> {
    if (!query.trim()) {
      return of(this.papers);
    }
    
    const filteredPapers = this.papers.filter(paper => 
      paper.title.toLowerCase().includes(query.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(query.toLowerCase()) ||
      paper.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())) ||
      paper.authors.some(author => author.toLowerCase().includes(query.toLowerCase()))
    );
    
    return of(filteredPapers);
  }
}
