<template>
    <div class="organization-card-container">
        <editForm
                v-if="showEdit"
                :imageUrl="imageUrl"
                :token="description[1].value"
                :desc="description[2].value"
                :organizationName="organizationName"
                :organizationId="organizationId"
                :title="1"
                @close="closeEdit"
        ></editForm>

        <div class="header-title-container">
            <div class="image-container">
                <img :src="imageUrl" alt="">
            </div>
            <div class="text-container">
                {{ organizationName }}
            </div>
        </div>

        <div class="organization-tag">组织</div>

        <div class="organization-info-container">

            <div class="des-outer" v-for="item in description" :key="item.key">
                <div class="des-container">{{item.name}}</div>
                <div class="des-value">{{item.value}}</div>
            </div>
        </div>

        <div class="control-container">
            <span>
                <img
                        src="../../../../assets/images_ysy/edit.png"
                        alt="" @click.stop="openEditDrawer"
                >
            </span>
            <span>
                <img
                        src="../../../../assets/images_ysy/delete.png" alt=""
                        @click.stop="deleteConfirm"
                >
            </span>
            <span class="people-num">人数:{{studentNumber}}</span>
        </div>
    </div>
</template>

<script>
    import OrganizationApi from "../../../../share/api/organizationApi";
    import {interceptors} from "../../../../share/net/response";
    import {mapMutations} from "vuex";
    import editForm from "../../editForm/editForm";

    export default {
        name: "organizationCard",

        components: {
            editForm
        },

        props: {
            organizationId: {type: Number},

            organizationName: {type: String},

            teacher: {type: String},

            passKey: {type: String},

            des: {type: String},

            studentNumber: {type: Number},

            imagePath: {type: String}
        },

        data() {
            return {
                showEdit: false,

                imageUrl: process.env.VUE_APP_URL + this.imagePath.replace('/anywork', ''),

                description: [
                    {
                        key: 0,
                        name: '教师',
                        value: this.teacher,
                    },
                    {
                        key: 1,
                        name: '密钥',
                        value: this.passKey,
                    },
                    {
                        key: 2,
                        name: '描述',
                        value: this.des,
                    },
                ]
            }
        },

        methods: {
            ...mapMutations(['notifyFlush']),

            //打开编辑右侧栏
            openEditDrawer() {
                this.showEdit = true
            },

            //删除组织前的确认操作
            deleteConfirm() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确认要删除吗</p>',
                    onOk: () => {
                        this.deleteOrganization()
                    },
                })
            },

            //调用接口删除组织
            deleteOrganization() {
                OrganizationApi.deleteOrganization({organizationId: this.organizationId}).then(res => {
                    interceptors(() => {
                        //通知视图更新
                        this.notifyFlush(true)
                    }, {
                        message: res.stateInfo,
                        status: res.state
                    }, true)
                })
            },

            //关闭弹窗
            closeEdit() {
                this.showEdit = false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "organizationCard";
</style>
