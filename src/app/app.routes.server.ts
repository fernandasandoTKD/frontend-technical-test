import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'api-ricky/:id',
    renderMode: RenderMode.Client 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

