/* eslint-disable */

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Legend from "@arcgis/core/widgets/Legend";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";

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

export function displayWebScene() {
    esriConfig.apiKey = "AAPK1c8f781f29174fc0880cce848cf5a7e6qhXfShWA74tQHbzvL-KwujiR0Os5ik68ET-taRuJFgeKadcLfDeQqxZQW9TXlxGW";

    map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

    const webscene = new WebScene({
        portalItem: {
            id: "579f97b2f3b94d4a8e48a5f140a6639b"
        }
    });

    view = new SceneView({
        container: "viewDiv",
        map: webscene
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "top-right");

}