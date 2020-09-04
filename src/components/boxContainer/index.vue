<template>
  <div class="box-container">
    <four-angel>
      <div class="boxTitle">{{ boxTitle }}</div>
      <div class="main-content">
        <slot></slot>
      </div>
    </four-angel>
  </div>
</template>

<script>
import fourAngel from "../fourAngel/index";
export default {
  name: "boxContainer",
  props: {
    boxTitle: {
      type: String,
      default: "",
    },
  },
  components: {
    fourAngel,
  },
};
</script>

<style lang="scss" scoped>
.box-container {
  width: 100%;
  height: 100%;
  .boxTitle {
    height: 28px;
    line-height: 28px;
    text-align: center;
    width: 100%;
    font-size: 0.9rem;
    color: #b3efff;
    font-family: "黑体";
  }
  .main-content {
    height: calc(100% - 28px);
    width: 100%;
  }
}
</style>
