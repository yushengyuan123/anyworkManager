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
      <div class="list" v-for="(data, index) in chapterArr" :key="index">
        <span class="text">
          {{data.chapterName}}<Icon type="md-create"/>
        </span>
        <Icon class="del" type="md-close"/>
      </div>
      <Button class="add" type="dashed" @click="add">+ 添加章节</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chapterManager",
    data() {
      return {
        chapterArr: null,
        addValue: ''
      }
    },
    methods: {
      getChapter() {
        this.chapterArr = [
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
        ]
      },
      add() {
        this.$Modal.confirm({
          title: '添加章节',
          render: (h) => {
            return h('Input', {
              props: {
                value: this.addValue,
                autofocus: true,
                placeholder: '请输入你想添加的章节..'
              },
              on: {
                input: vl => {
                  this.addValue = vl;
                }
              }
            })
          },
          onOk: () => {
            console.log(this.addValue);
            this.addValue = '';
          }
        })
      },
      del() {
      },
      edit() {
      },

    },
    mounted() {
      this.getChapter();
    }
  }
</script>
