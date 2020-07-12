<template>
  <div class="views-settings">
    <van-nav-bar
      title="系统设置"
      left-text=""
      left-arrow
      border
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell center title="开启页面切换动画" icon="logistics">
        <template #right-icon>
          <van-switch
            v-model="openPageTransValue"
            size="24"
            @change="onOpenPageTransChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="页面切换样式"
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
      <van-cell center title="开启VConsole" icon="eye-o">
        <template #right-icon>
          <van-switch
            v-model="openVConsoleValue"
            size="24"
            @change="onVConsoleChange"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {
  Cell,
  Switch,
  CellGroup,
  NavBar,
  DropdownMenu,
  DropdownItem,
  Field
} from "vant";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Settings",

  components: {
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Field.name]: Field
  },

  data() {
    return {
      openPageTransValue: "",
      transDirectionValue: "",
      openVConsoleValue: "",
      appNameValue: "",
      transOption: [
        { text: "slide", value: "slide" },
        { text: "fade", value: "fade" }
      ]
    };
  },

  computed: {
    ...mapGetters("settings", [
      "openPageTrans",
      "transDirection",
      "openVConsole"
    ])
  },

  created() {
    // this.openPageTransValue = this.openPageTrans;
  },

  mounted() {
    // TODO...
  },
  methods: {
    ...mapMutations("settings", [
      "SET_OPEN_PAGE_TRANS",
      "SET_TRANS_DIRECTION",
      "SET_OPEN_VCONSOLE"
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
    }
  }
};
</script>
