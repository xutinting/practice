<template>
  <div id="viewDiv"></div>
</template>

<script>
/* eslint-disable */
import { InitializeMap,findPlace } from "./utils";
export default {
  name: "Search-Layer",
  mounted() {
    InitializeMap();
    findPlace();

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
