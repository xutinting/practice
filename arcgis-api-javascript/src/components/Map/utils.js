/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Collection from '@arcgis/core/core/Collection';
import Graphic from '@arcgis/core/Graphic';

export function init() {
  const map = new Map({
    basemap: 'topo-vector',
  });

  const view = new MapView({
    container: 'viewDiv',
    center: [95, 32],
    zoom: 4,
    map: map,
  });

  const collection = new Collection();

  const layer = new FeatureLayer({
    title: 'map layer',
    geometryType: 'polygon',
    source: collection,
  });

  map.add(layer);

  return { map, layer, view, collection };
}

export function createGraphic(coords) {
  return new Graphic({
    geometry: {
      type: 'polygon',
      rings: coords,
    },
  });
}
