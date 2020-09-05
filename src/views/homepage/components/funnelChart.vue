<template>
  <div class="chart-wrapper" ref="funnelChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { debounce } from "@/utils/index.js";
import useResize from "@/componentApi/useResize.js";
import { selectBoxChartData } from "@/api/mockChart";

export default {
  name: "funnelChart",
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize();

    const funnelChart = ref(null);
    let myChart = ref(null);

    const resizeHandler = debounce(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 200);

    onMounted(() => {
      getBoxData();
      window.addEventListener("resize", resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    // //模拟接口，获取echarts数据
    const getBoxData = async () => {
      const { data } = await selectBoxChartData({
        abcode,
        year,
      });

      initEcharts(data);
    };

    //渲染echarts图
    const initEcharts = (data) => {
      myChart = echarts.init(funnelChart.value);
      myChart.setOption(
        {
          color: [
            "#01E1FF",
            "#ED65A9",
            "#11AAFF",
            "#B9FFFF",
            "#3064F3",
            "#FF905A",
          ],
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
            formatter: "{a} <br/>{b} : {c} 人",
          },
          series: [
            {
              name: "客户年龄",
              type: "funnel",
              left: "10%",
              top: "5%",
              width: "70%",
              height: "85%",
              label: {
                normal: {
                  formatter: "{b}",
                },
                emphasis: {
                  position: "inside",
                },
              },
              labelLine: {
                normal: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: "solid",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderWidth: 0,
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
        getBoxData();
      },
      { lazy: false }
    );

    watch(
      parentInfo,
      (nl, ol) => {
        getBoxData();
      },
      { lazy: false, deep: true }
    );

    return {
      funnelChart,
    };
  },
};
</script>
