<style scoped lang="scss">

</style>

<template>
  <div class="noticeList">
    <div class="title">

    </div>
    <div class="noticeCon">
      <div class="list" v-for="(notice, index) in noticeArr" :key="index">
        {{notice.content}}
        <Button @click="delClick(notice)">删除</Button>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'noticeList',
    props: {
      noticeArr: Array
    },
    data() {
      return {}
    },
    methods: {
      // 点击删除一个公告
      delClick(notice) {
        this.$Modal.confirm({
          title: '确认删除',
          content: `你确定删除公告<strong>${notice.content}</strong>吗`,
          onOk: () => {
            this.$emit('delNotice', notice.messageId);
          },
        });

      },
    },
  }
</script>