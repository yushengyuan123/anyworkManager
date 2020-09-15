<style lang="scss">
  .noticeList {
    .noticeTitle {
      padding-left: 10px;
      margin: 10px 0;
      font-size: 20px;
      border-left: 5px solid #e81a37;
    }
  }
  .ivu-table-body, ivu-table-overflowX {
    overflow: hidden;
  }
  
</style>

<template>
  <div class="noticeList">
    <div class="noticeTitle">
        发布记录
    </div>
    <Table border :columns="noticeHeaders" :data="noticeArr">
          <template slot-scope="{ index }" slot="action">
              <Button type="error" size="small" @click="delClick(index)">删除</Button>
          </template>
    </Table>
  </div>
  
</template>

<script>

  export default {
    name: 'noticeList',
    props: {
      noticeArr: Array,
    },
    data() {
      return {
        /* 传入表格头的值 */
        noticeHeaders:[
          {
            title:'主题',
            key:'title'
          },
          {
            title:'内容',
            key:'content'
          },
          {
            title:'时间',
            key:'createTime'
          },
          {
            title:'操作',
            slot: "action",
            width: 200,
            align: "center"
          },
        ]
      }
    },
    methods: {
      // 点击删除一个公告
      delClick(index) {
        this.$Modal.confirm({
          title: '确认删除',
          content: `你确定删除公告 <strong>${this.noticeArr[index].content}</strong> 吗`,
          onOk: () => {
            this.$emit('delNotice', this.noticeArr[index].messageId);
          },
        });

      },
    },
  }
</script>