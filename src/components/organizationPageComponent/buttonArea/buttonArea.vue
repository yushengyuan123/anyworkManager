<template>
    <div class="btn-container">
        <drawer

        ></drawer>

        <editForm
                v-if="showCreateMenu"
                :title="0"
                @close="closeEdit"
        >
        </editForm>

        <!-- <Select v-model="currentFocus" style="width:200px" @on-change="statusChange">
            <Option v-for="item in paperList" :value="item.testpaperId" :key="item.id">{{ item.title }}</Option>
        </Select> -->

        <Button type="primary" shape="circle" @click="openCreateMenu">创建组织</Button>
    </div>
</template>

<script>
    import OrganizationApi from "../../../share/api/organizationApi";
    import {interceptors} from "../../../share/net/response";
    import {mapMutations} from "vuex";
    import editForm from "../editForm/editForm";

    export default {
        name: "buttonArea",

        components: {
            editForm
        },

        data() {
            return {
                //试卷列表数组
                paperList: [],

                currentFocus: '',

                showCreateMenu: false,
            }
        },

        // mounted() {
            // this.getPaperList()
        // },

        computed: {

        },

        methods: {
            ...mapMutations(['currentPaperChange']),
            // //获取试卷列表
            // getPaperList() {
            //     OrganizationApi.getExaminationPaperList().then(res => {
            //         interceptors(() => {
            //             this.renderData(res.data)
            //             this.$store.commit('addPaper', res.data)
            //         }, {
            //             message: res.stateInfo,
            //             status: res.state
            //         }, false)
            //     })
            // },

            renderData(arr) {
                arr.forEach((item, index) => {
                    this.paperList.push({
                        id: index,
                        title: item.testpaperTitle,
                        testpaperId: item.testpaperId.toString(),
                    })
                })
            },

            openCreateMenu() {
                this.showCreateMenu = true
            },

            // //当选择改变时对应改变试卷
            // statusChange() {
            //     this.currentPaperChange(this.currentFocus)
            // },

            //关闭痰喘
            closeEdit() {
                this.showCreateMenu = false
            }

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../share/cssMixin/cssMixin";
    .btn-container {
        display: flex;
        align-items: center;
        justify-content: left;
        height: 6rem;
    }
</style>
