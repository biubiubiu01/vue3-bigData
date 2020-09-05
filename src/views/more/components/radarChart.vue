<template>
  <div class="chart-wrapper" ref="radarChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce } from "@/utils/index.js";

export default {
  name: "radarChart",
  setup() {
    const radarChart = ref(null);
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
      const colorList = ["#FF9E8C", "#00D2C9"];
      myChart = echarts.init(radarChart.value);

      myChart.setOption({
        color: colorList,
        title: {
          show: false,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          icon: "circle",
          show: true,
          right: "5",
          top: "10",
          itemWidth: 10,
          itemHeight: 11,
          textStyle: {
            color: "#d5dfe8",
          },
          data: ["2019", "2020"],
        },
        radar: {
          center: ["42%", "50%"],
          radius: "65%",
          nameGap: 5,
          startAngle: 90,
          splitNumber: 4,
          name: {
            textStyle: {
              color: "#d5dfe8",
              fontSize: 14,
            },
          },
          shape: "circle",
          splitArea: {
            areaStyle: {
              color: ["transparent"],
            },
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(63,133,247,0.3)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(63,133,247,0.3)",
            },
          },
          indicator: [
            {
              name: "JavaScrpt",
              max: 100,
            },
            {
              name: "Vue",
              max: 100,
            },
            {
              name: "jQuery",
              max: 100,
            },
            {
              name: "TypeScript",
              max: 100,
            },
            {
              name: "Echarts",
              max: 100,
            },
            {
              name: "webpack",
              max: 100,
            },
          ],
        },
        series: [
          {
            name: "2020",
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
            },
            itemStyle: {
              normal: {
                shadowColor: "rgb(58,115,192)",
                shadowBlur: 15,
              },
            },
            data: [
              {
                value: [75, 85, 80, 80, 90, 90],
                name: "2020",
              },
            ],
          },
          {
            name: "2019",
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
            },
            itemStyle: {
              normal: {
                shadowColor: "rgb(58,115,192)",
                shadowBlur: 15,
              },
            },
            data: [
              {
                value: [95, 60, 75, 20, 30, 20],
                name: "2019",
              },
            ],
          },
        ],
      });
    };

    return {
      radarChart,
    };
  },
};
</script>
