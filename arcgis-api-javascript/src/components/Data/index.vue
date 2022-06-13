<template>
  <div id="viewDiv"></div>
</template>

<script>
/* eslint-disable */
import { InitializeMap, queryLayerSQL } from "./utils";
export default {
  name: "Query-Layer",
  mounted() {
      InitializeMap();
    queryLayerSQL();
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
