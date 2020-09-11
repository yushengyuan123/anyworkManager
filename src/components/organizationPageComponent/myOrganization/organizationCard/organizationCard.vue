<template>
    <div class="organization-card-container">
        <drawer
                :show="showEdit"
                :imageUrl="imageUrl"
        ></drawer>

        <div class="header-title-container">
            <div class="image-container">
                <img :src="imageUrl" alt="">
            </div>
            <div class="text-container">
                {{organizationName}}
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
    import drawer from "./drawer/drawer";
    import OrganizationApi from "../../../../share/api/organizationApi";
    import {interceptorsRes} from "../../../../share/net/response";

    export default {
        name: "organizationCard",

        components: {
            drawer: drawer
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
                showEdit: {showDrawer: false},
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
            //打开编辑右侧栏
            openEditDrawer() {
                this.showEdit.showDrawer = true
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
                    interceptorsRes(() => {
                        this.$emit('updateOrganization')
                    }, {
                        message: res.stateInfo,
                        status: res.state
                    }, true)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "organizationCard";
</style>
