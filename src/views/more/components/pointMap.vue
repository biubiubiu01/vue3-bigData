<template>
  <div class="chart-wrapper" ref="pointMap"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce, getGeoJson, getMapInfo } from "@/utils/index.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "pointMap",
  setup(props, context) {
    let myChart = ref(null);
    let geoJson = ref(null);
    const pointMap = ref(null);
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
      myChart = echarts.init(pointMap.value);
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
                  color: "#f4e925", //地图点的颜色
                  shadowBlur: 10,
                  shadowColor: "rgb(58,115,192)",
                },
              },
              layoutCenter: ["50%", "50%"], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430,
            },
            {
              name: "top5",
              type: "effectScatter",
              data: data.slice(0, 5),
              coordinateSystem: "geo",
              symbolSize: function(val) {
                let value = val[2] / 2;
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
                  color: "#f4e925", //地图点的颜色
                  shadowBlur: 10,
                  shadowColor: "rgb(58,115,192)",
                },
              },
              layoutCenter: ["50%", "50%"], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430,
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
      pointMap,
      myChart,
    };
  },
};
</script>
