<template>
  <Menu class="menu" active-name="1" :open-names="['1']" theme="dark">
    <MenuItem name="1-1" to="/index/organization">
      <Icon type="ios-filing"/>
      组织
    </MenuItem>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-filing"/>
        组卷
      </template>
      <MenuItem name="2-1" to="/index/exercisePaper/chapterManager">章节</MenuItem>
      <MenuItem name="2-2">试卷</MenuItem>
      <MenuItem name="2-3" to="/index/exercisePaper/remarkPaper">评卷</MenuItem>
    </Submenu>
    <MenuItem name="3" to="/index/sendNotice">
      <Icon type="ios-filing"/>
      发通知
    </MenuItem>
  </Menu>
</template>
<script>
  import {Menu, Submenu, MenuGroup, MenuItem, Icon} from 'view-design'

  export default {
    name: 'leftSection',

    components: {
      Menu: Menu,
      Submenu: Submenu,
      MenuGroup: MenuGroup,
      MenuItem: MenuItem,
      Icon: Icon
    }
  }
</script>
