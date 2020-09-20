<style scoped lang="scss">
  
  .notice-title {
    margin-bottom: 20px;
  }
  
</style>

<template>
  <div class="noticeList">
    <Modal
            v-model="control.ifShow"
            title="新建公告"
            @on-ok="ok">
      <Input class="notice-title" v-model="control.title" placeholder="公告标题" clearable/>
      <Input v-model="control.content" placeholder="公告内容" clearable/>
    </Modal>
  </div>
</template>

<script>

  export default {
    name: 'addNotice',
    props: {
      control: Object
    },
    data() {
      return {}
    },
    methods: {
      ok() {
        // 触发父组件的addNotice函数，发起请求
        this.$emit('addNotice')
      },
    },
  }
</script>