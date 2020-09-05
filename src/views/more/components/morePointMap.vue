<template>
  <div class="chart-wrapper" ref="morePointMap"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce, getGeoJson, getMapInfo } from "@/utils/index.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "morePointMap",
  setup(props, context) {
    let myChart = ref(null);
    let geoJson = ref(null);
    const morePointMap = ref(null);
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
            parseFloat((Math.random(0, 1) * 40 + 15).toFixed()),
          ],
        };
      });
      mapData = mapData.sort((a, b) => {
        return b.value[2] - a.value[2];
      });
      initEcharts(mapData);
    };

    const initEcharts = (data) => {
      myChart = echarts.init(morePointMap.value);
      echarts.registerMap("china", geoJson.value);
      myChart.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: (p) => {
              let val = p.value[2];
              if (window.isNaN(val)) {
                val = 0;
              }
              let txtCon = p.name + "：" + val.toFixed();
              return txtCon;
            },
          },
          title: {
            show: true,
            left: "center",
            top: "18",
            text: "散点图",
            textStyle: {
              color: "rgb(179, 239, 255)",
              fontSize: 16,
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
                title: "热力图",
                icon:
                  "image://data:image/png;base64,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",
                onclick() {
                  sendMap("hotMap");
                },
              },
              myTool2: {
                show: true,
                title: "散点图",
                icon:
                  "image://data:image/png;base64,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",
                onclick() {
                  sendMap("pointMap");
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
                show: true,
                color: "rgb(249, 249, 249)", //省份标签字体颜色
                formatter: (p) => {
                  switch (p.name) {
                    case "内蒙古自治区":
                      p.name = "内蒙古";
                      break;
                    case "西藏自治区":
                      p.name = "西藏";
                      break;
                    case "新疆维吾尔自治区":
                      p.name = "新疆";
                      break;
                    case "宁夏回族自治区":
                      p.name = "宁夏";
                      break;
                    case "广西壮族自治区":
                      p.name = "广西";
                      break;
                    case "香港特别行政区":
                      p.name = "香港";
                      break;
                    case "澳门特别行政区":
                      p.name = "澳门";
                      break;
                    default:
                      break;
                  }
                  return p.name;
                },
              },
              emphasis: {
                show: true,
                color: "rgb(249, 249, 249)", //省份标签字体颜色
              },
            },
            zoom: 1.3,
          },
          series: [
            {
              name: "散点",
              type: "scatter",
              data: data.slice(5),
              coordinateSystem: "geo",
              symbolSize: function(val) {
                let value = val[2] / 3;
                return value;
              },
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#05C3F9", //地图点的颜色
                  shadowBlur: 10,
                  shadowColor: "rgb(58,115,192)",
                },
              },
              layoutCenter: ["50%", "50%"], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430,
            },
            {
              name: "散点",
              type: "scatter",
              coordinateSystem: "geo",
              symbol: "pin",
              symbolSize: function(val) {
                let value = val[2];
                return value;
              },
              label: {
                normal: {
                  show: true,
                  formatter: (params) => {
                    return params.value[2].toFixed();
                  },
                  textStyle: {
                    color: "#fff",
                    fontSize: 9,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: "#F62157",
                },
              },
              zlevel: 6,
              data: data.slice(5),
            },
            {
              name: "top5",
              type: "effectScatter",
              data: data.slice(0, 5),
              coordinateSystem: "geo",
              symbolSize: function(val) {
                let value = val[2] / 3;
                return value;
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke",
              },
              hoverAnimation: true,
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#FFA04A", //地图点的颜色
                  shadowBlur: 10,
                  shadowColor: "rgb(58,115,192)",
                },
              },
              layoutCenter: ["50%", "50%"], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430,
            },
            {
              name: "top5",
              type: "scatter",
              coordinateSystem: "geo",
              symbol: "pin",
              symbolSize: function(val) {
                let value = val[2];
                return value;
              },
              label: {
                normal: {
                  show: true,
                  formatter: (params) => {
                    return params.value[2].toFixed();
                  },
                  textStyle: {
                    color: "#fff",
                    fontSize: 9,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: "#1DE9B6",
                },
              },
              zlevel: 6,
              data: data.slice(0, 5),
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
      morePointMap,
      myChart,
    };
  },
};
</script>
