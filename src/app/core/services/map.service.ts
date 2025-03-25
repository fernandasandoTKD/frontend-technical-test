import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class MapService extends BaseHttpService {

   /**
   * Método para obtener coordenadas geográficas de una dirección
   * @param address - Dirección en formato de texto para buscar
   * @returns Objeto con latitud y longitud
   * @throws Error si no se encuentran coordenadas o hay un problema en la solicitud
   */
  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    try {
       // Realiza una solicitud GET a la API de Nominatim y codificiación de direc para manejo de caracteres especiales
      const response = await this.get<Array<{ lat: string; lon: string }>>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      // verificación de respuesta no vacía
      if (!response || response.length === 0) {
        throw new Error('Ubicación no encontrada');
      }

      // Convertir coordenadas de string a number
      return { lat: parseFloat(response[0].lat), lng: parseFloat(response[0].lon) };
    } catch (error) {
      console.error('Error obteniendo coordenadas:', error);
      // Enlazar error para poder manejarlo
      throw error;
    }
  }
}

