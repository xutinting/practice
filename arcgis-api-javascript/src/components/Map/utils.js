/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import { getCityJson } from '@/api/index.js';

let map;
let view;

// 初始化地图
export function init() {
  map = new Map({
    basemap: 'topo-vector',
  });

  view = new MapView({
    container: 'viewDiv',
    center: [95, 35],
    zoom: 4.5,
    map: map,
  });
}

export function createPolygonGeometry(data) {
  if (data.features.length) {
    // 遍历data中的所有feature
    // for (let i = 0; i < data.features.length; i++) {
    // }
    // const polygon = {
    //   type: 'polygon',
    //   rings: data.features[0].geometry.coordinates,
    // };
    const polygon = new Polygon({
      rings: data.features[0].geometry.coordinates[0],
    });
    const simpleFillSymbol = {
      type: 'simple-fill',
      color: [227, 139, 79, 0.8], // Orange, opacity 80%
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };
    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    });
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    graphicsLayer.add(polygonGraphic);
    view.goTo(polygonGraphic);
  }
}

export function insertCity2Map(city) {
  const contained = map.layers.find(layer => layer.title === city);
  if (contained) {
    return view.goTo(contained.graphics);
  }
  getCityJson(city).then(data => {
    const simpleFillSymbol = {
      type: 'simple-fill',
      color: [227, 139, 79, 0.8], // Orange, opacity 80%
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };
    const graphicsLayer = new GraphicsLayer({ title: city });
    data.features.forEach(feature => {
      feature.geometry.coordinates.forEach(coord => {
        const geometry = {
          type: 'polygon',
          rings: coord,
        };

        const polygonGraphic = new Graphic({
          geometry,
          symbol: simpleFillSymbol,
        });
        graphicsLayer.add(polygonGraphic);
      });
    });
    map.add(graphicsLayer);
    const opts  = {
      duration:1500
    };
    view.goTo(graphicsLayer.graphics,opts);
  });
}
