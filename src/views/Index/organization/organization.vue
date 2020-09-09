<template>
    <div class="organization-container">
        <buttonArea></buttonArea>
        <myOrganization></myOrganization>
    </div>
</template>

<script>
    import buttonArea from "../../../components/organizationPageComponent/buttonArea/buttonArea";
    import myOrganization from "../../../components/organizationPageComponent/myOrganization/myOrganization";
    export default {
        name: "organization",
        components: {
            buttonArea: buttonArea,
            myOrganization: myOrganization
        }
    }
</script>

<style scoped lang="scss">
    .organization-container {
        width: 95%;
        margin: auto;
    }
</style>
