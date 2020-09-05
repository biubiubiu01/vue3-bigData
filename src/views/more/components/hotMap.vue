<template>
  <div class="chart-wrapper" ref="hotMap"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce, getGeoJson, getMapInfo } from "@/utils/index.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "hotMap",
  setup(props, context) {
    let myChart = ref(null);
    let geoJson = ref(null);
    const hotMap = ref(null);
    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 200);

    onMounted(() => {
      getMapJson();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    //通过高德获取geoJson数据
    const getMapJson = async () => {
      geoJson.value = await getGeoJson("100000");
      getMapData();
    };

    //模拟接口，获取echarts数据
    const getMapData = async () => {
      const data = await getMapInfo("100000");

      let mapData = data.map((item, index) => {
        return {
          name: item.name,
          value: [
            item.center.lng,
            item.center.lat,
            Math.random(0, 1) * 40 + 15,
          ],
        };
      });

      //再添加点假数据
      const value = [
        {
          name: "武汉",
          x: "114.31",
          y: "30.52",
        },
        {
          name: "汉阳",
          x: "114.02",
          y: "30.57",
        },
        {
          name: "黄石",
          x: "115.09",
          y: "30.2",
        },
        {
          name: "十堰",
          x: "110.79",
          y: "32.65",
        },
        {
          name: "宜昌",
          x: "111.3",
          y: "30.7",
        },
        {
          name: "孝感",
          x: "113.91",
          y: "31.92",
        },
        {
          name: "汉川",
          x: "113.59",
          y: "30.63",
        },
        {
          name: "应山",
          x: "113.81",
          y: "31.62",
        },
        {
          name: "黄冈",
          x: "114.87",
          y: "30.44",
        },
        {
          name: "麻城",
          x: "115",
          y: "31.17",
        },
        {
          name: "黄梅",
          x: "115.93",
          y: "30.09",
        },
        {
          name: "通山",
          x: "114.52",
          y: "29.6",
        },
        {
          name: "荆门",
          x: "112.19",
          y: "31.02",
        },
        {
          name: "监利",
          x: "112.9",
          y: "29.83",
        },
      ];
      value.forEach((item) => {
        mapData.push({
          name: item.name,
          value: [item.x, item.y, Math.random(0, 1) * 40 + 15],
        });
      });
      initEcharts(mapData);
    };

    const initEcharts = (data) => {
      myChart = echarts.init(hotMap.value);
      echarts.registerMap("china", geoJson.value);
      myChart.setOption(
        {
          tooltip: {},
          title: {
            show: true,
            left: "center",
            top: "18",
            text: "热力图",
            textStyle: {
              color: "rgb(179, 239, 255)",
              fontSize: 16,
            },
          },
          visualMap: {
            show: false,
            left: "2%",
            bottom: "1%",
            min: 0,
            max: 40,
            text: ["40", "0"],
            inRange: {
              color: ["#41A7DE", "#eac736", "#fffc00", "#ff2600"],
            },
          },
          toolbox: {
            feature: {
              restore: {
                show: false,
              },
              dataView: {
                show: false,
              },
              saveAsImage: {
                show: false,
              },
              dataZoom: {
                show: false,
              },
              magicType: {
                show: false,
              },
              myTool1: {
                show: true,
                title: "散点图",
                icon:
                  "image://data:image/png;base64,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",
                onclick() {
                  sendMap("pointMap");
                },
              },
              myTool2: {
                show: true,
                title: "散点图2",
                icon:
                  "image://data:image/png;base64,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",
                onclick() {
                  sendMap("morePointMap");
                },
              },
            },
            itemSize: 20,
            iconStyle: {
              normal: {
                borderColor: "#1990DA",
              },
              emphasis: {
                color: "#d5dfe8",
              },
            },
            top: 25,
            right: 15,
          },
          geo: {
            show: true,
            map: "china",
            roam: true,
            center: ["104.53531246", "33.5267395887"],
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .1)", // 100% 处的颜色
                    },
                  ],
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10,
              },
              emphasis: {
                show: false,
                areaColor: "rgba(0,0,0,0)",
              },
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            zoom: 1.3,
          },
          series: [
            {
              name: "地图",
              type: "heatmap",
              data: data,
              coordinateSystem: "geo",
              pointSize: 13,
              blurSize: 15,
            },
          ],
        },

        true
      );
    };

    const sendMap = (val) => {
      context.emit("changeMap", val);
    };

    return {
      hotMap,
      myChart,
    };
  },
};
</script>
