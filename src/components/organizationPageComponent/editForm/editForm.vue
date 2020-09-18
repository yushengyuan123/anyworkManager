<template>
    <GlobalLayer>
        <div class="edit-form-container">
            <div class="title-container">{{componentTitle}}</div>

            <Form ref="formValidate">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="组织头像" label-position="top">
                            <div class="image-upload-container">
                                <img :src="imagePath">
                                <input class="image-upload" type="file" @change="upload" ref="up_image">
                            </div>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="组织名称" prop="name">
                    <Input v-model="formData.organizationName" placeholder="输入组织名称"></Input>
                </FormItem>
                <FormItem label="组织口令" prop="mail">
                    <Input v-model="formData.token" placeholder="输入组织口令" :disabled="!!title"></Input>
                </FormItem>
                <FormItem label="组织描述" label-position="top">
                    <Input type="textarea" v-model="formData.description" :rows="4" placeholder="输入组织描述"/>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="submitConfirm">提交</Button>
                    <Button style="margin-left: 8px" @click="closeComponent">取消</Button>
                </FormItem>
            </Form>
        </div>
    </GlobalLayer>
</template>

<script>
    import GlobalLayer from "../../globalLayer/GlobalLayer";
    import {mapGetters, mapMutations} from 'vuex'
    import organizationApi from "../../../share/api/organizationApi";
    import {interceptors} from "../../../share/net/response";
    import * as globalUtils from '../../../share/utils/globalUtils'

    export default {
        name: "editForm",

        components: {
            GlobalLayer: GlobalLayer
        },

        props: {
            //组件复用传值，如果这个值为true，
            isCreate: {type: Object},
            //头像url
            imageUrl: {type: String, default: require('../../../assets/images/noimage.png')},
            //标题，为什么会有这个字段原因在于，这个组件是被复用的，创建和编辑都是用这个组件
            //0是创建 1是修改
            title: {type: Number | String},

            token: {type: String, default: ''},

            desc: {type: String, default: ''},

            organizationName: {type: String, default: ''},

            organizationId: {type: String | Number, default: ''}
        },

        data() {
            return {
                drawTitle: this.title,

                formData: {
                    organizationName: this.organizationName,
                    token: this.token,
                    description: this.desc,
                    organizationId: this.organizationId
                },

                filesData: new window.FormData(),

                imagePath: this.imageUrl,
            }
        },

        computed: {
            componentTitle() {
                return this.title ? '修改组织' : '创建组织'
            },

            ...mapGetters(['getFlush'])
        },

        mounted() {
            this.initFiles()
        },

        methods: {
            //通过store 修改状态，通知card组件重新请求数据进行视图更新
            ...mapMutations(['notifyFlush']),

            //初始化filesData
            initFiles() {
                const add = ["file", "token", "description", "organizationName", "organizationId"]

                add.forEach(key => {
                    this.filesData.append(key, null)
                })
            },

            //提交信息前的确认
            submitConfirm() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确认提交嘛</p>',
                    onOk: () => {
                        this.submitData()
                    },
                })
            },

            //发送数据到后台
            submitData() {
                const requestKey = this.formData

                //如果用户没有选择图片，说明她不修改头像 这时需要手动加入file 否则会被400
                if (this.filesData.get('file') === "null"
                    && this.title == 0) {
                    this.filesData.set('file', new File([], "noimage.png"))
                }

                //遍历formData，循环添加append
                for (let key in requestKey) {
                    this.filesData.set(key, requestKey[key])
                }

                let api = ""

                if (this.title == 0) {
                    this.filesData.delete("organizationId")
                    api = "createOrganization"
                } else if (this.title == 1){
                    this.filesData.delete("token")
                    api = "editOrg"
                    //如果用户有选择头像的话那要把头像也同时上传
                    if (this.filesData.get("file") !== "null") {
                        const avatar = new window.FormData()
                        avatar.append("file", this.filesData.get("file"))
                        avatar.append("organizationId", this.organizationId)
                        organizationApi.editOrgAvatar(avatar)
                            .then(res => {
                                console.log(res)
                            })
                    }
                    this.filesData.delete("file")
                } else {
                    throw new Error("出错没有这个title类型")
                }

                organizationApi[api](this.filesData).then(res => {
                    interceptors(() => {
                        this.closeComponent()
                        //通知card组件重新请求数据进行视图更新
                        this.notifyFlush(true)
                    }, {
                        message: res.stateInfo,
                        status: res.state
                    }, true)
                })
            },

            //文件上传 当修改上传文件的时候触发这个方法
            upload(event) {
                let file = event.target.files[0]

                if (!!file) {
                    this.filesData.set("file",  file, file.name)

                    globalUtils.getImageSrc(file).then((blobUrl) => {
                        this.imagePath = blobUrl;
                    });
                } else {
                    console.log('未选择文件')
                }
            },

            //触发父组件的关闭方法关闭弹窗
            closeComponent() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="scss">
        @import "editForm";
</style>
