<!--
 * @Overview:   App file
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/8 15:43
 * @Mark:
 -->

<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :max="10" v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view v-else class="router"></router-view>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("settings", ["openPageTrans", "transDirection"]),

    transitionName() {
      return this.openPageTrans ? this.transDirection : "";
    }
  },

  mounted() {
    // TODO...
  },

  methods: {
    ...mapMutations("settings", ["SET_TRANS_DIRECTION"])
  },

  watch: {
    $route(to, from) {
      const toT = parseInt(to.meta.t),
        fromT = parseInt(from.meta.t);
      if (
        this.openPageTrans &&
        this.transDirection &&
        this.transDirection.includes("slide") &&
        toT &&
        fromT
      ) {
        this.SET_TRANS_DIRECTION(`slide-${toT < fromT ? "right" : "left"}`);
      } else if (
        this.openPageTrans &&
        this.transDirection &&
        this.transDirection === "fade" &&
        toT &&
        fromT
      ) {
        this.SET_TRANS_DIRECTION("fade");
      } else {
        // Do nothing
      }
    }
  }
};
</script>
