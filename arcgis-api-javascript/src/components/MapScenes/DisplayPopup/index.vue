<template>
  <div id="viewDiv"></div>
</template>

<script>
/* eslint-disable */
import { InitializeMap,displayAttributes,displayCharts,displayTable } from "./utils";

export default {
  name: "display-popup",
  mounted() {
    InitializeMap();
    displayAttributes();
    displayCharts();
    displayTable();
  },
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