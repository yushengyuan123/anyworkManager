<template>
    <div class="header-container">
        <div @click="logout" style="cursor: pointer">
            注销
        </div>
    </div>
</template>

<script>
    import loginApi from "../../../share/api/loginApi";
    export default {
        name: "rightSectionHeader",

        methods: {
            logout() {
                this.$router.push({name: "login"}, () => {
                    loginApi.logOut().then(({ state, stateInfo }) => {
                        if (state == 1) {
                            this.$Message.success(stateInfo)
                        } else if (state == 0) {
                            this.$Message.error(stateInfo)
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    $height: 2.5rem;
    .header-container {
        height: $height;
        line-height: $height;
        text-align: right;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        background: #fff;
        padding-right: 15px;
        color: #929292
    }
</style>
