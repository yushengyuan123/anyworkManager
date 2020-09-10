<template>
    <div class="organization-container">
        <buttonArea></buttonArea>
        <myOrganization></myOrganization>
        <rank></rank>
    </div>
</template>

<script>
    import buttonArea from "../../../components/organizationPageComponent/buttonArea/buttonArea";
    import myOrganization from "../../../components/organizationPageComponent/myOrganization/myOrganization";
    import rank from "../../../components/organizationPageComponent/rank/rank";
    export default {
        name: "organization",
        components: {
            buttonArea: buttonArea,
            myOrganization: myOrganization,
            rank: rank
        }
    }
</script>

<style scoped lang="scss">
    .organization-container {
        width: 95%;
        margin: auto;
    }
</style>
