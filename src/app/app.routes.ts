import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaperListComponent } from './components/paper-list/paper-list.component';
import { PaperDetailComponent } from './components/paper-detail/paper-detail.component';
import { PaperFormComponent } from './components/paper-form/paper-form.component';
import { MyPapersComponent } from './components/my-papers/my-papers.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'papers', component: PaperListComponent },
  { path: 'papers/:id', component: PaperDetailComponent },
  { path: 'submit', component: PaperFormComponent },
  { path: 'submit/:id', component: PaperFormComponent },
  { path: 'my-papers', component: MyPapersComponent },
  { path: '**', redirectTo: '' }
];
