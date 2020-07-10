<template>
  <div class="about">
    <h1 @click="handleBack">This is an about page</h1>
    <label>
      <input placeholder="输入框" v-model="value" />
    </label>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    console.log("888");
  },
  methods: {
    handleBack() {
      // this.$router.go(-1);
      this.$router.push("/settings");
    }
  }
};
</script>
<style lang="less" scoped>
h1 {
  color: @theme-color;
  background-color: #07c160;
}
</style>
