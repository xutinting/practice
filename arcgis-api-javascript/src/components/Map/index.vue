<template>
  <div id="viewDiv"></div>
  <div id="cityList">
    <ol>
      <li v-for="city in cities" :key="city" v-on:click="onclick(city)">
        {{ city }}
      </li>
    </ol>
  </div>
</template>

<script>
/* eslint-disable */
import { init, createGraphic } from "./utils";
import cityList from "@/config/cities.json";
import { getCityJson } from "@/api/index.js";

let map = null;
let view = null;
let layer = null;
let collection = null;

export default {
  name: "Json_map",
  data() {
    return {
      cities: cityList,
    };
  },
  mounted() {
    ({ map, view, layer, collection } = init());
  },
  methods: {
    onclick(city) {
      getCityJson(city).then((data) => {
        for (const feat of data.features) {
          const graphics = feat.geometry.coordinates.map((coords) =>
            createGraphic(coords)
          );

          graphics.forEach((graphic) => {
            collection.add(graphic);
          });
        }
      });
    },
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

#cityList {
  position: absolute;
  bottom: 100px;
  right: 0;
  padding: 0 0 0 0;
  width: 150px;
  height: 245px;
  background-color: rgba(0, 89, 179, 0.3);
  text-align: center;
}

#cityList ol {
  display: block;
  position: absolute;
  right: 0;
  width: 150px;
  height: 200px;
  list-style: none;
  overflow-y: scroll;
}
</style>
