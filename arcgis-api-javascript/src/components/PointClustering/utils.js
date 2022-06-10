import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Slider from "@arcgis/core/widgets/Slider";
import Expand from "@arcgis/core/widgets/Expand";

export function init() {
    // Configure clustering on the layer with a
    // popupTemplate displaying the predominant
    // fuel type of the power plants in the cluster

    const clusterLabelThreshold = 1500;

    const haloColor = "#373837";
    const color = "#f0f0f0";

    const clusterConfig = {
        type: "cluster",
        popupTemplate: {
            title: "Cluster summary",
            content: [
                {
                    type: "text",
                    text: `
            This cluster represents <b>{cluster_count}</b> power plants with an average capacity of <b>{cluster_avg_capacity_mw} megawatts</b>.
            The power plants in this cluster produce a total of <b>{expression/total-mw} megawatts</b> of power.`
                },
                {
                    type: "text",
                    text: "Most power plants in this cluster generate power from <b>{cluster_type_fuel1}</b>."
                }
            ],
            fieldInfos: [{
                fieldName: "cluster_count",
                format: {
                    places: 0,
                    digitSeparator: true
                }
            }, {
                fieldName: "cluster_avg_capacity_mw",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            }, {
                fieldName: "expression/total-mw",
                format: {
                    places: 0,
                    digitSeparator: true
                }
            }],
            expressionInfos: [{
                name: "total-mw",
                title: "total megawatts",
                expression: "$feature.cluster_avg_capacity_mw * $feature.cluster_count"
            }]
        },
        // larger radii look better with multiple label classes
        // smaller radii looks better visually
        clusterRadius: "120px",
        labelsVisible: true,
        labelingInfo: [{
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    family: "Noto Sans",
                    size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px",
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,### plants')"
            },
            where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "18px"
                },
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: "$feature.cluster_type_fuel1"
            },
            where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px"
                },
                xoffset: 0,
                yoffset: "15px"
            },
            deconflictionStrategy: "none",
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: `
        var value = $feature.cluster_avg_capacity_mw;
        var num = Count(Text(Round(value)));

        Decode(num,
            4, Text(value / Pow(10, 3), "##.0k"),
            5, Text(value / Pow(10, 3), "##k"),
            6, Text(value / Pow(10, 3), "##k"),
            7, Text(value / Pow(10, 6), "##.0m"),
            Text(value, "#,###")
        );
        `
            },
            where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    family: "Noto Sans",
                    size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px",
            },
            labelPlacement: "above-right",
            labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,### plants')"
            },
            where: `cluster_avg_capacity_mw <= ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "18px"
                }
            },
            labelPlacement: "above-right",
            labelExpressionInfo: {
                expression: "$feature.cluster_type_fuel1"
            },
            where: `cluster_avg_capacity_mw <= ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px"
                },
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: `
        var value = $feature.cluster_avg_capacity_mw;
        var num = Count(Text(Round(value)));

        Decode(num,
            4, Text(value / Pow(10, 3), "##.0k"),
            5, Text(value / Pow(10, 3), "##k"),
            6, Text(value / Pow(10, 3), "##k"),
            7, Text(value / Pow(10, 6), "##.0m"),
            Text(value, "#,###")
        );
        `
            },
            where: `cluster_avg_capacity_mw <= ${clusterLabelThreshold}`
        }]
    };

    const layer = new FeatureLayer({
        portalItem: {
            id: "eb54b44c65b846cca12914b87b315169"
        },
        featureReduction: clusterConfig,
        popupEnabled: true,
        labelsVisible: true,
        labelingInfo: [{
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    family: "Noto Sans",
                    size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px",
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: "$feature.name"
            },
            where: `capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "18px"
                },
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: "$feature.fuel1"
            },
            where: `capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px"
                },
                xoffset: 0,
                yoffset: "15px"
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: `
        var value = $feature.capacity_mw;
        var num = Count(Text(Round(value)));

        Decode(num,
            4, Text(value / Pow(10, 3), "##.0k"),
            5, Text(value / Pow(10, 3), "##k"),
            6, Text(value / Pow(10, 3), "##k"),
            7, Text(value / Pow(10, 6), "##.0m"),
            Text(value, "#,###")
        );
        `
            },
            where: `capacity_mw > ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    family: "Noto Sans",
                    size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px",
            },
            labelPlacement: "above-right",
            labelExpressionInfo: {
                expression: "$feature.name"
            },
            where: `capacity_mw <= ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "18px"
                }
            },
            labelPlacement: "above-right",
            labelExpressionInfo: {
                expression: "$feature.fuel1"
            },
            where: `capacity_mw <= ${clusterLabelThreshold}`
        }, {
            symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px"
                },
                xoffset: 0,
                yoffset: 0
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                expression: `
        var value = $feature.capacity_mw;
        var num = Count(Text(Round(value)));

        Decode(num,
            4, Text(value / Pow(10, 3), "##.0k"),
            5, Text(value / Pow(10, 3), "##k"),
            6, Text(value / Pow(10, 3), "##k"),
            7, Text(value / Pow(10, 6), "##.0m"),
            Text(value, "#,###")
        );
        `
            },
            where: `capacity_mw <= ${clusterLabelThreshold}`
        }]
    });

    const map = new Map({
        basemap: {
            portalItem: {
                id: "8d91bd39e873417ea21673e0fee87604"
            }
        },
        layers: [layer]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        extent: {
            spatialReference: {
                latestWkid: 3857,
                wkid: 102100
            },
            xmin: -42087672,
            ymin: 4108613,
            xmax: -36095009,
            ymax: 8340167
        }
    });

    layer.when().then(() => {
        const renderer = layer.renderer.clone();
        renderer.visualVariables = [{
            type: "size",
            field: "capacity_mw",
            legendOptions: {
                title: "Capacity (MW)"
            },
            minSize: "24px",
            maxSize: "100px",
            minDataValue: 1,
            maxDataValue: 5000
        }];
        layer.renderer = renderer;
    });

    new Legend({
        view: view,
        container: "legendDiv"
    });

    const infoDiv = document.getElementById("infoDiv");
    view.ui.add(
        new Expand({
            view: view,
            content: infoDiv,
            expandIconClass: "esri-icon-layer-list",
            expanded: true
        }),
        "top-right"
    );

    view.whenLayerView(layer).then((layerView) => {
        const field = "capacity_mw";

        const slider = new Slider({
            min: 0,
            max: 2000,
            values: [0],
            container: document.getElementById("sliderDiv"),
            visibleElements: {
                rangeLabels: true
            },
            precision: 0
        });

        const sliderValue = document.getElementById("sliderValue");

        // filter features by power plant capacity when the user
        // drags the slider thumb. If clustering is enabled,
        // clusters will recompute and render based on the number
        // and type of features that satisfy the filter where clause

        slider.on(["thumb-change", "thumb-drag"], (event) => {
            sliderValue.innerText = event.value;
            layerView.filter = {
                where: field + " >= " + event.value
            };
        });
    });
}