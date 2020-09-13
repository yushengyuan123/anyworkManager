<style scoped lang="scss">
  .chapterManager {
    .dataCon {
      margin: 2.5em 1.5em;

      .list {
        margin: 2px 0;
        padding: 0 0.5em;
        border: 1px solid #e9eaec;
        border-radius: 3px;
        background: #f7f7f7;
        overflow: hidden;
        cursor: pointer;
        line-height: 2em;

        .text {
          color: #666;
          font-size: 14px;
          text-align: left;
        }

        .text:hover {
          color: #222;
        }

        .del {
          color: #aaa;
          margin-left: 0.5em;
        }

        .del:hover {
          color: #f40;
        }


      }

      .add {
        margin-top: 1em;
        font-size: 12px;
        background: none;
      }
    }


  }
</style>

<template>
  <div class="chapterManager">
    <div class="dataCon">
      <div class="list" v-for="(chapter, index) in chapterArr" :key="index">
        <span class="text" @click="editClick(chapter)">
          {{chapter.chapterName}}<Icon type="md-create"/>
        </span>
        <Icon class="del" type="md-close" @click="delClick(chapter)"/>
      </div>
      <Button class="add" type="dashed" @click="addClick">+ 添加章节</Button>
    </div>
    <chapterModel :control="myModelControl" @getChapter="getChapter"></chapterModel>
  </div>
</template>

<script>
  import chapterModel from "../../../../components/chapterManager/chapterModel/chapterModel";
  import chapterApi from "../../../../share/api/chapterApi";

  export default {
    name: "chapterManager",
    components: {
      chapterModel
    },
    data() {
      return {
        chapterArr: null,
        addValue: '',
        myModelControl: {
          type: 0, // 0-> 编辑章节名   1-> 新建章节
          ifShow: false, // 是否展示Modal
          chapterId: '', // 章节id
          chapterName: '', // 章节名字
        }
      }
    },
    methods: {
      // 请求全部章节
      getChapter() {
        chapterApi.getChapter().then(res => {
          if (res.state == 1) {
            this.chapterArr = res.data;
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      },
      // 点击添加章节
      addClick() {
        this.myModelControl.type = 1;
        this.myModelControl.ifShow = true;
        this.myModelControl.chapterId = '';
        this.myModelControl.chapterName = '';

      },
      // 点击编辑章节
      editClick(chapter) {
        this.myModelControl.type = 0;
        this.myModelControl.ifShow = true;
        this.myModelControl.chapterId = chapter.chapterId;
        this.myModelControl.chapterName = chapter.chapterName;

      },
      delClick(chapter) {
        this.$Modal.confirm({
          title: '确认删除',
          content: `你确定删除章节<strong>《${chapter.chapterName}》</strong>吗`,
          onOk: () => {
            this.delChapter(chapter);
          },
        });
      },
      // 删除章节
      delChapter(chapter) {
        let send = {
          chapterId: chapter.chapterId
        }
        chapterApi.delChapter(send).then(res=>{
          if (res.state == 1) {
            this.$Message.success('删除成功');
            this.getChapter();
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      },


    },
    mounted() {
      this.getChapter();
    }
  }
</script>
