<template>
    <div class="organization-card-container">
        <drawer :show="showEdit"></drawer>

        <div class="header-title-container">
            <div class="image-container">
                <img src="../../../../assets/images/anywork@2x.png" alt="">
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
                <img src="../../../../assets/images_ysy/edit.png" alt="" @click="openEditDrawer">
            </span>
            <span>
                <img src="../../../../assets/images_ysy/delete.png" alt="">
            </span>
            <span class="people-num">人数:{{studentNumber}}</span>
        </div>
    </div>
</template>

<script>
    import drawer from "./drawer/drawer";
    export default {
        name: "organizationCard",

        components: {
            drawer: drawer
        },

        props: {
            organizationName: {type: String},
            teacher: {type: String},
            passKey: {type: String},
            des: {type: String},
            studentNumber: {type: String}
        },

        data() {
            return {
                showEdit: {showDrawer: false},
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
            openEditDrawer() {
                console.log(this.showEdit)
                this.showEdit.showDrawer = true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "organizationCard";

</style>
