<template>
        <div class="member-container" @click.stop="doNothing">
            <div class="member-details-container">
                <div class="member-details-con" v-for="item in memberList" :key="item.key">
                    <img src="../../../assets/images/noimage.png" alt="">
                    <p>{{item.name}}</p>
                    <p>{{item.studentId}}</p>
                </div>
            </div>
        </div>
</template>

<script>
    import GlobalLayer from "../../globalLayer/GlobalLayer";

    export default {
        name: "organizationMember",

        components: {
            GlobalLayer: GlobalLayer
        },

        props: {
            isShow: {type: Object},

            studentList: {type: Array}
        },

        data() {
            return {
                memberList: []
            }
        },

        mounted() {
            this.getStudentData()
        },

        methods: {
            //点击global组件 取消遮罩层
            cancelLayer() {
                this.isShow.show = false
            },

            //从外界组件传过来的student信息,转化到data中,再进行视图渲染,如果直接用
            //props就会发生报错
            getStudentData() {
                const list = this.studentList
                for (let i = 0; i < list.length; i++) {
                    this.memberList.push({
                        key: list[i].userId,
                        name: list[i].userName,
                        studentId: list[i].studentId
                    })
                }
            },

            //一个过渡事件，当用户点击内容框而遮罩层的时候，阻止事件冒泡。避免点击内容框会导致取消弹窗
            doNothing() {
                console.log('do')
            }


        }
    }
</script>

<style scoped lang="scss">
    @import "organizationMember";
</style>
