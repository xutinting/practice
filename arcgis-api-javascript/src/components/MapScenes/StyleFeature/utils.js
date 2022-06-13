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

    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    });

}

export function addPointFeature() {
    // renderer
    const trailheadsRenderer = {
        "type": "simple",
        "symbol": {
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "18px",
            "height": "18px"
        }
    };
    // labelingInfo
    const trailheadsLabels = {
        symbol: {
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
            }
        },

        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.TRL_NAME"
        }
    };
    //Trailheads feature layer (points)
    const trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: trailheadsRenderer,
        labelingInfo: [trailheadsLabels]
    });
    map.add(trailheadsLayer);
}

export function addLineFeature() {
    // line renderer
    const trailsRenderer = {
        type: "simple",
        symbol: {
            color: "#BA55D3",
            type: "simple-line",
            style: "solid"
        },
        visualVariables: [
            {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
            }
        ]
    };
    //Trails feature layer (lines)
    const trailsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: trailsRenderer,
        opacity: .6
    });
    map.add(trailsLayer, 0);

    // Add bikes only trails
    const bikeTrailsRenderer = {
        type: "simple",
        symbol: {
            type: "simple-line",
            style: "short-dot",
            color: "#aa5f39",
            width: "5px"
        }
    };
    const bikeTrails = new FeatureLayer({
        url:
            "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: bikeTrailsRenderer,
        definitionExpression: "USE_BIKE = 'YES'"
    });

    map.add(bikeTrails, 1);
}

export function addPolygonStyle() {
    function createFillSymbol(value, color) {
        return {
            "value": value,
            "symbol": {
                "color": color,
                "type": "simple-fill",
                "style": "solid",
                "outline": {
                    "style": "none"
                }
            },
            "label": value
        };
    };

    const openSpacesRenderer = {
        type: "unique-value",
        field: "TYPE",
        uniqueValueInfos: [
            createFillSymbol("Natural Areas", "#2E509E"),
            createFillSymbol("Regional Open Space", "#FF1A1A"),
            createFillSymbol("Local Park", "#16DE42"),
            createFillSymbol("Regional Recreation Park", "#903300")
        ]
    };

    const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        renderer: openSpacesRenderer,
        opacity: 0.8
    });

    // Add the layer
    map.add(openspaces, 0);
}