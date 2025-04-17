export interface Paper {
    id?: string;
    title: string;
    authors: string[];
    abstract: string;
    keywords: string[];
    content: string;
    publicationDate?: Date;
    status: 'draft' | 'submitted' | 'published' | 'rejected';
    file?: File;
  }