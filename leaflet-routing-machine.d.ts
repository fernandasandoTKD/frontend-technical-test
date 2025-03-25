declare module 'leaflet-routing-machine' {
  import * as L from 'leaflet';

  namespace L {
    namespace Routing {
      function control(options?: any): L.Control;
    }
  }

  export = L.Routing;
}
