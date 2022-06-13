<template>
  <div id="viewDiv"></div>
</template>

<script>
/* eslint-disable */
import {
  InitializeMap,
  addPointFeature,
  addLineFeature,
  addPolygonStyle
} from "./utils";
export default {
  name: "map-scenes",
  mounted() {
    InitializeMap();
    // addPointFeature();
    // addLineFeature();
    addPolygonStyle();
  },
  methods: {},
};
</script>

<style>
html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100vh;
}
</style>