import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from '../../views/character-list/character-list.component';
import { CharacterDetailComponent } from '../../views/character-detail/character-detail.component';
import { CharacterExistsGuard } from '../../guards/character-exists.guard';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  {
    path: ':id',
    component: CharacterDetailComponent,
    canActivate: [CharacterExistsGuard],
    data: { title: 'Detalle personaje' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
