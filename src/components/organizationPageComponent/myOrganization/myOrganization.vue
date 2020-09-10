<template>
    <div class="my-organization">
        <!--  组织成员显示弹窗 -->
        <organizationMember></organizationMember>
        <div class="my-organization-title">我的组织</div>

        <div class="details-container">
            <organizationCard
                    v-for="item in cardList"
                    :key="item.id"
                    :organizationName="item.organizationName"
                    :teacher="item.teacher"
                    :passKey="item.passKey"
                    :des="item.des"
                    :studentNumber="item.studentNumber"
            ></organizationCard>
        </div>
    </div>
</template>

<script>
    import organizationCard from "./organizationCard/organizationCard";
    import drawer from "./organizationCard/drawer/drawer";
    import organizationMember from "../organizationMember/organizationMember";

    export default {
        name: "myOrganization",

        components: {
            organizationCard: organizationCard,
            drawer: drawer,
            organizationMember: organizationMember
        },

        data() {
            return {
                cardList: [
                    {
                        id: 1,
                        organizationName: '测试组织1',
                        teacher: '写光强',
                        passKey: '1234',
                        des: '123',
                        studentNumber: '13'
                    },
                    {
                        id: 2,
                        organizationName: 'QG',
                        teacher: 'asdasd',
                        passKey: 'asdasc',
                        des: 'zxczxc',
                        studentNumber: '10'
                    },
                    {
                        id: 3,
                        organizationName: '',
                        teacher: '',
                        passKey: '',
                        des: '',
                        studentNumber: ''
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "myOrganization";
</style>
