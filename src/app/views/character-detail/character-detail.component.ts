import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-character-detail',
  imports: [MatCardModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnInit{

  /* Propieda para lamacer los datos de los personajes */
  character:any;


/**
 * Constructor del componente  CharacterDetailComponent
 * @param route Servicio para acceder a los parámetros de la ruta actual
 * @param apiService Servicio para realizar llamadas a la API de personajes
 * @param router Servicio de navegación para redireccionar entre rutas
 */

  constructor(private route: ActivatedRoute, private apiService : ApiService, private router: Router){}



/**
 * Método de inicialización del componente
 * Obtiene el ID del personaje desde la ruta y se reliza petición para cargar detalles
 */
  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.character = await this.apiService.getCharacterById(id);
    }
  }

/**
 * Método para navegar a la lista de personajes
 */
  navigateToList(){
    this.router.navigate(['/api-ricky']);
  }

}
