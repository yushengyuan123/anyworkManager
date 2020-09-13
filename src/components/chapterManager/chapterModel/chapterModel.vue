<style scoped lang="scss">

</style>

<template>
  <div class="myModel">
    <Modal
            v-model="control.ifShow"
            :title="title"
            @on-ok="ok">
      <Input v-model="control.chapterName" placeholder="章节名" clearable/>
    </Modal>
  </div>
</template>

<script>
  import chapterApi from "../../../share/api/chapterApi";

  export default {
    name: 'chapterModel',
    props: {
      control: Object
    },
    computed: {
      title: function () {
        if (this.control.type == 0) {
          return '编辑章节名'
        } else {
          return '添加章节'
        }
      },

    },
    methods: {
      ok() {
        if (this.control.type == 0) {
          this.editChapter();
        } else {
          this.addChapter();
        }
      },
      // 请求添加章节
      addChapter() {
        let send = {
          "chapterName": this.control.chapterName
        }
        chapterApi.addChapter(send).then(res => {
          if (res.state == 1) {
            this.$Message.success('添加成功');
            this.$emit('getChapter')
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      },
      // 请求编辑章节
      editChapter() {
        let send = {
          "chapterId": this.control.chapterId,
          "chapterName": this.control.chapterName
        }
        chapterApi.editChapter(send).then(res => {
          if (res.state == 1) {
            this.$Message.success('修改成功');
            this.$emit('getChapter')
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      },

    },
    mounted() {
    }
  }
</script>