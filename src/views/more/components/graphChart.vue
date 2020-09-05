<template>
  <div class="chart-wrapper" ref="grapgChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce } from "@/utils/index.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "wordChart",
  setup() {
    const grapgChart = ref(null);
    let myChart = ref(null);
    let cityCode = ref("100000");

    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 200);

    onMounted(() => {
      getChartData();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    //模拟接口，获取echarts数据
    const getChartData = async () => {
      const { data } = await selectCityData({
        abcode: cityCode.value,
      });
      initEcharts(data);
    };

    //渲染echarts图
    const initEcharts = (data) => {
      const colorList = [
        "#28CAD8",
        "#E5A214",
        "#F69F73",
        "#ff7f50",
        "#87cefa",
        "#da70d6",
        "#32cd32",
        "#6495ed",
        "#ff69b4",
        "#cd5c5c",
        "#1e90ff",
        "#ff6347",
        "#7b68ee",
        "#6b8e23",
        "#4ea397",
        "#b8860b",
        "#7bd9a5",
      ];
      myChart = echarts.init(grapgChart.value);
      myChart.setOption(
        {
          title: {
            show: data.length === 0,
            top: "center",
            left: "center",
            text: "暂无数据",
            textStyle: {
              color: "rgb(179, 239, 255)",
              fontSize: 12,
            },
          },
          tooltip: {},
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
                show: cityCode.value != "100000",
                title: "返回",
                icon:
                  "image://data:image/png;base64,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",
                onclick() {
                  cityCode.value = "100000";
                  getChartData();
                },
              },
            },
            itemSize: 18,
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
          animationDurationUpdate: (index) => {
            return index * 100;
          },
          animationEasingUpdate: "bounceIn",
          series: [
            {
              type: "graph",
              layout: "force",
              force: {
                repulsion: 55,
                edgeLength: 10,
              },
              roam: true,
              label: {
                normal: {
                  show: true,
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
              },
              draggable: true,
              symbolSize: (params) => {
                let value = parseFloat(params) / 40;
                if (value < 25) {
                  return 25;
                } else if (value > 60) {
                  return 60;
                }
                return value;
              },
              itemStyle: {
                normal: {
                  shadowBlur: 35,
                  shadowColor: "rgb(58,115,192)",
                  color: (params) => {
                    return colorList[
                      Math.floor(Math.random() * colorList.length)
                    ];
                  },
                },
              },
              data: data,
            },
          ],
        },
        true
      );

      myChart.off("click");
      myChart.on("click", (params) => {
        if (data.length === 1) {
          return;
        }
        cityCode.value = params.data.adcode;
        getChartData();
      });
    };

    return {
      grapgChart,
    };
  },
};
</script>
