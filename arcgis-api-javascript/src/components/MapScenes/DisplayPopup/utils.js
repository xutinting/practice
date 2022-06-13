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
        basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700], //Longitude, latitude
        zoom: 13
    });

}

export function displayAttributes() {
    // Define a pop-up for Trailheads
    const popupTrailheads = {
        "title": "Trailhead",
        "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    };
    /* popupTrailheads里的content和trailheads里的outFields进行交互 */
    const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupTrailheads
    });

    map.add(trailheads);
    console.log("well");
}

export function displayCharts() {
    // Define a popup for Trails
    const popupTrails = {
        title: "Trail Information",
        content: [{
            type: "media",
            mediaInfos: [{
                type: "column-chart",
                caption: "min elevation & max elevation",
                value: {
                    fields: ["ELEV_MIN", "ELEV_MAX"],
                    normalizeField: null,
                    tooltipField: "Min and max elevation values"
                }
            }]
        }]
    }

    const trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "ELEV_GAIN"],
        popupTemplate: popupTrails
    });

    map.add(trails, 0);
}

export function displayTable() {
    // Define popup for Parks and Open Spaces
    const popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
            "type": "fields",
            "fieldInfos": [
                {
                    "fieldName": "AGNCY_NAME",
                    "label": "Agency",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "TYPE",
                    "label": "Type",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "ACCESS_TYP",
                    "label": "Access",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },

                {
                    "fieldName": "GIS_ACRES",
                    "label": "Acres",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },

                    "stringFieldOption": "text-box"
                }
            ]
        }]
    };

    const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES", "TRLS_MI", "TOTAL_GOOD", "TOTAL_FAIR", "TOTAL_POOR"],
        popupTemplate: popupOpenspaces
    });

    map.add(openspaces, 0);
}