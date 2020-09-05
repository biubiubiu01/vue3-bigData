<template>
  <div class="chart-wrapper" ref="gaugeChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce } from "@/utils/index.js";

export default {
  name: "gaugeChart",
  setup() {
    const gaugeChart = ref(null);
    let myChart = ref(null);

    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 200);

    onMounted(() => {
      initEcharts();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    //渲染echarts图
    const initEcharts = () => {
      myChart = echarts.init(gaugeChart.value);
      const value = 85;
      myChart.setOption({
        title: {
          show: true,
          left: "center",
          top: "center",
          text: value + "%",
          textStyle: {
            fontSize: 20,
            color: "#0AFCE0",
          },
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "52%"],
            radius: "73.10%",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 150,
                color: [
                  [
                    value / 100,
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(69, 161, 255,0.1)",
                      },
                      {
                        offset: 0.3,
                        color: "rgba(69, 161, 255,0.3)",
                      },
                      {
                        offset: 1,
                        color: "rgba(69, 161, 255,0.7)",
                      },
                    ]),
                  ],
                  [1, "rgba(28,128,245,.0)"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: 0,
            },
            axisLabel: {
              show: 0,
            },
            pointer: {
              show: true,
              length: "100%",
              radius: "20%",
              width: 5, //指针粗细
            },
            itemStyle: {
              color: "#4389F6",
            },
            detail: {
              show: false,
            },

            data: [
              {
                value: value,
              },
            ],
          },
          //刻度
          {
            type: "gauge",
            radius: "65%",
            center: ["50%", "52%"],
            splitNumber: 10,
            min: 0,
            max: 100,
            startAngle: 225,
            endAngle: -45,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 12,
              lineStyle: {
                color: "#b3efff",
                width: 2,
                shadowColor: "rgb(58,115,192)",
                shadowBlur: 15,
              },
            },
            pointer: {
              show: 0,
            },
            detail: {
              show: 0,
            },
          },
          //内圈
          {
            type: "gauge",
            center: ["50%", "52%"],
            radius: "75%",
            splitNumber: 10,
            splitLine: {
              show: false,
            },
            min: 0,
            max: 100,
            startAngle: 225,
            endAngle: -45,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, "#4385F7"]],
              },
            },
            pointer: {
              show: 0,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: false,
            },
          },
          //最外圈
          {
            type: "gauge",
            radius: "85%",
            center: ["50%", "52%"],
            splitNumber: 10,
            splitLine: {
              show: false,
            },
            min: 0,
            max: 100,
            startAngle: 225,
            endAngle: -45,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                shadowBlur: 0,
                color: [[1, "#4072FB"]],
              },
            },
            pointer: {
              show: 0,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: false,
            },
          },
        ],
      });
    };

    return {
      gaugeChart,
    };
  },
};
</script>
