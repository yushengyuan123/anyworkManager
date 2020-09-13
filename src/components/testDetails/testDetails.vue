<template>
  <div>
    <Button type="primary" @click="modal1 = true,getTestDetails(stu)">查看</Button>
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
      <ul class="testDetails" v-for="(item,key) in testList" :key="key">
        <li>
          <choiceQuestion v-show="item.question.type == 1" :details="item" />
          <fillBlank v-show="item.question.type == 3" :details="item" />
          <TrueOrFalse v-show="item.question.type == 2" :details="item" />
          <subject v-show="item.question.type == 4" :details="item" />
        </li>
      </ul>
    </Modal>

    <Button type="success" @click="modal2 = true,getSubject(stu)">评卷</Button>
    <Modal v-model="modal2" title="答题情况" @on-ok="commitMark(testResult)" @on-cancel="cancel">
      <ul class="testDetails" v-for="(item,key) in markList" :key="key">
        <li>
          <subjectMark :list="item" @mark-item="pushToRes" />
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
  props: [],
  data() {
    return {
      modal1: false,
      modal2: false,
      title: "",
      testList: [],
      markList: [],
      stu: {
        studentId: 1965,
        testpaperId: 14
      },
      testResult: {
        studentId: 1965,
        testpaperId: 14,
        teacherJudge: []
      }
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
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
    pushToRes(data) {
      this.testResult.teacherJudge.push(data)
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