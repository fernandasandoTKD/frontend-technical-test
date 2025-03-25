import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  // Mapa que se va a renderizar  luego de renderizar el componente
  private map!: any;
   // Coordenadas de inicio y fin
  private startPoint: [number, number] = [4.711, -74.0721];
  private endPoint: [number, number] = [4.700, -74.0500];

  // Variable para almacenar la distancia entre puntos
  distanceKm: number = 0;

  /**
   * Constructor del MapComponent
   * @param platformId Identificador de la plataforma para determinar si se ejecuta en navegador
   */
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}


  /**
   * Método que se ejecuta después de que la vista ha sido completamente inicializada
   * Es asíncrono para manejar importaciones dinámicas
   */
  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      // Solo ejecuta código si está en un navegador
      return;
    }

    //Importación dinámicas de liberías
    let L: any;
    try {
      // Importación de forma Leaflet y Routing Machine de forma asíncrona
      L = await import('leaflet');
      await import('leaflet-routing-machine');
    } catch (error) {
      console.error(" Error al importar Leaflet:", error);
      return;
    }


    //Validadión de elemento mapa
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error("Error: No se encontró el elemento con id 'map'.");
      return;
    }


    // Se iniciliza el mapa con coordinadas de inicio y zoom
    this.map = L.map('map').setView(this.startPoint, 13);


    // títulos de   OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Marcadores de inicio y de fin
    L.marker(this.startPoint).addTo(this.map).bindPopup('Punto de inicio').openPopup();
    L.marker(this.endPoint).addTo(this.map).bindPopup('Punto final');


    // Llamado de función haversineDistance para calcular distancia
    this.distanceKm = this.haversineDistance(this.startPoint, this.endPoint);

  }



/**
   * Método para calcular la distancia entre dos puntos usando la fórmula de Haversine
   * @param start Coordenadas de inicio [latitud, longitud]
   * @param end Coordenadas de fin [latitud, longitud]
   * @returns Distancia en kilómetros
   */

  private haversineDistance(start: [number, number], end: [number, number]): number {

    // Convertir grados a radianes
    const toRad = (x: number) => x * Math.PI / 180;

    const [lat1, lon1] = start;
    const [lat2, lon2] = end;

    // Radio de la Tierra en km
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);


     // Cálculo de distancia usando la fórmula de Haversine
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  }
}
