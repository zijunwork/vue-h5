<!--
 * @Overview:   DemoHome
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 16:37
 * @Mark:
 -->

<template>
  <div class="demo-home">
    <div class="demo-home-title">
      <img src="../assets/images/logo.png" alt="" />
      <span>Vue-H5</span>
    </div>
    <p class="demo-home-desc">集成式、优化式Vue+Vant框架</p>
    <van-cell-group title="基本说明" class="demo-home-nav">
      <van-cell title="系统UI级设置" is-link url="/settings" />
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell } from "vant";
export default {
  name: "DemoHome",

  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },

  methods: {
    // jumpToAbout() {
    //   this.$router.push({ name: "Settings" });
    // }
  }
};
</script>
