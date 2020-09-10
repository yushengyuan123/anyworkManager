<template>
    <div class="btn-container">
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
                <DropdownItem>
                    6.2怎样定义和引用二维数组
                </DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem disabled>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        name: "buttonArea"
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
