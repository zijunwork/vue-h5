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
          :class="[showNavBar ? 'nav-router' : 'common-router']"
          :key="$route.name"
          class="router"
        ></router-view>
      </keep-alive>
      <router-view
        :class="[showNavBar ? 'nav-router' : 'common-router']"
        :key="$route.name"
        class="router"
        v-else
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
      pageTitle: this.$t("route.home.title")
    };
  },

  created() {
    // 存储第一次进入页面的地址，用于ios微信分享url
    localStorage.setItem("firstHref", location.href);
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

  methods: {
    ...mapMutations("settings", ["SET_TRANS_DIRECTION"]),

    onClickLeft() {
      this.$router.go(-1);
    },

    watchRouter(to, from) {
      this.pageTitle = to.meta.title;
      if (
        this.openPageTrans &&
        this.transDirection &&
        this.transDirection.includes("slide")
      ) {
        to.meta.index &&
          this.SET_TRANS_DIRECTION(
            to.meta.index > (from.meta.index || -1)
              ? "slide-left"
              : "slide-right"
          );
      } else if (
        this.openPageTrans &&
        this.transDirection &&
        this.transDirection === "fade"
      ) {
        this.SET_TRANS_DIRECTION("fade");
      } else {
        // Do nothing
      }
    }
  },

  watch: {
    $route(to, from) {
      this.watchRouter(to, from);
    }
  }
};
</script>
