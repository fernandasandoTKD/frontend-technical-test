import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../core/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [MatPaginator, MatTableModule, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent  implements OnInit{
/**
 * Declaración de varibles y creación de columnas para tabla
 */

  displayedColumns: string[] = ['image', 'name', 'status', 'species', 'gender'];
  dataSource = new MatTableDataSource<any>([]);
  totalCharacters = 0;

  /* Dclaración  de child para paginación */

  @ViewChild(MatPaginator) paginator!: MatPaginator;
/**
 * Constructor del componente CharacterListComponent
 * @param apiService Servicio para realizar llamadas a la API de personajes
 */
  constructor( private apiService: ApiService){}


/**
 * Método de inicialización del componente que carga los personajes
 * Se ejecuta al icializar el componente y carga la primera página de personajes
 */
  async ngOnInit() {
    await this.loadCharacters(1);
  }


  /**
   * Método para manejar cambios de página
   * @param event Evento de cambio de página que contiene información del nuevo índice
   * Convierte el índice de página del evento a la página correspondiente para la API
   */

  async onPageChange(event: any) {
    const pageIndex = event.pageIndex + 1;
    await this.loadCharacters(pageIndex);
  }



/**
 * Método para cargar personajes desde la API
 * @param page Número de página a cargar
 * Obtiene los persnajes de la página y actuliza la fuente de datos de la página
 */

  async loadCharacters(page: number = 1) {
    const response = await this.apiService.getCharacters(page);
    if (response?.results) {
      this.dataSource.data = response.results;
      this.totalCharacters = response.info.count;
    }
  }

}
