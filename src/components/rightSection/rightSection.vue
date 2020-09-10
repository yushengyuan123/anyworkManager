<template>
    <div class="right-container">
        <rightSectionHeader></rightSectionHeader>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import rightSectionHeader from './header/rightSectionHeader'

    export default {
        name: "rightSection",

        components: {
            rightSectionHeader: rightSectionHeader
        }
    }

</script>

<style scoped lang="scss">
    .right-container {
        min-height: 100vh;
        width: 100%;
        background-color: #f5f7f9;
        overflow: auto;
        padding-bottom: 7rem;
    }
</style>
