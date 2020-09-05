<template>
  <div class="more-container">
    <z-row :gutter="12">
      <z-col :span="7">
        <div class="echartList">
          <div class="itemChart">
            <four-angel>
              <gauge-chart />
            </four-angel>
          </div>
          <div class="itemChart">
            <four-angel>
              <tree-chart />
            </four-angel>
          </div>
          <div class="itemChart">
            <four-angel>
              <radar-chart />
            </four-angel>
          </div>
        </div>
      </z-col>
      <z-col :span="10">
        <four-angel>
          <component :is="mapType" @changeMap="getMap" />
        </four-angel>
      </z-col>
      <z-col :span="7">
        <four-angel>
          <graph-chart />
        </four-angel>
      </z-col>
    </z-row>
  </div>
</template>

<script>
import { ZRow, ZCol } from "@UI/components";
import fourAngel from "@/components/fourAngel/index";
import { ref } from "vue";
import {
  graphChart,
  gaugeChart,
  treeChart,
  radarChart,
  hotMap,
  pointMap,
  morePointMap,
} from "./components";
export default {
  name: "more",
  components: {
    ZRow,
    ZCol,
    fourAngel,
    graphChart,
    gaugeChart,
    treeChart,
    radarChart,
    hotMap,
    pointMap,
    morePointMap,
  },
  setup(props, context) {
    const mapType = ref("pointMap");

    const getMap = (val) => {
      mapType.value = val;
    };

    return {
      mapType,
      getMap,
    };
  },
};
</script>

<style lang="scss" scoped>
.more-container {
  width: 100%;
  height: 100%;
  position: relative;
  .echartList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    .itemChart {
      height: 32.1%;
      width: 100%;
    }
  }
}
</style>
