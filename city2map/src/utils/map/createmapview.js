/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { getCityJson } from '@/api/api_cities';

let map;
let view;

// 初始化地图
export function init() {
    map = new Map({
        basemap: "streets-vector",  // The initial basemap to toggle from
    });

    view = new MapView({
        container: 'viewDiv',
        center: [95, 35],
        zoom: 4.5,
        map: map,
    });
    // 添加ScaleBar
    const scalebar = new ScaleBar({
        view: view,
        container: 'scalebar',
        unit: 'metric'
    });
    view.ui.add(scalebar, "bottom-left");
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

        const opts = {
            duration: 1500
        };
        view.goTo(graphicsLayer.graphics, opts);
    });
}
// 计算面积
export function displayArea() {
    const measurementWidget = new AreaMeasurement2D({
        view: view
    });
    view.ui.add(measurementWidget, "top-right");
}

