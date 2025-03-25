import { Routes } from '@angular/router';
import { NotFoundViewComponent } from './views/not-found-view/not-found-view.component';
import { MapComponent } from './views/map/map.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api-ricky',
    pathMatch: 'full'
  },
  {
    path: 'api-ricky',
    loadChildren: () => import('./modules/character/character.module').then(m => m.CharacterModule),
    data: { title: 'Consumo API Ricky Morty' }
  },
  {
    path:'api-maps',
    component:MapComponent,
    data: { title: 'Consumo API Mapa' }
  },

  {
    path: 'not-found',
    component: NotFoundViewComponent,
    data: { title: 'Detalle no encontrado' }

  }
];
