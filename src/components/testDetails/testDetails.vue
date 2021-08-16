<template>
  <div>
    <Button type="primary" size="small" @click="showDetails(index)">查看</Button>
    <!-- 查看页面 -->
    <Modal v-model="modal1" :title="studentData[index].studentName + '的答题情况'" @on-ok="ok">
      <ul class="testDetails" v-for="(item,key) in testList" :key="key">
        <li>
          <choiceQuestion v-show="item.question.type == 1" :details="item" />
          <fillBlank v-show="item.question.type == 3" :details="item" />
          <TrueOrFalse v-show="item.question.type == 2" :details="item" />
          <subject v-show="item.question.type == 4" :details="item" />
        </li>
      </ul>
    </Modal>
    <!-- 评分页面 -->
    <Button class="detail-btn" type="success" size="small" @click="showMark(index)">评卷</Button>
    <Modal v-model="modal2" :title="studentData[index].studentName + '的简答题情况'"  @on-ok="commitMark(testResult)" @on-cancel="cancel">
      <ul class="testDetails" v-for="(item,key) in markList" :key="key">
        <li>
          <subjectMark @mark-item="getSon" :list="item"  />
        </li>
      </ul>
    </Modal>
  </div>
</template>
<script>
import choiceQuestion from "./objectDetails/choiceQuestion/choiceQuestion";
import fillBlank from "./objectDetails/fillBlank/fillBlank";
import TrueOrFalse from "./objectDetails/TrueOrFalse/TrueOrFalse";
import subject from "./objectDetails/subject/subject";
import subjectMark from "./subjectMark/subjectMark";
import testDetailsApi from "../../share/api/testDetailsApi";
export default {
  name: "testDetails",
  props: ["index", "studentData", "testpaperId"],
  data() {
    return {
      modal1: false,
      modal2: false,
      title: "",
      // 试卷列表
      testList: [],
      // 评分列表
      markList: [],
      // 学生试卷信息
      stu: {
        studentId: this.studentData[this.index].studentId,
        testpaperId: this.testpaperId
      },
      // 老师评卷后的信息，每一道题的结果都在teacherresult里
      testResult: {
        studentId: this.studentData[this.index].studentId,
        testpaperId: this.testpaperId,
        teacherJudge: []
      }
    };
  },
  methods: {
    ok(){
      this.$Message.success("获取成功");
    },
    cancel(){

    },
    // 查看学生试卷详情
    showDetails(index) {
      //判断是否参加考试
      if (this.studentData[index].ifAttend == "否") {
        this.$Message.error("该学生无参加考试！");
      } else {
        this.getTestDetails(this.stu);
        this.modal1 = true;
      }
    },
    // c查看学生简答题评分
    showMark(index){
      //判断是否参加考试
      if (this.studentData[index].ifAttend == "否") {
        this.$Message.error("该学生无参加考试！");
      } else {
        this.getSubject(this.stu);
        this.modal2 = true;
      }
    },
    // 获取考试详细信息
    getTestDetails(data) {
      testDetailsApi.getTestDetails(data).then(res => {
        if (res.state == 1) {
          this.$Message.success(res.stateInfo);
          this.testList = res.data.studentAnswerAnalysis;
        }
      });
    },
    // 获取学生简答题情况
    getSubject(data) {
      testDetailsApi.getSubject(data).then(res => {
        if (res.state == 1) {
          this.$Message.success(res.stateInfo);
          this.markList = res.data.studentAnswerAnalysis;
        }
      });
    },
    //提交评卷情况
    commitMark(data) {
      testDetailsApi.commitMark(data).then(res => {
        if (res.state == 1) {
          this.$Message.success(res.stateInfo);
        }
      });
    },
    // 将子组件返回的每一道题目的值添加到数组中
    getSon(data) {
      this.testResult.teacherJudge.push(data);
    }
  },
  components: {
    choiceQuestion,
    fillBlank,
    TrueOrFalse,
    subject,
    subjectMark
  }
};
</script>


<style lang="scss">
@import "./testDetails.scss";
</style>