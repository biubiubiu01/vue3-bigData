<template>
  <div class="chart-wrapper" ref="treeChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { debounce } from "@/utils/index.js";

export default {
  name: "treeChart",
  setup() {
    const treeChart = ref(null);
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
      const data = [
        {
          name: "Vue",
          value: 6000,
        },
        {
          name: "React",
          value: 6600,
        },
        {
          name: "Angular",
          value: 3200,
        },
        {
          name: "uni-app",
          value: 2100,
        },
        {
          name: "mpvue",
          value: 172,
        },
        {
          name: "Taro",
          value: 179,
        },
        {
          name: "element-ui",
          value: 293,
        },
        {
          name: "vant",
          value: 200,
        },
      ];
      const colorList = [
        "#6FFFFF",
        "#FF9244",
        "#7155B7",
        "#0FE7E7",
        "#48C7F2",
        "#4490FF",
      ];
      myChart = echarts.init(treeChart.value);
      myChart.setOption({
        color: colorList,
        title: {
          show: false,
        },
        tooltip: {},
        series: [
          {
            name: "矩形树图",
            type: "treemap",
            roam: false,
            label: {
              show: true,
              formatter: "{b}",
              fontSize: 14,
            },
            nodeClick: false,
            breadcrumb: {
              show: false,
            },
            itemStyle: {
              normal: {
                show: true,
                textStyle: {
                  color: "#d5dfe8",
                  fontSize: 14,
                },
                borderWidth: 0,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: data,
          },
        ],
      });
    };

    return {
      treeChart,
    };
  },
};
</script>
