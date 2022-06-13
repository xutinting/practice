/* eslint-disable */

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Legend from "@arcgis/core/widgets/Legend";

let map;
let view;

export function InitializeMap() {
    esriConfig.apiKey = "AAPK1c8f781f29174fc0880cce848cf5a7e6qhXfShWA74tQHbzvL-KwujiR0Os5ik68ET-taRuJFgeKadcLfDeQqxZQW9TXlxGW";

    const vtlLayer = new VectorTileLayer({
        url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
    });

    map = new Map({
        basemap: "arcgis-light-gray", // Basemap layer service
        layers: [vtlLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        center: [-118.80543, 34.02700],
        zoom: 13,
        map: map
    });

}

export function displayWebMap() {

    esriConfig.apiKey = "AAPK1c8f781f29174fc0880cce848cf5a7e6qhXfShWA74tQHbzvL-KwujiR0Os5ik68ET-taRuJFgeKadcLfDeQqxZQW9TXlxGW";

    map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });

    const webmap = new WebMap({
        portalItem: {
            id: "41281c51f9de45edaf1c8ed44bb10e30"
        }
    });

    view = new MapView({
        container: "viewDiv",
        map: webmap
    });
    // add wedget
    const scalebar = new ScaleBar({
        view: view,
        container: "scalebar"
    });
    view.ui.add(scalebar, "bottom-right");//调节位置?
    console.log("Done");
    // add legend
    const legend = new Legend({
        view: view
    });
    view.ui.add(legend, "top-right");
}