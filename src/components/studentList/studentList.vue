<template>
  <div>
    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">完成情况</Button>
    <Modal
      width="1005"
      fontWeight="700"
      v-model="modal1"
      class="student-list"
      :title="title"
      @on-ok="cancel"
      @on-cancel="cancel"
    >
      <Table :columns="studentMessage" :data="studentData">
        <template slot-scope="{ index }" slot="action">
          <!-- <Button type="info" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
          <Button type="success" size="small" @click="assess(index)">评卷</Button>-->
          <testDetails
            :index="index"
            :studentData="studentData"
            :testpaperId="studentSend.testpaperId"
          />
        </template>
      </Table>
    </Modal>
  </div>
</template>

<script>
import studentlistApi from "../../share/api/studentlistApi";
import testDetails from "../testDetails/testDetails";

export default {
  name: "studentList",
  props: ['index',"testData","organizationId"],
  data() {
    return {
      title: " ",
      modal1: false,
      studentData: [],
      studentSend: {
        organizationId: 0,
        testpaperId: this.testData[this.index].testpaperId
      },
      studentMessage: [
        {
          title: "学号",
          key: "studentNum",
          width: 150
        },
        {
          title: "学生姓名",
          key: "studentName",
          width: 100
        },
        {
          title: "是否评分",
          key: "ifCheck",
          width: 100
        },
        {
          title: "客观题分数",
          key: "object",
          width: 110
        },
        {
          title: "主观题分数",
          key: "subject",
          width: 110
        },
        {
          title: "是否参加考试",
          key: "ifAttend",
          width: 100
        },
        {
          title: "考试总分",
          key: "testpaperScore",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ]
    };
  },
  components: {
    testDetails
  },
  methods: {
    cancel: function() {
      this.modal1 = false;
    },
    // 获取试卷详细信息
    getTest(msg) {
      this.studentSend.testpaperId = msg;
      this.studentSend.organizationId = this.organizationId;
      this.title = " ";
      /* 先清空数组 */
      this.studentData.length = 0;
      studentlistApi.getStudentList(this.studentSend).then(res => {
        if (res.state == 1) {
          this.$Message.success(res.stateInfo);
          // this.modal1 = true;
          this.handle(res.data);
        } else {
          this.$Message.error(res.stateInfo);
        }
      });
    },
    //处理请求的结果
    handle(dataSet) {
      if (!dataSet[0].testpaper) {
        this.title = " ";
      } else {
        this.title = `${
          dataSet[0].testpaper.testpaperTitle
        }(${this.getWhichType(dataSet[0].testpaper.testpaperType)})的完成情况`;
      }
      for (let i = 0; i < dataSet.length; i++) {
        /* 学生试卷信息 */
        let student = {};
        student.studentId = dataSet[i].studentId; // 学生id 
        student.studentNum = dataSet[i].studentNum; //学号
        student.studentName = dataSet[i].studentName; //姓名
        student.ifCheck = this.ifTrue(dataSet[i].ifCheck);  //是否评分
        student.object = dataSet[i].object;  //客观题
        student.subject = dataSet[i].subject;  //主观题
        student.ifAttend = this.ifTrue(dataSet[i].ifAttend);  //是否参加考试
        student.testpaperScore = dataSet[i].testpaper.testpaperScore;  //试卷总分
        this.studentData.push(student);
      }
    },
    ifTrue(data) {
      return data == 0 ? "否" : "是";
    },
    //得到对应的试卷类型
    getWhichType(data) {
      if (data == "1") return "考试";
      else if (data == "2") return "预习题";
      else if (data == "3") return "课后题";
    },
    /* 完成情况显示隐藏 */
    show(index) {
      /* 面板显示 */
      this.modal1 = true;
      /*根据试卷id获得对应的数据*/
      this.getTest(this.studentSend.testpaperId);
    },
    //评卷
    // assess(index) {
    //   //判断是否参加考试
    //   if (this.studentData[index].ifAttend == "否") {
    //     this.$Message.error(`该学生无参加考试！`);
    //   } else {
    //     this.$Message.info(`第${index + 1}个学生有参加考试`);
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">

</style>
