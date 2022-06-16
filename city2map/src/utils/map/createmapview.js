/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Polygon from '@arcgis/core/geometry/Polygon';
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Measurement from "@arcgis/core/widgets/Measurement";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getCityJson } from '@/api/api_cities';

let map;
let view;

// 初始化地图
export function init() {
    map = new Map({
        basemap: "streets-vector",  // The initial basemap to toggle from
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [100, 30],
        zoom: 3,
    });
    // 添加ScaleBar
    const scalebar = new ScaleBar({
        view: view,
        container: 'scalebar',
        unit: 'metric'
    });
    view.ui.add(scalebar, "bottom-left");
    return { map, view };
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

//测量小部件
export function measure() {
    const measurement = new Measurement();
    // Set-up event handlers for buttons and click events
    const distanceButton = document.getElementById("distance");
    const areaButton = document.getElementById("area");
    const clearButton = document.getElementById("clear");

    distanceButton.addEventListener("click", function () {
        distanceMeasurement();
    });
    areaButton.addEventListener("click", function () {
        areaMeasurement();
    });
    clearButton.addEventListener("click", function () {
        clearMeasurements();
    });

    // Call the appropriate DistanceMeasurement2D
    function distanceMeasurement() {
        measurement.activeTool = "distance";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
    }

    // Call the appropriate AreaMeasurement2D
    function areaMeasurement() {
        measurement.activeTool = "area";
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
    }

    // Clears all measurements
    function clearMeasurements() {
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
    }
    measurement.view = view;
}



