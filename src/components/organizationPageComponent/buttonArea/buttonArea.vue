<template>
    <div class="btn-container">
        <drawer
                :show="showCreateMenu"
        ></drawer>

        <Dropdown style="margin-right: 8rem">
            <a href="javascript:void(0)">
                下拉菜单
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem disabled>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown>
            <a href="javascript:void(0)">
                下拉菜单
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="item in paperList" :key="item.id">{{item.title}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Button type="primary" shape="circle" style="margin-left: 8rem" @click="openCreateMenu">创建组织</Button>
    </div>
</template>

<script>
    import OrganizationApi from "../../../share/api/organizationApi";
    import drawer from "../myOrganization/organizationCard/drawer/drawer";

    export default {
        name: "buttonArea",

        components: {
            drawer: drawer
        },

        data() {
            return {
                //试卷列表数组
                paperList: [],
                showCreateMenu: {showDrawer: false},
            }
        },

        mounted() {
            this.getPaperList()
        },

        methods: {
            //获取试卷列表
            getPaperList() {
                OrganizationApi.getExaminationPaperList().then(res => {
                    // console.log(res.data)
                    // this.dataControl(res.data)
                })
            },

            dataControl(arr) {
                arr.forEach((item, index) => {
                    this.paperList.push({
                        id: index,
                        title: item.testpaperTitle
                    })
                })
            },

            openCreateMenu() {
                this.showCreateMenu.showDrawer = true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../share/cssMixin/cssMixin";
    .btn-container {
        display: flex;
        align-items: center;
        justify-content: left;
        height: 6rem;
    }
</style>
