<!— 这个是点击组件那个card 组件的编辑按钮 然后在屏幕左侧弹出的一个编辑框组件 直接调用iview库-->
<template>
    <Drawer
            :title="componentTitle"
            v-model="isShow.showDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="组织头像" label-position="top">
                        <div class="image-upload-container">
                            <img :src="imagePath">
                            <input class="image-upload" type="file" @change="upload">
                        </div>
                    </FormItem>
                </Col>
            </Row>

            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="组织名称" label-position="top">
                        <Input
                                v-model="formData.organizationName"
                                placeholder="请输入组织名称"
                        />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="组织口令" label-position="top">
                        <Input v-model="formData.token" placeholder="请输入组织口令"/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="组织描述" label-position="top">
                <Input type="textarea" v-model="formData.description" :rows="4" placeholder="请输入组织描述"/>
            </FormItem>
        </Form>

        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="deStoryComponent">取消</Button>
            <Button type="primary" @click="submitConfirm">确定</Button>
        </div>
    </Drawer>
</template>

<script>
    import organizationApi from "../../../share/api/organizationApi";
    import {interceptors} from "../../../share/net/response";
    import * as globalUtils from '../../../share/utils/globalUtils'
    import {mapGetters, mapMutations} from "vuex";

    export default {
        props: {
            show: {type: Object},
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
                isShow: this.show,

                drawTitle: this.title,

                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },

                formData: {
                    organizationName: this.organizationName,
                    token: this.token,
                    description: this.desc,
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

        },

        updated() {
            this.clearData()
        },

        methods: {
            //通过store 修改状态，通知card组件重新请求数据进行视图更新
            ...mapMutations(['notifyFlush']),

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

                console.log(this.filesData.get('file'))

                //如果用户没有选择图片，说明她不修改头像 这时需要手动加入file 否则会被400
                if (!this.filesData.get('file')) {
                    this.filesData.append('file', null)
                }

                //遍历formData，循环添加append
                for (let key in requestKey) {
                    //创建和修改请求的格式做区分
                    if (key === 'token' && this.title == 1) {
                        this.filesData.append(key, this.organizationId)
                        continue
                    }

                    this.filesData.append(key, requestKey[key])
                }

                if (this.title == 0) {
                    organizationApi.createOrganization(this.filesData).then(res => {
                        interceptors(() => {
                            this.isShow.showDrawer = false
                            //通知card组件重新请求数据进行视图更新
                            this.notifyFlush(true)
                        }, {
                            message: res.stateInfo,
                            status: res.state
                        }, true)
                    })
                } else {
                    organizationApi.editOrg(this.filesData).then(res => {
                        interceptors(() => {
                            this.isShow.showDrawer = false
                            //通知card组件重新请求数据进行视图更新
                            this.notifyFlush(true)
                        }, {
                            message: res.stateInfo,
                            status: res.state
                        }, true)
                    })
                }
            },

            //文件上传 当修改上传文件的时候触发这个方法
            upload(event) {
                let file = event.target.files[0]

                if (!!file) {
                    this.filesData.append("file", file, file.name)

                    globalUtils.getImageSrc(file).then((blobUrl) => {
                        this.imagePath = blobUrl;
                    });
                } else {
                    console.log('未选择文件')
                }
            },

            //当创建的时候需要清除一次数据，否则上次创建的数据就会保留
            clearData() {
                //只有当时创建组织的时候才需要清除，修改组织信息就不需要清楚
                //从title判断组建的类型
                if (this.title == 1 || this.isShow.showDrawer) {
                    return
                }

                setTimeout(() => {
                    this.filesData = null

                    for (let key in this.formData) {
                        this.formData[key] = ''
                    }

                    this.imagePath = require('../../../assets/images/noimage.png')
                }, 1000)
            },

            deStoryComponent() {
                this.isShow.showDrawer = false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "drawer";
</style>
