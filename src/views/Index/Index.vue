<template>
    <div class="layout-container">
        <leftSection></leftSection>
        <rightSection></rightSection>
    </div>
</template>

<script>
    import leftSection from "../../components/leftSection/leftSection";
    import rightSection from "../../components/rightSection/rightSection";

    export default {
        name: 'Index',

        components: {
            leftSection: leftSection,
            rightSection: rightSection
        }
    }
</script>

<style lang="scss">
    .layout-container {
        position: relative;
        display: flex;
        width: 100%;
        height: 100vh;
    }
</style>
