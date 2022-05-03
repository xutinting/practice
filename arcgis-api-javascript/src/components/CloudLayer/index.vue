<template>
  <div id="viewDiv"></div>
  <div id="paneDiv" class="esri-widget">
    <p>Visualize point cloud using:</p>
    <input type="radio" name="renderer" value="RGB" id="RGB" checked /><label
      for="RGB"
    >
      Original point cloud scan color (Point Cloud RGB Renderer)</label
    ><br />
    <input
      type="radio"
      name="renderer"
      value="CLASS_CODE"
      id="CLASS_CODE"
    /><label for="CLASS_CODE">
      LAS classification (Point Cloud Unique Values Renderer)</label
    ><br />
    <input
      type="radio"
      name="renderer"
      value="ELEVATION"
      id="ELEVATION"
    /><label for="ELEVATION">
      Elevation mapped on a continuous color scheme (Point Cloud Stretch
      Renderer)</label
    ><br />
    <input
      type="radio"
      name="renderer"
      value="INTENSITY"
      id="INTENSITY"
    /><label for="INTENSITY">
      A classification based on intensity values (Point Cloud Stretch
      Renderer)</label
    ><br />
  </div>
</template>

<script>
import { init } from "./main";

export default {
  name: "pointCloudLayer",
  mounted() {
    init();
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
#paneDiv {
  padding: 12px;
  background-color: white;
}
</style>
