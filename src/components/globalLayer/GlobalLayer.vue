<!--弹窗背景遮罩层-->

<style lang="scss" scoped>
    @import "../../share/cssMixin/cssMixin";

    .global-layer {
        @include flex-layout;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .2);
        z-index: 100;
    }
</style>

<template>
    <div class="global-layer">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'GlobalLayer'
  }
</script>
