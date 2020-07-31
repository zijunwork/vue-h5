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
      <svg-icon icon-class="logo" class="logo-icon"></svg-icon>
      <span>Vue-H5</span>
    </div>
    <p class="demo-home-desc">{{ $t("demo.des") }}</p>
    <van-cell-group :title="$t('demo.groupTitle')" class="demo-home-nav">
      <van-cell :title="$t('demo.childTitle[0]')" is-link url="/settings"/>
    </van-cell-group>
  </div>
</template>

<script>
import {Cell, CellGroup} from "vant";

export default {
  name: "DemoHome",

  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  }
};
</script>
