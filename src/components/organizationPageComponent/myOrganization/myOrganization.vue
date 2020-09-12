<template>
    <div class="my-organization">
        <Tabs v-model:value="currentFocus" @on-click="switchOrganization">
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
                            v-if="show"
                    ></organizationMember>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import organizationCard from "./organizationCard/organizationCard";
    import drawer from "./organizationCard/drawer/drawer";
    import organizationMember from "../organizationMember/organizationMember";
    import organizationApi from "../../../share/api/organizationApi";
    import {interceptors} from "../../../share/net/response";

    export default {
        name: "myOrganization",

        components: {
            organizationCard: organizationCard,
            drawer: drawer,
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

                show: false
            }
        },

        mounted() {
            this.getOrganizationMember()
            this.getClassRank()
            // this.openLayer(28)
        },

        methods: {
            //获取组织信息。在organizationCard执行删除逻辑后，子组件emit调用本方法重新渲染视图
            getOrganizationMember(param) {
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
                console.log(this.organizationList)
            },

            getSingleOrgStudent(organizationId) {
                //再复制之前,先清空这个数组,再去重新获取新的学生数据
                this.studentList.length = 0

                organizationApi.getOrganizationStudent({organizationId: organizationId}).then(res => {
                    interceptors(() => {
                        this.organizationStudent = res.data
                        this.show = true
                    }, {
                        message: res.stateInfo,
                        status: res.state
                    }, true)
                })
            },


            //把后端返回的数组逐个复制到studentList中
            // 因为它是外界传过来的data,不能直接去修改它的引用
            //否则vue会给出报错
            copyDataToProps(data) {
                for (let i = 0; i < data.length; i++) {
                    this.studentRankList.push(data[i])
                }
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
                    return
                }

                this.$emit('updateRankList', {
                    testPaperId: 0,
                    organizationId: param
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "myOrganization";
</style>
