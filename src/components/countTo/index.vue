<template>
  <div class="chartNum">
    <span class="label">销售总量</span>
    <div
      class="box-item"
      v-for="(item, index) in value.toString()"
      :key="index"
    >
      <span>{{ item }}</span>
    </div>
    <span>{{ suffix }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "countTo",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {},
};
</script>

<style scoped lang="scss">
.chartNum {
  height: 15%;
  widows: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d5dfe8;
  .label {
    font-size: 1rem;
    margin-right: 12px;
    font-family: "黑体";
  }
  .box-item {
    position: relative;
    background: url("~@/assets/image/border.png") no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    width: 30px;
    height: 40px;
    line-height: 40px;
    color: #f0933f;
    font-size: 1.4rem;
    writing-mode: vertical-lr;
    text-orientation: upright;
    margin-right: 6px;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    span {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      letter-spacing: 10px;
      font-family: "Time Number";
      font-weight: bold;
    }
  }
}
</style>
