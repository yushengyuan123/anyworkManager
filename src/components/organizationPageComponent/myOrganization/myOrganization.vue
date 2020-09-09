<template>
    <div class="my-organization">
        <div class="my-organization-title">我的组织</div>

        <div class="details-container">
            <organizationCard></organizationCard>
        </div>
    </div>
</template>

<script>
    import organizationCard from "./organizationCard/organizationCard";
    export default {
        name: "myOrganization",

        components: {
            organizationCard: organizationCard
        }

    }
</script>

<style scoped lang="scss">
    @import "myOrganization";
</style>
