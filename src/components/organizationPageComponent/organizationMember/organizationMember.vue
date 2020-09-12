<template>
        <div class="member-container">
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
    export default {
        name: "organizationMember",

        props: {
            studentList: {type: Array}
        },

        watch: {
            //监控外界学生数组的变化
            studentList: function () {
                this.getStudentData()
            }
        },

        data() {
            return {
                memberList: []
            }
        },

        methods: {
            //从外界组件传过来的student信息,转化到data中,再进行视图渲染,如果直接用
            //props就会发生报错
            getStudentData() {
                const list = this.studentList
                //推入前先清空一波
                this.memberList.length = 0

                for (let i = 0; i < list.length; i++) {
                    this.memberList.push({
                        key: list[i].userId,
                        name: list[i].userName,
                        studentId: list[i].studentId
                    })
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "organizationMember";
</style>
