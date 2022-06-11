<template>
  <div id="viewDiv"></div>
</template>

<script>
import { init } from "./utils";

export default {
  name: "Json_map",
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
</style>
