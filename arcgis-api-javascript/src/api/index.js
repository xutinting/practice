/* eslint-disable */

const ROOT_URL = 'https://raw.githubusercontent.com/mikedeng/city_geojson/master/geojsons';

export const getCityJson = city => fetch(`${ROOT_URL}/${city}.json`).then(res => res.json());

