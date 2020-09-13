<template>
    <div class="my-organization">
        <Tabs v-model:value="currentFocus" @on-click="switchOrganization" :animated="false">
            <TabPane label="所有组织" name="-1">
                <div class="details-container">
                    <organizationCard
                            v-for="item in organizationList"
                            :key="item.id"
                            :organizationName="item.organizationName"
                            :teacher="item.teacher"
                            :passKey="item.passKey"
                            :des="item.des"
                            :imagePath="item.imagePath"
                            :studentNumber="item.studentNumber"
                            :organizationId="item.id"
                    ></organizationCard>
                </div>
            </TabPane>
            <TabPane
                    v-for="item in organizationList"
                    :label="item.organizationName"
                    :key="item.id"
                    :name="item.id.toString()"
            >
                <div class="details-container">
                    <organizationMember
                            :studentList="organizationStudent"
                    ></organizationMember>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import organizationCard from "./organizationCard/organizationCard";
    import organizationMember from "../organizationMember/organizationMember";
    import organizationApi from "../../../share/api/organizationApi";
    import {interceptors} from "../../../share/net/response";
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "myOrganization",

        components: {
            organizationCard: organizationCard,
            organizationMember: organizationMember
        },

        props: {
            isShow: {type: Object},

            studentList: {type: Array}
        },

        data() {
            return {
                organizationList: [],

                studentRankList: [],

                organizationStudent: [],

                //目前被选中的tab的name
                currentFocus: '-1',
            }
        },

        mounted() {
            this.getOrganizationMember()

            this.getClassRank()
        },

        computed: {
            ...mapGetters(['getFlush']),
        },

        watch: {
            currentFocus: function (newValue, oldValue) {
                this.currentOrgChange(newValue)
            },

            getFlush: function (newValue, oldValue) {
                if (newValue === true) {
                    this.getOrganizationMember()

                    this.notifyFlush(false)
                }
            }
        },

        methods: {
            //通过store 修改状态，通知card组件重新请求数据进行视图更新
            ...mapMutations(['notifyFlush']),

            ...mapMutations(['currentOrgChange']),

            //store获取当前用户选择试卷的id
            ...mapGetters(['getCurrentPaperId']),

            //获取组织信息。在organizationCard执行删除逻辑后，子组件emit调用本方法重新渲染视图
            getOrganizationMember() {
                //这里是为了在删除之后重新请求的时候先清空list，否则会造成有重复元素
                if (this.organizationList) {
                    this.organizationList.length = 0
                }

                organizationApi.getMyOrganization().then(res => {
                    this.renderData(res.data)
                })
            },

            //把后端数据整理为前端自己的数据
            renderData(arr) {
                for (let i = 0; i < arr.length; i++) {
                    this.organizationList.push({
                        id: arr[i].organizationId,
                        organizationName: arr[i].organizationName,
                        teacher: arr[i].teacherName,
                        passKey: arr[i].token,
                        imagePath: arr[i].imagePath,
                        des: arr[i].description,
                        studentNumber: arr[i].count
                    })
                }
            },

            //点击tab 获取单个组织学生列表
            getSingleOrgStudent(organizationId) {
                //-1 代表用户点击的是获取全部组织 此时不需要要去获得单个学生的列表
                if (organizationId == -1) {
                    return
                }
                //再复制之前,先清空这个数组,再去重新获取新的学生数据
                this.studentList.length = 0

                organizationApi.getOrganizationStudent({organizationId: organizationId}).then(res => {
                    this.organizationStudent = res.data || []
                })
            },


            //点击tab切换组织，重新请求数组更新organizationList
            switchOrganization() {
                this.getClassRank(this.currentFocus)

                this.getSingleOrgStudent(parseInt(this.currentFocus))
            },

            //获得某个组织学生的排名
            getClassRank(param) {
                param = param || ''

                if (param == -1) {
                    param = ''
                }

                this.$emit('updateRankList', {
                    testPaperId: this.getCurrentPaperId(),
                    organizationId: param
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "myOrganization";
</style>
