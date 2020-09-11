<template>
    <div class="organization-container">
        <!-- 组织成员显示弹窗-->
        <organizationMember
                v-if="memberShow.show"
                :isShow="memberShow"
                :studentList="studentList"
        ></organizationMember>

        <buttonArea></buttonArea>

        <myOrganization
            :isShow="memberShow"
            :studentList="studentList"
        ></myOrganization>

        <rank></rank>
    </div>
</template>

<script>
    import buttonArea from "../../../components/organizationPageComponent/buttonArea/buttonArea";
    import myOrganization from "../../../components/organizationPageComponent/myOrganization/myOrganization";
    import rank from "../../../components/organizationPageComponent/rank/rank";
    import organizationApi from "../../../share/api/organizationApi";
    import organizationMember from "../../../components/organizationPageComponent/organizationMember/organizationMember";
    export default {
        name: "organization",
        components: {
            buttonArea: buttonArea,
            myOrganization: myOrganization,
            rank: rank,
            organizationMember: organizationMember
        },

        data() {
            return {
                memberShow: {show: false},
                //组织学生名单列表
                studentList: []
            }
        }

    }
</script>

<style scoped lang="scss">
    .organization-container {
        width: 95%;
        margin: auto;
    }
</style>
