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
    import organizationMember
        from "../../../components/organizationPageComponent/organizationMember/organizationMember";
    import {mapGetters} from "vuex";
    import {interceptors} from "../../../share/net/response";

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

        mounted() {

        },

        computed: {
            ...mapGetters(['getCurrentPaperId']),

            ...mapGetters(['getCurrentOrg'])
        },

        watch: {
            getCurrentPaperId: function (newValue, oldValue) {
                this.getRankList({testPaperId: newValue, organizationId: this.getCurrentOrg})
            },

            getCurrentOrg: function (newValue) {
                this.getRankList({testPaperId: this.getCurrentPaperId, organizationId: newValue})
            }
        },

        methods: {
            //这里是组件MyOrganization 通过emit触发的方法 从这里获取到rank 传入组件rank中
            getRankList({testPaperId, organizationId}) {
                if (organizationId == -1) {
                    return
                }

                organizationId = organizationId || ''

                organizationApi.getMemberList({testpaperId: testPaperId}, organizationId).then(res => {
                    //这里后台有点恶心人，同一个接口，传入参数不同，返回的数据结构不一样，需要自行判断
                    interceptors(() => {
                        if (res.data.leaderboards) {
                            this.rankList = res.data.leaderboards
                        } else {
                            this.rankList = res.data
                        }
                    }, {
                        message: res.stateInfo,
                        status: res.state
                    }, false)
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
