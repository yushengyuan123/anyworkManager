<template>
    <div class="header-container">
        <div>
            注销
        </div>
    </div>
</template>

<script>
    export default {
        name: "rightSectionHeader"
    }
</script>

<style scoped lang="scss">
    $height: 2.5rem;
    .header-container {
        height: $height;
        line-height: $height;
        text-align: right;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        background: #fff;
        padding-right: 15px;
        color: #929292
    }
</style>
