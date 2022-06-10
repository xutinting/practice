<template>
  <div id="viewDiv"></div>
  <div id="infoDiv" class="esri-widget">
    <div id="description">
      Show power plants with at least <span id="sliderValue">0</span> megawatts of capacity
    </div>
    <div id="sliderContainer">
      <div id="sliderDiv"></div>
    </div>
    <div id="legendDiv"></div>
  </div>
</template>

<script>
import { init } from "./utils";
export default {
  name: "Point_clustering",
  mounted() {
    init();
  },
  methods: {},
};
</script>

<style>
  html, body, #viewDiv {
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  #infoDiv {
    padding: 10px;
    width: 275px;
  }
  #sliderValue{
    font-weight: bolder;
  }
  #legendDiv{
    width: 260px;
  }
  #description{
    padding: 10px 0 10px 0;
  }
</style>