import { createStore } from "vuex";

export default createStore({
  state: {
    mapInfo: [
      {
        cityName: "全国",
        code: 100000,
      },
    ],
    year: 2016,
    sum: 0,
  },
  mutations: {
    ADD_INFO: (state, info) => {
      state.mapInfo.push(info);
    },
    REMOVE_INFO: (state, index) => {
      state.mapInfo.splice(index);
    },
    SET_YEAR: (state, year) => {
      state.year = year;
    },
    SET_SUM: (state, sum) => {
      state.sum = sum;
    },
  },
});
