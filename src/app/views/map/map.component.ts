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
      console.warn('El mapa no se renderiza en SSR.');
      return;
    }

    let L: any;
    try {
      const leaflet = await import('leaflet');
      console.log('🚀 Leaflet importado:', leaflet); // 👉 Agregar log para depurar
      L = leaflet.default ?? leaflet; // ✅ Asegurar que L se asigne correctamente
    } catch (error) {
      console.error('🚨 Error al importar Leaflet:', error);
      return;
    }

    if (!L || !L.map) {
      console.error('🚨 Leaflet no se cargó correctamente en producción:', L);
      return;
    }

    this.map = L.map('map').setView(this.startPoint, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker(this.startPoint).addTo(this.map).bindPopup('Punto de inicio').openPopup();
    L.marker(this.endPoint).addTo(this.map).bindPopup('Punto final');
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
