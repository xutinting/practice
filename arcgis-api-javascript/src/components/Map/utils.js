/* eslint-disable */
import citiesArray from "@/config/cities.json";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { getCityJson } from "@/api/index.js"

export function init() {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        center: [95, 32],
        zoom: 4,
        map: map
    });

    // 导入Json数据
    citiesArray.forEach(city => {
        getCityJson(city).then(data => {
            console.log(data);
        })
    });
}