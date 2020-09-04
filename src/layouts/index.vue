<template>
  <div class="app-container">
    <nav-bar />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "./components/navBar";
export default {
  name: "layout",
  components: {
    navBar,
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../assets/image/bg.jpg") no-repeat;
  background-size: 100% 100%;

  .main-container {
    height: calc(100% - 65px);
    box-sizing: border-box;
    padding-bottom: 10px;
    width: 100%;
  }
}
</style>
