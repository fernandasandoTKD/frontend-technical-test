import { Routes } from '@angular/router';
import { CharacterListComponent } from './views/character-list/character-list.component';
import { CharacterDetailComponent } from './views/character-detail/character-detail.component';
import { CharacterExistsGuard } from './guards/character-exists.guard';
import { NotFoundViewComponent } from './views/not-found-view/not-found-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api-ricky',
    pathMatch: 'full'
  },
  {
    path: 'api-ricky',
    component: CharacterListComponent,
    data: { title: 'Consumo API Ricky Morty' }

  },
  {
    path: 'api-ricky/:id',
    component:CharacterDetailComponent,
    canActivate: [CharacterExistsGuard],
    data: { title: 'Detalle personaje' }

  },

  {
    path: 'not-found',
    component: NotFoundViewComponent,
    data: { title: 'Detalle no encontrado' }

  }
];
