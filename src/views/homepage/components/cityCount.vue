<template>
  <div class="chart-wrapper" ref="cityCount"></div>
</template>

<script>
import echarts from "echarts";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { debounce } from "@/utils/index.js";

import useResize from "@/componentApi/useResize.js";
import { selectCityData } from "@/api/chart";

export default {
  name: "cityCount",
  setup() {
    let { abcode, year, parentInfo, routerChange } = useResize();

    const cityCount = ref(null);
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
      const { data } = await selectCityData({
        abcode,
        year,
      });
      let xData = [],
        yData = [];
      data.forEach((item) => {
        xData.push(item.name);
        yData.push(item.value);
      });
      initEcharts(xData, yData);
    };

    //渲染echarts图
    const initEcharts = (xData, yData) => {
      myChart = echarts.init(cityCount.value);
      myChart.setOption(
        {
          grid: {
            left: "13%",
            right: "8%",
            bottom: "25%",
            top: "10%",
          },
          title: {
            show: xData.length === 0,
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
              type: "shadow",
            },
            formatter: (params) => {
              return params[0].name + "<br>销售额度：" + params[0].value + "万";
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
                name: year.value + "年销售额排名",
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
              endValue: 10,
            },
          ],
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
            //轴线上的字
            axisLabel: {
              show: true,
              textStyle: {
                color: "#cecece",
                fontSize: 12,
              },
              rotate: 15,
            },
            data: xData,
          },
          yAxis: [
            {
              type: "value",
              axisTick: {
                show: false,
              },
              //轴线上的字
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
              name: "销售额度",
              type: "bar",
              data: yData,
              barWidth: "45%",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#01BDF4",
                    },
                    {
                      offset: 1,
                      color: "#083AF6 ",
                    },
                  ],
                  false
                ),
              },
            },
          ],
        },
        true
      );

      myChart.getZr().off("click");
      myChart.getZr().on("click", (params) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (myChart.containPixel("grid", pointInPixel) || xData.length === 0) {
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
      cityCount,
    };
  },
};
</script>
