import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import PointCloudLayer from "@arcgis/core/layers/PointCloudLayer";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color";
import typeRendererCreator from "@arcgis/core/smartMapping/renderers/type";
import Legend from "@arcgis/core/widgets/Legend";
import promiseUtils from "@arcgis/core/core/promiseUtils";

export function init() {
    // Create Point Cloud Layer
    const pcLayer = new PointCloudLayer({
        url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer"
    });

    // Create Map and View
    const map = new Map({
        basemap: "gray-vector",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            heading: 210,
            tilt: 78,
            position: {
                x: -8249335,
                y: 4832005,
                z: 50.7,
                spatialReference: {
                    wkid: 3857
                }
            }
        }
    });
    view.ui.add("paneDiv", "bottom-left");
    view.ui.add(
        new Legend({
            view: view
        }),
        "bottom-right"
    );

    // stores generated renderers to avoid making service
    // calls for the same renderer multiple times
    const renderersByField = {
        RGB: null,
        CLASS_CODE: null,
        ELEVATION: null,
        INTENSITY: null
    };

    /**
     * Generates renderers based on the input field name. There are four
     * valid input field names: RGB, CLASS_CODE, ELEVATION, and INTENSITY
     */
    function getRenderer(fieldName) {
        // If the renderer is already generated, then return it
        if (renderersByField[fieldName]) {
            return promiseUtils.resolve(renderersByField[fieldName]);
        }

        // Store the generated renderer in a predefined object in
        // case it is requested in the future and return the renderer
        function responseCallback(response) {
            renderersByField[fieldName] = response.renderer;
            return response.renderer;
        }

        if (fieldName === "RGB") {
            return colorRendererCreator
                .createPCTrueColorRenderer({
                    layer: pcLayer
                })
                .then(responseCallback);
        }
        if (fieldName === "CLASS_CODE") {
            return typeRendererCreator
                .createPCClassRenderer({
                    layer: pcLayer,
                    field: fieldName
                })
                .then(responseCallback);
        }
        if (fieldName === "ELEVATION" || fieldName === "INTENSITY") {
            return colorRendererCreator
                .createPCContinuousRenderer({
                    layer: pcLayer,
                    field: fieldName
                })
                .then(responseCallback);
        }
    }

    /******************************************************************
     *
     * Display point cloud layer using different renderers
     *
     ******************************************************************/

    view.when(() => {
        // Generate RGB renderer when view is ready and
        // assign the renderer to the point cloud layer
        getRenderer("RGB")
            .then((renderer) => {
                pcLayer.renderer = renderer;
                map.add(pcLayer);
            })
            .catch(console.error);

        const radios = document.getElementsByName("renderer");
        // Handle change events on radio buttons to switch to the correct renderer
        for (let i = 0; i < radios.length; i++) {
            radios[i].addEventListener("change", (event) => {
                const fieldName = event.target.value;
                getRenderer(fieldName)
                    .then((renderer) => {
                        pcLayer.renderer = renderer;
                    })
                    .catch(console.error);
            });
        }
    });
}