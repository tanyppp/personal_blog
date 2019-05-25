<template>
  <canvas ref="can" width="80" height="30" @click="drawCanvas"/>
</template>

<script>

export default {
  props: ["reDraw"],
  methods: {
    drawCanvas() {
      this.$emit("draw-can", this.$refs.can);
    }
  },
  mounted() {
    this.drawCanvas();
  }
};
</script>

<style lang="scss" scoped>
canvas {
  cursor: pointer;
  border-radius: 5px;
  background: url("../../../images/canvasbg.jpg") 50% / cover no-repeat;
}
</style>

