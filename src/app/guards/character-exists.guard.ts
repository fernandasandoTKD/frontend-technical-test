import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterExistsGuard implements CanActivate {

  /**
   * Constructor del guard CharacterExistsGuard
   * @param apiService Servicio para realizar verificaciones de API
   * @param router Servicio de navegación para redireccionar
   */
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  /**
   * Método para determinar si una ruta puede ser activada
   * @param route Instantánea de la ruta que se está intentando activar
   * @returns Indica si la ruta puede ser activada
   */
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // Obtener el ID de la ruta y convertir a número
    try {
      const id = Number(route.paramMap.get('id'));
      // Validación
      if (isNaN(id)) throw new Error('ID inválido');

        // Intenta obtener el personaje por su ID
      const character = await this.apiService.getCharacterById(id);

      if (character) return true;
    } catch (error) {
      console.error('Error en CharacterGuard:', error);
    }

    this.router.navigate(['/not-found']);
    return false;
  }

}
