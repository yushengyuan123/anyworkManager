<!— 这个是点击组件那个card 组件的编辑按钮 然后在屏幕左侧弹出的一个编辑框组件 直接调用iview库-->
<template>
    <Drawer
            title="修改组织"
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
                        <Input v-model="formData.organizationName" placeholder="请输入组织名称"/>
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
            <Button style="margin-right: 8px" @click="isShow.showDrawer = false">取消</Button>
            <Button type="primary" @click="submitConfirm">确定</Button>
        </div>
    </Drawer>
</template>

<script>
    import {formatDate} from "../../../../../share/utils/globalUtils";
    import organizationApi from "../../../../../share/api/organizationApi";
    import {interceptors, interceptorsRes} from "../../../../../share/net/response";

    export default {
        props: {
            show: {type: Object},
            //组件复用传值，如果这个值为true，
            isCreate: {type: Object},
            //头像url
            imageUrl: {type: String, default: ''},
            //标题，为什么会有这个字段原因在于，这个组件是被复用的，创建和编辑都是用这个组件
            title: {type: String}
        },
        data() {
            return {
                isShow: this.show,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    organizationName: '',
                    token: '',
                    description: ''
                },
                filesData: null,
                imagePath: this.imageUrl || ''
            }
        },

        methods: {
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

            submitData() {
                const requestKey = this.formData

                //遍历formData，循环添加append
                for (let key in requestKey) {
                    this.filesData.append(key, requestKey[key])
                }

                organizationApi.createOrganization(this.filesData).then(res => {
                    interceptors(() => {
                        this.isShow.showDrawer = false
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
                    this.filesData = new window.FormData()
                    this.filesData.append("file", file, file.name)
                } else {
                    console.log('未选择文件')
                }
            }
        }


    }
</script>

<style scoped lang="scss">
    @import "drawer";
</style>
