<template>
  <div class="chart-wrapper" ref="liquidChart"></div>
</template>

<script>
import echarts from "echarts";
require("echarts-liquidfill");
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { debounce } from "@/utils/index.js";
import useResize from "@/componentApi/useResize.js";
import { selectYearValue } from "@/api/mockChart";

export default {
  name: "liquidChart",
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize();

    const liquidChart = ref(null);
    let myChart = ref(null);

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
      const { data } = await selectYearValue({
        year,
      });

      initEcharts(data.value);
    };

    //渲染echarts图
    const initEcharts = (data) => {
      myChart = echarts.init(liquidChart.value);
      myChart.setOption(
        {
          series: [
            {
              type: "liquidFill",
              radius: "85%",
              center: ["50%", "45%"],
              data: [0.48, 0.48, 0.48, 0.48],
              backgroundStyle: {
                color: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0.5,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: "rgba(68, 145, 253, 0.55)",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(68, 145, 253, 0.65)",
                    },
                    {
                      offset: 0,
                      color: "rgba(68, 145, 253, 1)",
                    },
                  ],
                  globalCoord: false,
                },
              },
              outline: {
                borderDistance: 0,
                itemStyle: {
                  borderWidth: 5,
                  borderColor: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(53,142,215, 0)",
                      },
                      {
                        offset: 0.5,
                        color: "rgba(53,142,215, 0.45)",
                      },
                      {
                        offset: 1,
                        color: "rgba(53,142,215, 0.9)",
                      },
                    ],
                    globalCoord: false,
                  },
                  shadowBlur: 10,
                  shadowColor: "rgba(53,142,215, 0.9)",
                },
              },
              label: {
                normal: {
                  formatter: data + "万",
                  textStyle: {
                    fontSize: 18,
                  },
                },
              },
            },
          ],
        },
        true
      );

      myChart.off("click");
      myChart.on("click", () => {
        routerChange("/more");
      });
    };

    watch(
      year,
      (nl, ol) => {
        getChartData();
      },
      { lazy: false }
    );

    watch(
      parentInfo,
      (nl, ol) => {
        getChartData();
      },
      { lazy: false, deep: true }
    );

    return {
      liquidChart,
    };
  },
};
</script>
