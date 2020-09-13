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
            getStudentData() {
                //如果array长度为0的情况下 需要手动清除memberList 否则视图是不会更新的 这是vue数组响应式的缺陷
                if (!this.studentList.length) {
                    while (this.memberList.length) {
                        this.memberList.pop()
                    }
                } else {
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
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "organizationMember";
</style>
