<template>
    <div class="organization-container">
        <div>
            <buttonArea></buttonArea>
        </div>
        <div>
            <myOrganization
                    :isShow="memberShow"
                    :studentList="studentList"
                    @updateRankList="getRankList"
            ></myOrganization>
        </div>
        <div>
            <rank :rank="rankList"></rank>
        </div>
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
            getRankList({testPaperId, organizationId}) {
                if (organizationId == -1) {
                    organizationId = ""
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
