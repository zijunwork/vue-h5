<!--
 * @Overview:   Settings
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/14 19:44
 * @Mark:
 -->

<template>
  <div class="views-settings">
    <van-cell-group :border="false">
      <van-cell :title="$t('cellTitle[0]')" center icon="logistics">
        <template #right-icon>
          <van-switch
              @change="onOpenPageTransChange"
              size="24"
              v-model="openPageTransValue"
          />
        </template>
      </van-cell>
      <van-cell
          :title="$t('cellTitle[1]')"
          :title-class="{ 'disable-show': !openPageTrans }"
          icon="exchange"
      >
        <van-dropdown-menu>
          <van-dropdown-item
              :disabled="!openPageTrans"
              :options="transOption"
              @change="onTransDirectionChange"
              v-model="transDirectionValue"
          />
        </van-dropdown-menu>
      </van-cell>
      <van-cell :title="$t('cellTitle[2]')" center icon="eye-o">
        <template #right-icon>
          <van-switch
              @change="onVConsoleChange"
              size="24"
              v-model="openVConsoleValue"
          />
        </template>
      </van-cell>
      <van-cell :title="$t('cellTitle[3]')" center icon="setting-o">
        <template #right-icon>
          <van-switch
              @change="onFixedNavBar"
              size="24"
              v-model="fixedNavBarValue"
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
import {switchVConsole} from "utils/common-methods";

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

  created() {
    this.openPageTransValue = this.openPageTrans;
    this.handleTransDirection(this.transDirection);
    this.handleVConsole(this.openVConsole);
    this.fixedNavBarValue = this.fixedNavBar;
    this.langValue = this.lang;
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
     * @description 是否开启切换切换动画改变触发
     * @param value {boolean} 改变值
     */
    onOpenPageTransChange(value) {
      this.SET_OPEN_PAGE_TRANS(value);
    },

    /**
     * @description 页面切换效果改变触发
     * @param value {string} 改变值
     */
    onTransDirectionChange(value) {
      this.SET_TRANS_DIRECTION(value);
    },

    /**
     * @description 是否开启VConsole
     * @param value {boolean} 改变值
     */
    onVConsoleChange(value) {
      this.SET_OPEN_VCONSOLE(value);
      value && location.reload();
    },

    /**
     * @description 全局启用导航栏
     * @param value {boolean} 改变值
     */
    onFixedNavBar(value) {
      this.SET_FIXED_NAV_BAR(value);
    },

    /**
     * @description 设置多语言
     * @param value {boolean} 改变值
     */
    onLangChange(value) {
      this.SET_LANG(value);
      location.reload();
    },

    /**
     * @description 返回
     */
    onClickLeft() {
      this.$router.push("/");
    },

    /**
     * @description 返回动画效果展示
     * @param newV {string} 动画值
     */
    handleTransDirection(newV) {
      this.transDirectionValue = newV.includes("slide")
          ? "slide"
          : this.transDirection;
    },

    /**
     * @description 返回VConsole展示
     * @param newV {boolean} 设置值
     */
    handleVConsole(newV) {
      switchVConsole(newV);
      this.openVConsoleValue = newV;
    }
  },

  watch: {
    openPageTrans(newV) {
      this.openPageTransValue = newV;
    },
    transDirection(newV) {
      this.handleTransDirection(newV);
    },
    openVConsole(newV) {
      this.handleVConsole(newV);
    },
    fixedNavBar(newV) {
      this.fixedNavBarValue = newV;
    },
    lang(newV) {
      this.langValue = newV;
    }
  }
};
</script>
