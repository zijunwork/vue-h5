<template>
  <div class="home">
    <p @click="jumpToAbout">Hello World!</p>
    <label>
      <input type="text" :value="888" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    jumpToAbout() {
      this.$router.push({ name: "about" });
    }
  }
};
</script>
