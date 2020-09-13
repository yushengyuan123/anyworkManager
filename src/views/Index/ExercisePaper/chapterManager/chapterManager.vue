<style scoped lang="scss">
  .chapterManager {
    .dataCon {
      .list {

      }
    }


  }
</style>

<template>
  <div class="chapterManager">
    <div class="dataCon">
      <div class="list" v-for="(data, index) in chapterArr" :key="index">
        {{data.chapterName}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chapterManager",
    data() {
      return {
        chapterArr: null
      }
    },
    methods: {
      getChapter() {
        this.chapterArr = [
          {chapterId: 106, organizationId: 28, chapterName: "指针", userId: 2},
          {chapterId: 108, organizationId: 28, chapterName: "初始C语言", userId: 2},
        ]
      },
    },
    mounted() {
      this.getChapter();
    }
  }
</script>
