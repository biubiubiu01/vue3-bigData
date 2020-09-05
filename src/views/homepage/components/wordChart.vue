<template>
  <div class="chart-wrapper" ref="wordChart"></div>
</template>

<script>
import echarts from "echarts";
require("echarts-wordcloud");
import { onMounted, onBeforeUnmount, ref, watch, routerChange } from "vue";
import { debounce } from "@/utils/index.js";
import useResize from "@/componentApi/useResize.js";
import { selectWordData } from "@/api/mockChart";

export default {
  name: "wordChart",
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize();

    const wordChart = ref(null);
    let myChart = ref(null);

    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 200);

    onMounted(() => {
      getWordData();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    //模拟接口，获取echarts数据
    const getWordData = async () => {
      const { data } = await selectWordData({
        abcode,
        year,
      });
      initEcharts(data);
    };

    // //渲染echarts图
    const initEcharts = (data) => {
      const colorList = ["#28CAD8", "#E5A214", "#01D2D1", "#F69F73", "#39E569"];
      myChart = echarts.init(wordChart.value);
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
          tooltip: {
            trigger: "item",
            formatter: "销量 <br/>{b} : {c} 万",
            textStyle: {
              fontSize: 12,
            },
          },
          toolbox: {
            feature: {
              dataView: {
                show: false,
              },
              magicType: {
                show: false,
              },
              restore: {
                show: false,
              },
              saveAsImage: {
                show: true,
                name: year.value + "销售品牌",
                pixelRatio: 2,
              },
            },
            iconStyle: {
              normal: {
                borderColor: "#1990DA",
              },
            },
            top: 0,
            right: 5,
          },
          series: [
            {
              type: "wordCloud",
              sizeRange: [12, 26],
              rotationRange: [0, 0],
              textStyle: {
                normal: {
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
      myChart.on("click", () => {
        routerChange("/more");
      });
    };

    watch(
      year,
      (nl, ol) => {
        getWordData();
      },
      { lazy: false }
    );

    watch(
      parentInfo,
      (nl, ol) => {
        getWordData();
      },
      { lazy: false, deep: true }
    );

    return {
      wordChart,
    };
  },
};
</script>
