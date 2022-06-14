/* eslint-disable */

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Editor from "@arcgis/core/widgets/Editor";

let map;
let view;

export function InitializeMap() {

    esriConfig.apiKey = "AAPK1c8f781f29174fc0880cce848cf5a7e6qhXfShWA74tQHbzvL-KwujiR0Os5ik68ET-taRuJFgeKadcLfDeQqxZQW9TXlxGW";

    map = new Map({
        basemap: "arcgis-light-gray", // Basemap layer service
        layers: [myPointsFeatureLayer]
    });
    
    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-40, 28],
        zoom: 2
    });
}

export function queryLayerSQL() {
    // SQL query array
    const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'", "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
    let whereClause = parcelLayerSQL[0];

    // Add SQL UI
    const select = document.createElement("select", "");
    select.setAttribute("class", "esri-widget esri-select");
    select.setAttribute("style", " width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    parcelLayerSQL.forEach(function (query) {
        let option = document.createElement("option");
        option.innerHTML = query;
        option.value = query;
        select.appendChild(option);
    });

    view.ui.add(select, "top-right");

    // // Listen for changes
    select.addEventListener('change', (event) => {
        whereClause = event.target.value;
        queryFeatureLayer(view.extent);
    });

    // // Get query layer and set up query
    const parcelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });

    function queryFeatureLayer(extent) {

        const parcelQuery = {
            where: whereClause,  // Set by select element
            spatialRelationship: "intersects", // Relationship operation to apply
            geometry: extent, // Restricted to visible extent of the map
            outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"], // Attributes to return
            returnGeometry: true
        };
        parcelLayer.queryFeatures(parcelQuery)

            .then((results) => {
                displayResults(results);
                console.log("Feature count: " + results.features.length)
                function displayResults(results) {
                    // Create a blue polygon
                    const symbol = {
                        type: "simple-fill",
                        color: [20, 130, 200, 0.5],
                        outline: {
                            color: "white",
                            width: .5
                        },
                    };

                    const popupTemplate = {
                        title: "Parcel {APN}",
                        content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
                    };

                    // Assign styles and popup to features
                    results.features.map((feature) => {
                        feature.symbol = symbol;
                        feature.popupTemplate = popupTemplate;
                        return feature;
                    });
                }

                // Clear display
                view.popup.close();
                view.graphics.removeAll();
                // Add features to graphics layer
                view.graphics.addMany(results.features);
                view.goTo(results.features);

            }).catch((error) => {
                console.log(error.error);
            });


    };


}

export function queryLayerSpatial() {
    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.03000], //Longitude, latitude
        zoom: 13
    });
    // Add sketch widget
    const graphicsLayerSketch = new GraphicsLayer();
    map.add(graphicsLayerSketch);

    const sketch = new Sketch({
        layer: graphicsLayerSketch,
        view: view,
        creationMode: "update" // Auto-select
    });

    view.ui.add(sketch, "top-right");

    // Add sketch events to listen for and execute query
    sketch.on("update", (event) => {
        // Create
        if (event.state === "start") {
            queryFeaturelayer(event.graphics[0].geometry);
        }
        if (event.state === "complete") {
            graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
        }
        // Change
        if (event.toolEventInfo && (event.toolEventInfo.type === "scale-stop" || event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "move-stop")) {
            queryFeaturelayer(event.graphics[0].geometry);
        }
    });

    // Reference query layer
    const parcelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });

    function queryFeaturelayer(geometry) {

        const parcelQuery = {
            spatialRelationship: "intersects", // Relationship operation to apply
            geometry: geometry,  // The sketch feature geometry
            outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"], // Attributes to return
            returnGeometry: true
        };

        parcelLayer.queryFeatures(parcelQuery)
            .then((results) => {
                // Show features (graphics)
                function displayResults(results) {

                    // Create a blue polygon
                    const symbol = {
                        type: "simple-fill",
                        color: [20, 130, 200, 0.5],
                        outline: {
                            color: "white",
                            width: .5
                        },
                    };

                    const popupTemplate = {
                        title: "Parcel {APN}",
                        content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
                    };
                    // Set symbol and popup
                    results.features.map((feature) => {
                        feature.symbol = symbol;
                        feature.popupTemplate = popupTemplate;
                        return feature;
                    });
                    // Clear display
                    view.popup.close();
                    view.graphics.removeAll();
                    // Add features to graphics layer
                    view.graphics.addMany(results.features);

                };
                displayResults(results);
                console.log("Feature count: " + results.features.length)

            }).catch((error) => {
                console.log(error);
            });


    }
}

export function filterLayerSQL() {
    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700], // Longitude, latitude
        zoom: 12
    });

    // Create a UI with the filter expressions
    const sqlExpressions = ["Choose a SQL where clause...", "Roll_LandValue < 200000", "TaxRateArea = 10853", "Bedrooms5 > 0", "UseType = 'Residential'", "Roll_RealEstateExemp > 0"];
    // UI
    const selectFilter = document.createElement("select");
    selectFilter.setAttribute("class", "esri-widget esri-select");
    selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

    sqlExpressions.forEach(function (sql) {
        let option = document.createElement("option");
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
    });
    view.ui.add(selectFilter, "top-right");

    /* Create a feature layer to filter */
    // Add a feature layer to map with all features visible on client (no filter)
    const featureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: {
            title: "{UseType}",
            content: "Description: {UseDescription}. Land value: {Roll_LandValue}"
        },
        definitionExpression: "1=0"
    });

    map.add(featureLayer);

    // Server-side filter
    function setFeatureLayerFilter(expression) {
        featureLayer.definitionExpression = expression;
    }

    // Event listener
    selectFilter.addEventListener('change', function (event) {
        setFeatureLayerFilter(event.target.value);
    });
}

export function editFeatureData() {
    view = new MapView({
        ontainer: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    })
    /* Create an editor widget */

    const editor = new Editor({
        view: view,
    });

    // Add widget to the view
    view.ui.add(editor, "top-right");
}