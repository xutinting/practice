<template>
  <div id="viewDiv"></div>
  <div id="toolbarDiv" class="esri-component esri-widget">
    <button
      id="distance"
      class="esri-widget--button esri-interactive esri-icon-measure-line"
      title="测量距离"
    ></button>
    <button
      id="area"
      class="esri-widget--button esri-interactive esri-icon-measure-area"
      title="测量面积"
    ></button>
    <button
      id="clear"
      class="esri-widget--button esri-interactive esri-icon-trash"
      title="取消测量"
    ></button>
  </div>
  <div id="cityList">
    <input
      type="text"
      placeholder="请输入城市名"
      class="searchCity"
      v-model="keyword"
    />
    <button @click="isSorted = !isSorted" class="sortBtn">A-Z</button>
    <ol>
      <li v-for="city in sorted" :key="city" @click="onclick(city)">
        {{ city }}
      </li>
    </ol>
  </div>
</template>

<script>
/* eslint-disable */
import { init, insertCity2Map, measure } from "@/utils/map";
import cityList from "@/config/cities.json";
import Measurement from "@arcgis/core/widgets/Measurement";

export default {
  name: "Map",
  data() {
    return {
      keyword: "",
      cities: cityList,
      sort: false,
      filterCity: [],
      isSorted: false,
      // mapdata: ({ map, view } = init()),
    };
  },
  watch: {
    keyword: {
      immediate: true, //当input没有输入的时候就调用handler
      handler(value) {
        const arr = this.cities.filter((city) => city.indexOf(value) !== -1);
        this.filterCity = arr;
      },
    },
  },
  computed: {
    filtered() {
      return this.cities.filter((city) => city.includes(this.keyword));
    },
    sorted() {
      if (this.isSorted) {
        return this.filtered.sort((p1, p2) => p1.localeCompare(p2));
      }
      return this.filtered;
    },
  },
  mounted() {
    init();
    measure();
  },
  methods: {
    onclick(city) {
      insertCity2Map(city);
    },
    // 按名称头拼音排序
    sortAZ() {
      if (!this.sort) {
        this.filterCity = this.cities;
        const resultArr = this.cities.sort(function (p1, p2) {
          return p1.localeCompare(p2);
        });
        this.filterCity = resultArr;
        this.sort = !this.sort;
        console.log(this.sort, "sort");
      } else {
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}

html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100vh;
}

#cityList,
ol {
  position: absolute;
}

#cityList {
  bottom: 16px;
  right: 5px;
  width: 170px;
  height: 140px;
  background-color: rgba(0, 89, 179, 0.3);
  text-align: center;
}

ol {
  right: 5px;
  width: 142px;
  height: 105px;
  list-style: none;
  overflow-y: scroll;
}

.searchCity {
  position: relative;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #6a6f77;
  width: 120px;
  height: 20px;
  margin: 2px;
  padding: 2px;
  text-align: center;
}

button > .sortBtn {
  position: relative;
  right: 0;
  padding: 2px;
  width: 38px;
  height: 30px;
  background: #ffffff;
}

#toolbarDiv {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: default;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.esri-widget--button.active,
.esri-widget--button.active:hover,
.esri-widget--button.active:focus {
  cursor: default;
  background-color: #999696;
}
.esri-widget--button.active path,
.esri-widget--button.active:hover path,
.esri-widget--button.active:focus path {
  fill: #e4e4e4;
}
</style>
