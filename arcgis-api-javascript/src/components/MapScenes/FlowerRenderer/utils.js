import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp";
import AlgorithmicColorRamp from "@arcgis/core/rest/support/AlgorithmicColorRamp";
import Color from "@arcgis/core/Color";
import Legend from "@arcgis/core/widgets/Legend";
import Fullscreen from "@arcgis/core/widgets/Fullscreen";

export function init() {
    // serves as a basemap layer
    const spilhausBasemap = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Spilhaus_Vibrant_Basemap/MapServer",
        effect: "saturate(50%) brightness(0.8)" // dim brightness to create darker style basemap
    });

    const colorRamp = new MultipartColorRamp({
        colorRamps: [
            new AlgorithmicColorRamp({
                fromColor: new Color([20, 100, 150, 255]),
                toColor: new Color([70, 0, 150, 255])
            }),
            new AlgorithmicColorRamp({
                fromColor: new Color([70, 0, 150, 255]),
                toColor: new Color([170, 0, 120, 255])
            }),
            new AlgorithmicColorRamp({
                fromColor: new Color([170, 0, 120, 255]),
                toColor: new Color([230, 100, 60, 255])
            }),
            new AlgorithmicColorRamp({
                fromColor: new Color([230, 100, 60, 255]),
                toColor: new Color([255, 170, 0, 255])
            }),
            new AlgorithmicColorRamp({
                fromColor: new Color([255, 170, 0, 255]),
                toColor: new Color([255, 255, 0, 255])
            }),
        ]
    });

    // sea surface temperature, visualized with raster stretch renderer
    const temperatureLayer = new ImageryTileLayer({
        url: "https://tiledimageservices.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/HyCOM_Surface_Temperature___Spilhaus/ImageServer",
        renderer: {
            colorRamp,
            "computeGamma": false,
            "gamma": [1],
            "useGamma": false,
            "stretchType": "min-max",
            "type": "raster-stretch"
        }
    });


    // ocean currents, visualized with flow renderer
    const currentsLayer = new ImageryTileLayer({
        url: "https://tiledimageservices.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Spilhaus_UV_ocean_currents/ImageServer",
        renderer: {
            type: "flow", // autocasts to FlowRenderer
            density: 1,
            maxPathLength: 10, // max length of a streamline will be 10
            trailWidth: "2px"
        },
        blendMode: "destination-in", // temperature layer will only display on top of this layer
    });


    const groupLayer = new GroupLayer({
        effect: "bloom(2, 0.5px, 0.0)", // apply bloom effect to make the colors pop
        layers: [temperatureLayer, currentsLayer]
    });


    const map = new Map({
        basemap: {
            baseLayers: [spilhausBasemap]
        },
        layers: [groupLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        scale: 40000000,
        center: [-289666, -3085785]
    });
    // add legend for temperature layer
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: temperatureLayer,
            title: "Sea surface temperature"
        }]
    });
    view.ui.add(legend, "top-right");

    // add fullscreen widget
    const fullscreen = new Fullscreen({
        view: view
    });
    view.ui.add(fullscreen, "top-left");
}