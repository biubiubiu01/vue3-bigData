<template>
  <div class="chart-wrapper" ref="lineChart"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { debounce } from "@/utils/index.js";
import useResize from "@/componentApi/useResize.js";
import { selectOtherData } from "@/api/mockChart";

export default {
  name: "lineChart",
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize();

    const lineChart = ref(null);
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
      const { data } = await selectOtherData({
        abcode,
        year,
      });
      initEcharts(data);
    };

    //渲染echarts图
    const initEcharts = (data) => {
      myChart = echarts.init(lineChart.value);
      myChart.setOption(
        {
          grid: {
            left: "13%",
            right: "8%",
            bottom: "20%",
            top: "19%",
          },
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
            trigger: "axis",
            axisPointer: {
              type: "line",
            },
          },
          toolbox: {
            feature: {
              dataView: {
                show: false,
              },
              magicType: {
                show: true,
                type: ["line", "bar"],
              },
              restore: {
                show: false,
              },
              saveAsImage: {
                show: true,
                name: year.value + "同行业销售额对比",
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
          dataZoom: [
            {
              type: "inside",
              startValue: 0,
              endValue: 12,
            },
          ],
          legend: {
            show: true,
            left: "15",
            top: "0",
            itemWidth: 15,
            itemHeight: 11,
            textStyle: {
              color: "#00a9fb",
            },
          },
          xAxis: {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#397cbc",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#cecece",
                fontSize: 12,
              },
              rotate: 15,
            },
            data: data.map((item) => item.name),
          },
          yAxis: [
            {
              type: "value",
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: "#cecece",
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#397cbc",
                },
              },
              //网格线
              splitLine: {
                lineStyle: {
                  color: "#11366e",
                },
              },
            },
          ],
          series: [
            {
              name: "本公司",
              type: "line",
              data: data.map((item) => item.value),
              smooth: true,
              showSymbol: false,
              barWidth: "10",
              barGap: "-100%",
              itemStyle: {
                color: "#0F84CC",
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#0F84CC", // 线条颜色
                },
                borderColor: "#f0f",
              },
              areaStyle: {
                normal: {
                  color: "#0F84CC",
                  shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                  shadowBlur: 20,
                },
              },
            },
            {
              name: "同行业公司",
              type: "line",
              barWidth: "10",
              barGap: "-100%",
              data: data.map((item) => item.other),
              smooth: true, //是否平滑曲线显示
              showSymbol: false,
              itemStyle: {
                color: "#05D9E4",
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#05D9E4", // 线条颜色
                },
                borderColor: "#f0f",
              },
              areaStyle: {
                normal: {
                  color: "#05D9E4",
                  shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                  shadowBlur: 20,
                },
              },
            },
          ],
        },
        true
      );
      myChart.off("click");
      myChart.getZr().off("click");
      myChart.getZr().on("click", (params) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (myChart.containPixel("grid", pointInPixel) || data.length === 0) {
          routerChange("/more");
        }
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
      lineChart,
    };
  },
};
</script>
