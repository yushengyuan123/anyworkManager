<template>
    <div class="btn-container">

    </div>
</template>

<script>
    export default {
        name: "buttonArea"
    }
</script>

<style scoped lang="scss">
    @import "../../../share/cssMixin/cssMixin";
    .btn-container {
        @include flex-layout;
        height: 6rem;
    }
</style>
