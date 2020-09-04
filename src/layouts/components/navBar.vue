<template>
  <div class="nav-wrapper">
    <div class="bar-title">大数据分析系统</div>
    <div class="time">{{ date }} {{ time }}</div>
    <div class="mapChoose" v-if="parentInfo.length > 1">
      <span v-for="(item, index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item, index)">{{
          item.cityName == "全国" ? "中国" : item.cityName
        }}</span>
        <span class="icon" v-show="index + 1 != parentInfo.length">></span>
      </span>
    </div>
  </div>
</template>

<script>
import { setup, ref, onMounted } from "vue";
import { getDate, getTime } from "@/utils/date.js";
import useResize from "@/componentApi/useResize.js";

export default {
  name: "navBar",

  setup(props, context) {
    //年月日
    const date = getDate();
    //时分秒
    const time = ref(getTime());
    const { parentInfo, removeCommitMapInfo } = useResize();

    const chooseArea = (item, index) => {
      if (parentInfo.value.length === index + 1) {
        return;
      }
      removeCommitMapInfo(index + 1);
    };

    onMounted: {
      setInterval(() => {
        time.value = getTime();
      }, 1000);
    }

    return {
      date,
      time,
      parentInfo,
      chooseArea,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  height: 65px;
  line-height: 50px;
  width: 100%;
  background: url("../../assets/image/nav.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
  color: #b3efff;

  .bar-title {
    font-size: 1.23rem;
    font-family: "黑体";
  }

  .time {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-35%);
    font-family: "Time Number";
    font-weight: bold;
    font-size: 1.22rem;
  }
  .mapChoose {
    position: absolute;
    left: 10px;
    bottom: -5px;
    color: #eee;

    .title {
      padding: 4px;
      border-top: 1px solid rgba(147, 235, 248, 0.8);
      border-bottom: 1px solid rgba(147, 235, 248, 0.8);
      cursor: pointer;
      font-size: 14px;
    }

    .icon {
      font-family: "simsun";
      font-size: 25px;
      margin: 0 11px;
    }
  }
}
</style>
