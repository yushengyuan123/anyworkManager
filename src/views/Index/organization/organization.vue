<template>
    <div class="organization-container">
        <buttonArea></buttonArea>

        <myOrganization
            :isShow="memberShow"
            :studentList="studentList"
            @updateRankList="getRankList"
        ></myOrganization>

        <rank
                :rank="rankList"
        >

        </rank>
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
                studentList: [],

                //学生排名数组
                rankList: []
            }
        },

        methods: {
            //这里是组件MyOrganization 通过emit触发的方法 从这里获取到rank 传入组件rank中
            getRankList({testPaperId, organizationId}) {
                organizationId = organizationId || ''

                organizationApi.getMemberList({testpaperId: testPaperId}, organizationId).then(res => {
                    this.rankList = res.data.leaderboards
                })
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
