<!--
 * @Overview:   Settings
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/14 19:44
 * @Mark:
 -->

<template>
  <div class="views-settings">
    <van-cell-group>
      <van-cell :title="$t('cellTitle[0]')" center icon="logistics">
        <template #right-icon>
          <van-switch
              v-model="openPageTransValue"
              size="24"
              @change="onOpenPageTransChange"
          />
        </template>
      </van-cell>
      <van-cell
          :title="$t('cellTitle[1]')"
          icon="exchange"
          :title-class="{ 'disable-show': !openPageTrans }"
      >
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="transDirectionValue"
            :options="transOption"
            :disabled="!openPageTrans"
            @change="onTransDirectionChange"
          />
        </van-dropdown-menu>
      </van-cell>
      <van-cell :title="$t('cellTitle[2]')" center icon="eye-o">
        <template #right-icon>
          <van-switch
              v-model="openVConsoleValue"
              size="24"
              @change="onVConsoleChange"
          />
        </template>
      </van-cell>
      <van-cell :title="$t('cellTitle[3]')" center icon="setting-o">
        <template #right-icon>
          <van-switch
              v-model="fixedNavBarValue"
              size="24"
              @change="onFixedNavBar"
          />
        </template>
      </van-cell>
      <van-cell :title="$t('cellTitle[4]')" icon="flag-o">
        <van-dropdown-menu>
          <van-dropdown-item
              :options="langOption"
              @change="onLangChange"
              v-model="langValue"
          />
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {Cell, CellGroup, DropdownItem, DropdownMenu, Field, Switch} from "vant";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Settings",

  components: {
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [CellGroup.name]: CellGroup,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field
  },

  data() {
    return {
      openPageTransValue: "",
      transDirectionValue: "",
      openVConsoleValue: "",
      fixedNavBarValue: "",
      appNameValue: "",
      transOption: [
        {text: "slide", value: "slide"},
        {text: "fade", value: "fade"}
      ],
      langValue: "",
      langOption: [
        {text: "简体中文", value: "zh-CN"},
        {text: "繁體中文", value: "zh-HK"},
        {text: "English", value: "en-US"}
      ]
    };
  },

  computed: {
    ...mapGetters("settings", [
      "openPageTrans",
      "transDirection",
      "openVConsole",
      "fixedNavBar",
      "lang"
    ])
  },

  methods: {
    ...mapMutations("settings", [
      "SET_OPEN_PAGE_TRANS",
      "SET_TRANS_DIRECTION",
      "SET_OPEN_VCONSOLE",
      "SET_FIXED_NAV_BAR",
      "SET_LANG"
    ]),

    /**
     * 是否开启切换切换动画改变触发
     * @param value {boolean} 改变值
     */
    onOpenPageTransChange(value) {
      this.SET_OPEN_PAGE_TRANS(value);
    },

    /**
     * 页面切换效果改变触发
     * @param value {string} 改变值
     */
    onTransDirectionChange(value) {
      this.SET_TRANS_DIRECTION(value);
    },

    /**
     * 是否开启VConsole
     * @param value {boolean} 改变值
     */
    onVConsoleChange(value) {
      this.SET_OPEN_VCONSOLE(value);
    },

    /**
     * 全局启用导航栏
     * @param value {boolean} 改变值
     */
    onFixedNavBar(value) {
      this.SET_FIXED_NAV_BAR(value);
    },

    /**
     * 设置多语言
     * @param value {boolean} 改变值
     */
    onLangChange(value) {
      this.SET_LANG(value);
      location.reload();
    },

    /**
     * 返回
     */
    onClickLeft() {
      this.$router.push("/");
    }
  },

  watch: {
    openPageTrans: {
      handler(newV) {
        this.openPageTransValue = newV;
      },
      immediate: true
    },
    transDirection: {
      handler(newV) {
        this.transDirectionValue = newV.includes("slide")
          ? "slide"
          : this.transDirection;
      },
      immediate: true
    },
    openVConsole: {
      handler(newV) {
        let vConsoleEl = document.querySelector("#__vconsole");
        if (newV) {
          process.env.NODE_ENV === "development" &&
            vConsoleEl &&
            (vConsoleEl.style.display = "block");
        } else {
          process.env.NODE_ENV === "development" &&
            vConsoleEl &&
          (vConsoleEl.style.display = "none");
        }
        this.openVConsoleValue = newV;
      },
      immediate: true
    },
    fixedNavBar: {
      handler(newV) {
        this.fixedNavBarValue = newV;
      },
      immediate: true
    },
    lang: {
      handler(newV) {
        this.langValue = newV;
      },
      immediate: true
    }
  }
};
</script>
