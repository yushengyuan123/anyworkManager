<template>
  <div class="remarkPaper-container">
    <Table border :columns="columns" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">完成情况</Button>
      </template>
    </Table>
    <Page
      :total="totalPaper"
      :page-size="pageSize"
      class="remarkPaper-page"
      @on-change="changePage"
    />
    <studentList :modal1="modal1" @transferM="getSon" ref="student" :passPaperId="passPaperId"></studentList>
  </div>
</template>

<script>
import organizationApi from "../../../../share/api/organizationApi";
import studentList from "../../../../components/studentList/studentList"

export default {
  name: "remarkPaper",

  components:{
    studentList: studentList
  },

  data() {
    return {
      columns: [
        {
          title: "试卷标题",
          slot: "name",
        },
        {
          title: "开始时间",
          key: "createTime",
        },
        {
          title: "结束时间",
          key: "endingTime",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      /* 展示数据 */
      data6: [],
      /* 所有数据 */
      allData: [],

      /* 分页数据 */
      totalPaper: 0,
      paperId: [],
      pageSize: 15,
      nowPage: 0,
      /* 传给studentList组件的值*/
      modal1: false,
      passPaperId:''
    };
  },

  mounted() {
    this.getDataPaper();
  },

  methods: {
    /* 完成情况显示隐藏 */
    show(index) {
      /* 获取当前试卷ID */
      this.passPaperId = this.paperId[index + this.nowPage * this.pageSize];
      this.modal1 = true;
      /*调用studentList组件里的方法*/
      this.$refs.student.getTest(this.passPaperId);
    },
    remove(index) {
      this.data6.splice(index, 1);
    },

    /* 获取试卷数据 */
    getDataPaper() {
      organizationApi
        .getExaminationPaperList({ organizationId: 28 })
        .then((res) => {
          this.dataControl(res.data);
        });
    },
    dataControl(arr) {
      arr.forEach((item, index) => {
        this.allData.push({
          /* testpaperId: testpaperId, */
          name: item.testpaperTitle,
          createTime: item.createTime,
          endingTime: item.endingTime,
        });
        this.paperId.push(item.testpaperId);
      });
      this.totalPaper = arr.length;
      this.data6 = this.allData.slice(0, this.pageSize);
      //alert(this.paperId);
    },

    /* 分页 */
    changePage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data6 = this.allData.slice(_start, _end);
      this.nowPage = index - 1;
    },
    /*获得子组件传来的值*/
    getSon(msg){
      this.modal1 = msg;
    }
  },
};
</script>

<style scoped lang="scss">
.remarkPaper-container {
  width: 95%;
  margin: auto;
  margin-top: 32px;
}
.remarkPaper-page {
  margin-top: 16px;
}
</style>
