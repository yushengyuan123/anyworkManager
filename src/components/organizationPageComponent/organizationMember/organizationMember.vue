<template>
    <GlobalLayer>
        <div class="member-container">
            <div class="my-organization-title">组织成员</div>
            <div class="member-details-container">
                <div class="member-details-con" v-for="item in memberList" :key="item.key">
                    <img src="../../../assets/images/noimage.png" alt="">
                    <p>{{item.name}}</p>
                    <p>{{item.studentId}}</p>
                </div>
            </div>
        </div>
    </GlobalLayer>
</template>

<script>
    import GlobalLayer from "../../globalLayer/GlobalLayer";

    export default {
        name: "organizationMember",

        components: {
            GlobalLayer: GlobalLayer
        },

        data() {
            return {
                memberList: []
            }
        },

        mounted() {
            for (let i = 0; i < 10; i++) {
                this.memberList.push({
                    key: i,
                    name: '小余',
                    studentId: '31180049982'
                })
            }
        }


    }
</script>

<style scoped lang="scss">
    @import "organizationMember";
</style>
