<template>
    <div class="my-organization">
        <div class="my-organization-title">我的组织</div>

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
                    @click.native="openLayer(item.id)"
                    @updateOrganization="getOrganizationMember"
            ></organizationCard>
        </div>
    </div>
</template>

<script>
    import organizationCard from "./organizationCard/organizationCard";
    import drawer from "./organizationCard/drawer/drawer";
    import organizationMember from "../organizationMember/organizationMember";
    import organizationApi from "../../../share/api/organizationApi";
    import {interceptors, interceptorsRes} from "../../../share/net/response";

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
                copyPropsStudent: []
            }
        },

        mounted() {
            this.getOrganizationMember()
        },

        methods: {
            //获取组织信息。在organizationCard执行删除逻辑后，子组件emit调用本方法重新渲染视图
            getOrganizationMember() {
                //这里是为了在删除之后重新请求的时候先清空list，否则会造成有重复元素
                if (this.organizationList) {
                    this.organizationList.length = 0
                }

                organizationApi.getMyOrganization().then(res => {
                    this.dataControl(res.data)
                })
            },

            //把后端数据整理为前端自己的数据
            dataControl(arr) {
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

            openLayer(organizationId) {
                //再复制之前,先清空这个数组,再去重新获取新的学生数据
                this.studentList.length = 0

                organizationApi.getOrganizationStudent({organizationId: organizationId}).then(res => {
                    interceptors(() => {
                        this.copyDataToProps(res.data)
                        this.isShow.show = true
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
                    this.studentList.push(data[i])
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "myOrganization";
</style>
