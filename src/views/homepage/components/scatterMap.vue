<template>
  <div class="chart-wrapper" ref="scatterMap"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref, reactive, watch } from "vue";
import { debounce, getGeoJson } from "@/utils/index.js";
import useResize from "@/componentApi/useResize.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "scatterMap",
  setup() {
    let {
      abcode,
      year,
      parentInfo,
      setCommitYear,
      setCommitMapInfo,
      setCommitSum,
      removeCommitMapInfo,
    } = useResize();

    let myChart = ref(null);
    let geoJson = ref(null);
    const scatterMap = ref(null);
    const timeData = reactive([2016, 2017, 2018, 2019, 2020]);

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
      geoJson.value = await getGeoJson(abcode.value, geoJson.value);

      getMapData();
    };

    //模拟接口，获取echarts数据
    const getMapData = async () => {
      let { data } = await selectCityData({
        abcode: abcode.value,
        year: year.value,
      });

      let sum = data.reduce((t, c) => t + parseFloat(c.value), 0);
      setCommitSum(parseFloat(sum.toFixed(1)));

      data = data.sort(function(a, b) {
        return a.value - b.value;
      });
      initEcharts(data);
    };

    //渲染echarts图
    const initEcharts = (data) => {
      myChart = echarts.init(scatterMap.value || scatterMap);

      if (parentInfo.value.length === 1) {
        echarts.registerMap("china", geoJson.value); //注册
      } else {
        echarts.registerMap("map", geoJson.value); //注册
      }
      var min = parseFloat(data[0].value);
      var max = parseFloat(data[data.length - 1].value);
      if (data.length === 1) {
        min = 0;
      }

      myChart.setOption(
        {
          timeline: {
            data: timeData,
            axisType: "category",
            autoPlay: true,
            playInterval: 8000,
            left: "10%",
            right: "10%",
            bottom: "0%",
            width: "80%",
            label: {
              normal: {
                textStyle: {
                  color: "rgb(179, 239, 255)",
                },
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            currentIndex: timeData.indexOf(year.value),
            symbolSize: 10,
            lineStyle: {
              color: "#8df4f4",
            },
            checkpointStyle: {
              borderColor: "#8df4f4",
              color: "#53D9FF",
              borderWidth: 2,
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: "#53D9FF",
                borderColor: "#53D9FF",
              },
              emphasis: {
                color: "rgb(58,115,192)",
                borderColor: "rgb(58,115,192)",
              },
            },
          },
          baseOption: {
            animation: true,
            animationDuration: 900,
            animationEasing: "cubicInOut",
            animationDurationUpdate: 900,
            animationEasingUpdate: "cubicInOut",

            title: {
              left: "center",
              top: 0,
              text:
                year.value +
                "年" +
                parentInfo.value[parentInfo.value.length - 1].cityName +
                "销售额统计图",
              textStyle: {
                color: "rgb(179, 239, 255)",
                fontSize: 16,
              },
            },
            tooltip: {
              trigger: "item",
              formatter: (p) => {
                let val = p.value;
                if (p.name == "南海诸岛") return;
                if (window.isNaN(val)) {
                  val = 0;
                }
                let txtCon =
                  "<div style='text-align:left'>" +
                  p.name +
                  ":<br />销售额：" +
                  val.toFixed(2) +
                  "万</div>";
                return txtCon;
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
                  name: "销售额统计图",
                },
                dataZoom: {
                  show: false,
                },
                magicType: {
                  show: false,
                },
              },
              iconStyle: {
                normal: {
                  borderColor: "#1990DA",
                },
              },
              top: 0,
              right: 0,
            },
            visualMap: {
              show: true,
              min: min,
              max: max,
              left: "0%",
              bottom: "0%",
              calculable: true,
              inRange: {
                color: ["#24CFF4", "#2E98CA", "#1E62AC"],
              },
              textStyle: {
                color: "#24CFF4",
              },
            },
            series: [
              {
                name: year.value + "销售额度",
                type: "map",
                map: parentInfo.value.length === 1 ? "china" : "map",
                roam: true,
                zoom: 1.25,
                tooltip: {
                  trigger: "item",
                  formatter: (p) => {
                    let val = p.value;
                    if (p.name == "南海诸岛") return;
                    if (window.isNaN(val)) {
                      val = 0;
                    }
                    let txtCon =
                      "<div style='text-align:left'>" +
                      p.name +
                      ":<br />销售额：" +
                      val.toFixed(2) +
                      "万</div>";
                    return txtCon;
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
                    color: "#f75a00",
                  },
                },
                itemStyle: {
                  normal: {
                    areaColor: "#24CFF4",
                    borderColor: "#53D9FF",
                    borderWidth: 1.3,
                    shadowBlur: 15,
                    shadowColor: "rgb(58,115,192)",
                    shadowOffsetX: 7,
                    shadowOffsetY: 6,
                  },
                  emphasis: {
                    areaColor: "#8dd7fc",
                    borderWidth: 1.6,
                    shadowBlur: 25,
                  },
                },
                data: data,
              },
            ],
          },
        },
        true
      );

      myChart.off("timelinechanged");
      myChart.on("timelinechanged", (params) => {
        const year = timeData[params.currentIndex];
        setCommitYear(year);
        getMapData();
      });

      myChart.getZr().off("click");
      myChart.getZr().on("click", (params) => {
        if (params.target) {
          if (params.target.dataIndex) {
            const index = params.target.dataIndex;
            if (data[index]) {
              if (
                parentInfo.value[parentInfo.value.length - 1].code ==
                data[index].adcode
              ) {
                return;
              }
              setCommitMapInfo({
                cityName: data[index].name,
                code: data[index].adcode,
              });
              getMapJson();
            }
          }
        } else {
          if (parentInfo.value.length === 1) {
            return;
          }
          removeCommitMapInfo(parentInfo.value.length - 1);
        }
      });
    };

    watch(
      parentInfo,
      (nl, ol) => {
        getMapJson();
      },
      { lazy: false, deep: true }
    );

    return {
      scatterMap,
      myChart,
      parentInfo,
    };
  },
};
</script>
