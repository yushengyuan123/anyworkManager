<!— 这个是点击组件那个card 组件的编辑按钮 然后在屏幕左侧弹出的一个编辑框组件 直接调用iview库-->
<template>
    <Drawer
            title="修改组织(组织名不能改)"
            v-model="isShow.showDrawer"
            width="720"
            :mask-closable="false"
            :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="组织头像" label-position="top">
                        <div class="image-upload"></div>
                    </FormItem>
                </Col>
            </Row>

            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="组织名称" label-position="top">
                        <Input v-model="formData.name" placeholder="请输入组织口号" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="组织口令" label-position="top">
                        <Input v-model="formData.name" placeholder="请输入组织口令" />
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="组织描述" label-position="top">
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="请输入组织描述" />
            </FormItem>
        </Form>

        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="isShow.showDrawer = false">取消</Button>
            <Button type="primary" @click="isShow.showDrawer = false">确定</Button>
        </div>
    </Drawer>
</template>

<script>
    export default {
        props: {
            show: {
                type: Object
            }
        },
        data () {
            return {
                isShow: this.show,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    name: '',
                    url: '',
                    owner: '',
                    type: '',
                    approver: '',
                    date: '',
                    desc: ''
                },
            }
        },


    }
</script>
<style scoped lang="scss">
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }

    .image-upload {
        $size: 100px;
        display: inline-block;
        width: $size;
        height: $size;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
</style>
