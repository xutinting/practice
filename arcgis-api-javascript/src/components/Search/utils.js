/* eslint-disable */

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Locate from "@arcgis/core/widgets/Locate";
import Track from "@arcgis/core/widgets/Track";
import Graphic from "@arcgis/core/Graphic";
import Search from "@arcgis/core/widgets/Search";

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
        center: [18.9553, 69.6492], //Longitude, latitude
        zoom: 13
    });
}

export function displayLocation() {
    let locateWidget = new Locate({
        view: view,   // Attaches the Locate button to the view
        graphic: new Graphic({
            symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
            // graphic placed at the location of the user when found
        })
    });

    view.ui.add(locateWidget, "top-left");
    // Use the goToOverride to provide your own custom zoom 
    // functionality for the widget. In this case, it will zoom the map to a scale of 1500. Add the widget to the top left of the view.

    const track = new Track({
        view: view,
        graphic: new Graphic({
            symbol: {
                type: "simple-marker",
                size: "12px",
                color: "green",
                outline: {
                    color: "#efefef",
                    width: "1.5px"
                }
            }
        }),
        useHeadingEnabled: false
    });

    view.ui.add(track, "top-right");

}

export function serarchAddr() {
    const places = ["Choose a place type...", "Parks and Outdoors", "Coffee shop", "Gas station", "Food", "Hotel"];

    const select = document.createElement("select", "");
    select.setAttribute("class", "esri-widget esri-select");
    select.setAttribute("style", "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em");

    places.forEach(function (p) {
        const option = document.createElement("option");
        option.value = p;
        option.innerHTML = p;
        select.appendChild(option);
    });

    view.ui.add(select, "top-right");

    const locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

    // Find places and add them to the map
    function findPlaces(category, pt) {
        locator.addressToLocations(locatorUrl, {
            location: pt,
            categories: [category],
            maxLocations: 25,
            outFields: ["Place_addr", "PlaceName"]
        })

            .then(function (results) {
                view.popup.close();
                view.graphics.removeAll();

                results.forEach(function (result) {
                    view.graphics.add(
                        new Graphic({
                            attributes: result.attributes,  // Data attributes returned
                            geometry: result.location, // Point returned
                            symbol: {
                                type: "simple-marker",
                                color: "#000000",
                                size: "12px",
                                outline: {
                                    color: "#ffffff",
                                    width: "2px"
                                }
                            },

                            popupTemplate: {
                                title: "{PlaceName}", // Data attribute names
                                content: "{Place_addr}"
                            }
                        }));
                });

            });

    }

    // Search for places in center of map
    view.watch("stationary", function (val) {
        if (val) {
            findPlaces(select.value, view.center);
        }
    });

    // Listen for category changes and find places
    select.addEventListener('change', function (event) {
        findPlaces(event.target.value, view.center);
    });


}

