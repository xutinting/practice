/* eslint-disable */
// 全国城市json数据
const ROOT_URL = 'https://raw.githubusercontent.com/mikedeng/city_geojson/master/geojsons';

export const getCityJson = city => fetch(`${ROOT_URL}/${city}.json`).then(res => res.json());

// 浙江省数据获取
const ZJ_URL = 'https://geo.datav.aliyun.com/areas_v2/bound/330000.json';

export const getJsonZj = data => fetch(ZJ_URL).then(res => res.json());

