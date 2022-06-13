<template>
  <div id="viewDiv"></div>
  <!-- <div id="scalebar"></div> -->
</template>

<script>
/* eslint-disable */
import { InitializeMap, displayWebMap,displayWebScene } from "./utils";
export default {
  name: "add-vectorTileLayer",
  mounted() {
    // InitializeMap();
    // displayWebMap();
    displayWebScene();
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

/* #scalebar {
  position: absolute;
  left: 5px;
  bottom: 65px;
} */
</style>