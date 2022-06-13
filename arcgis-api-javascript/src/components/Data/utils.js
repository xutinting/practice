/* eslint-disable */

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

let map;
let view;

export function InitializeMap() {
    esriConfig.apiKey = "AAPK1c8f781f29174fc0880cce848cf5a7e6qhXfShWA74tQHbzvL-KwujiR0Os5ik68ET-taRuJFgeKadcLfDeQqxZQW9TXlxGW";

    map = new Map({
        basemap: "arcgis-light-gray", // Basemap layer service
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.03000], //Longitude, latitude
        zoom: 13
    });

}

export function queryLayerSQL() {
    // SQL query array
    const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'", "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
    let whereClause = parcelLayerSQL[0];

    // Add SQL UI
    const select = document.createElement("select", "");
    select.setAttribute("class", "esri-widget esri-select");
    select.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    parcelLayerSQL.forEach(function (query) {
        let option = document.createElement("option");
        option.innerHTML = query;
        option.value = query;
        select.appendChild(option);
    });

    view.ui.add(select, "top-right");

    // Listen for changes
    select.addEventListener('change', (event) => {
        whereClause = event.target.value;
    });
}