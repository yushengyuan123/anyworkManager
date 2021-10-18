<style scoped lang="scss">
  .sendNotice {
    margin: 40px 15px;
    padding: 10px;

    .addBtn {
      float: right;
      margin-top: 10px;
    }

    .sendNotice-page {
      margin-top: 16px;
      text-align: center;
    }
  }
</style>

<template>
  <div class="sendNotice">
    <Button class="addBtn" @click="addControl.ifShow=true"> 新建公告</Button>
    <addNotice :control="addControl" @addNotice="addNotice"></addNotice>
    <noticeList :noticeArr="noticeArr" @delNotice="delNotice"></noticeList>
    <Page
            class="sendNotice-page"
            :total="total"
            :page-size="pageSize"
            :current="current"
            @on-change="changePage"
            :disabled="pageDisabled"
    />
  </div>
</template>

<script>
  import noticeApi from "../../../share/api/noticeApi";
  import addNotice from "../../../components/sendNotice/addNotice";
  import noticeList from "../../../components/sendNotice/noticeList";

  export default {
    name: 'sendNotice',
    components: {
      addNotice,
      noticeList
    },
    data() {
      return {
        noticeArr: [], // 公告数组
        total: 0, // 全部页数
        current: 1, // 当前页数
        pageSize: 10, // 一页显示数量
        pageDisabled: false, // 请求时禁用换页,
        addControl: { // 用来控制子组件addNotice的prop
          ifShow: false,
          title: '',
          content: ''
        }
      }
    },
    methods: {
      // 换页试卷
      changePage(newPage) {
        this.current = newPage;
        this.getNotice();
      },
      // 获取通知列表
      getNotice() {
        // console.log(this.noticeArr.length);
        let send = {
          pageNum: this.current,
          pageSize: this.pageSize
        }
        // 禁止换页、开始loading
        this.pageDisabled = true;
        this.$Loading.start();
        noticeApi.getNotice(send).then(res => {
          // 解放换页
          this.pageDisabled = false;
          if (res.state == 1) {
            this.$Loading.finish(); // 成功，结束loading
            this.total = res.data.total;
            this.noticeArr = res.data.list;
          } else {
            this.$Loading.error(); // 报错，结束loading
            this.$Message.warning(res.stateInfo)
          }
          // console.log(this.noticeArr.length);
        })
      },
      // 请求添加一个公告
      addNotice() {
        // 获取addNotice里的输入
        let send = {
          title: this.addControl.title,
          content: this.addControl.content
        }
        noticeApi.addNotice(send).then(res => {
          if (res.state == 1) {
            this.$Message.success("添加成功");
            this.getNotice();
            // 重置addNotice里的输入
            this.addControl.title = '';
            this.addControl.content = '';
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      },
      // 请求删除一个公告
      delNotice(messageId) {
        let send = {
          messageId: messageId
        }
        noticeApi.delNotice(send).then(res => {
          if (res.state == 1) {
            this.$Message.success("删除成功");
            this.getNotice();
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      }
    },
    mounted() {
      this.getNotice();
    }
  }
</script>