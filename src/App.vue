<!--
 * @Overview:   App file
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/8 15:43
 * @Mark:
 -->

<template>
  <div id="app">
    <van-nav-bar
      :title="pageTitle"
      left-arrow
      @click-left="onClickLeft"
      v-if="fixedNavBar || showNavBar"
    />
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view
          class="router"
          :class="[showNavBar ? 'nav-router' : 'common-router']"
        ></router-view>
      </keep-alive>
      <router-view
        v-else
        :class="[showNavBar ? 'nav-router' : 'common-router']"
      ></router-view>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { NavBar } from "vant";
import { getBrowser } from "utils/common-methods";

export default {
  name: "App",

  components: {
    [NavBar.name]: NavBar
  },

  data() {
    return {
      isApp: getBrowser().isApp,
      isWeChat: getBrowser().isWeChat,
      pageTitle: "首页"
    };
  },

  computed: {
    ...mapGetters("settings", [
      "openPageTrans",
      "transDirection",
      "fixedNavBar"
    ]),

    transitionName() {
      return this.openPageTrans ? this.transDirection : "";
    },

    showNavBar() {
      return (
        (this.fixedNavBar ||
          (this.$route.meta.showNavBar && this.$route.meta.showNavBar)) &&
        !this.isApp &&
        !this.isWeChat
      );
    }
  },

  mounted() {
    // TODO...
  },

  methods: {
    ...mapMutations("settings", ["SET_TRANS_DIRECTION"]),

    onClickLeft() {
      this.$router.go(-1);
    }
  },

  watch: {
    $route(to, from) {
      console.log({ to });
      this.pageTitle = to.meta.title;
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
