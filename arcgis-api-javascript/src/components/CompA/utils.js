import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export function init() {
    const map = new Map({
        basemap: "topo-vector",
    });
    new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        center: [15, 65], // longitude, latitude
    });
}