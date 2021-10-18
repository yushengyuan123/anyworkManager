<style scoped lang="scss">
.paper-container {
  position: relative;
  width: 94%;
  min-height: 200px;
  margin: 30px auto;
  padding: 15px 10px;
  border: 1px solid #dedede;

  h2 {
    margin: 5px 0;
  }

  .add-paper {
    .paper-button {
      position: relative;
      margin-top: 20px;
      margin-right: 20px;
      background-color: transparent;
      border: 1px solid #57a3f3;
      color: black;

      #file {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }

    .send-button {
      margin-top: 20px;
      padding: 5px 30px;
      background-color: #515a6e;
      border: 1px solid #515a6e;
    }

    .form-item {
      display: inline-block;

      .paper-input {
        width: 260px;
      }
    }

    .button-container {
      margin-top: -20px;
      margin-bottom: 20px;
    }
  }

  .paper-display {
    display: flex;
    justify-content: center;
    flex-flow: wrap column;

    .paper-table {
      width: 100%;
      border: 1px solid #dedede;
    }

    .page {
      align-self: center;
      margin-top: 15px;
    }
  }
}

.paper-question {
  position: relative;
  font-size: 16px;

  h3 {
    color: #57a3f3;
  }

  p {
    font-weight: 600;
  }

  .error-rate {
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    font-weight: 600;
    font-size: 14px;
  }

  .question-option {
    list-style: none;
    margin: 10px 0;

    .question-option-signal {
      display: inline-block;
      padding-left: 9px;
      margin-bottom: 6px;
      margin-right: 30px;
      height: 30px;
      width: 30px;
      line-height: 30px;
      border: 1px solid #2d8cf0;
      color: #2d8cf0;
      border-radius: 50%;
    }
  }
}

.average-score {
  margin-left: 30px;
  color: red;
  font-weight: 600;
  font-size: 14px;
}

.title-icon {
  height: 30px;
  vertical-align: middle;
}
</style>

<template>
  <div class="paper-container">
    <div class="main-container">
      <!--新增试卷板块-->
      <div class="add-paper">
        <h2>新增试卷</h2>
        <div class="button-container">
          <i-button type="primary" class="paper-button" @click="getExcel"
            >下载模板</i-button
          >
          <i-button type="primary" class="paper-button">
            <input
              type="file"
              id="file"
              @change="fileChange($event)"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />选择文件
          </i-button>
        </div>
        <i-form :model="formItem" :label-width="80">
          <div>
            <Form-item label="试卷标题" class="form-item">
              <i-input
                v-model="formItem.title"
                placeholder="请输入"
                class="paper-input"
              ></i-input>
            </Form-item>
            <Form-item label="试卷类型" class="form-item">
              <i-select
                v-model="formItem.paperType"
                placeholder="请选择"
                class="paper-input"
              >
                <i-option
                  v-for="(item, index) in paperTypeList"
                  :key="index"
                  :value="item.value"
                  >{{ item.label }}</i-option
                >
              </i-select>
            </Form-item>
          </div>
          <div>
            <Form-item label="做题时间" class="form-item">
              <Date-picker
                :value.sync="formItem.time"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                placeholder="选择日期"
                class="paper-input"
                @on-change="getTime($event)"
              ></Date-picker>
            </Form-item>
            <Form-item label="练习章节" class="form-item">
              <i-select
                v-model="formItem.paperChapter"
                placeholder="请选择"
                class="paper-input"
              >
                <i-option
                  :value="item.chapterId"
                  v-for="(item, index) in chapterList"
                  :key="index"
                  >{{ item.chapterName }}</i-option
                >
              </i-select>
            </Form-item>
          </div>
        </i-form>
        <div class="button-container">
          <i-button type="primary" class="send-button" @click="sendFile"
            >发布</i-button
          >
        </div>
      </div>
      <!--试卷表格+页码-->
      <div class="paper-display">
        <h2>试卷列表</h2>
        <i-table
          :columns="columns1"
          :data="tableData"
          class="paper-table"
          border=""
          :content="self"
        ></i-table>
        <Page
          :total="pageTotal"
          class="page"
          @on-change="pageChange($event)"
        ></Page>
      </div>
    </div>
    <!--预览试卷模态框-->
    <Modal v-model="showModal" title="预览试卷信息" width="54%">
      <p
        slot="header"
        style="
          color: #57a3f3;
          text-align: left;
          padding: 14px 16px;
          font-size: 30px;
          height: 50px;
        "
      >
        <img
          src="../../../assets/images/preview@1x.png"
          alt="icon"
          class="title-icon"
        />
        {{ currentPaperType }}
      </p>
      <div
        class="paper-question"
        v-for="(item, index1) in questionList1"
        :key="'info1-' + index1"
      >
        <h3>选择题</h3>
        <p>{{ item.content }}</p>
        <ul>
          <li class="question-option">
            <span class="question-option-signal">A</span>
            {{ item.a }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">B</span>
            {{ item.b }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">C</span>
            {{ item.c }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">D</span>
            {{ item.d }}
          </li>
        </ul>
      </div>
      <div
        class="paper-question"
        v-for="(item, index2) in questionList2"
        :key="'info2-' + index2"
      >
        <h3>判断题</h3>
        <p>{{ item.content }}</p>
      </div>
      <div
        class="paper-question"
        v-for="(item, index3) in questionList3"
        :key="'info3-' + index3"
      >
        <h3>填空题</h3>
        <p>{{ item.content }}</p>
      </div>
      <div
        class="paper-question"
        v-for="(item, index4) in questionList4"
        :key="'info4-' + index4"
      >
        <h3>问答题</h3>
        <p>{{ item.content }}</p>
      </div>
    </Modal>
    <!--分析试卷模态框-->
    <Modal v-model="analyseModal" title="分析试卷信息" width="54%">
      <p
        slot="header"
        style="
          color: #57a3f3;
          text-align: left;
          padding: 14px 16px;
          font-size: 30px;
          height: 50px;
        "
      >
        <img
          src="../../../assets/images/preview@1x.png"
          alt="icon"
          class="title-icon"
        />
        {{ currentPaperType }}
        <span class="average-score"
          >平均分：{{ analysePaper.averageScore }}</span
        >
      </p>
      <div
        class="paper-question"
        v-for="(item, index1) in analyseQuestion1"
        :key="'analyse1-' + index1"
      >
        <h3>选择题</h3>
        <p>{{ item.content }}</p>
        <ul>
          <li class="question-option">
            <span class="question-option-signal">A</span>
            {{ item.a }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">B</span>
            {{ item.b }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">C</span>
            {{ item.c }}
          </li>
          <li class="question-option">
            <span class="question-option-signal">D</span>
            {{ item.d }}
          </li>
        </ul>
        解析：正确答案
        <span style="font-weight: 600">{{ item.key }}</span>
        <p class="error-rate">错误率：{{ item.errorRate }}</p>
      </div>
      <div
        class="paper-question"
        v-for="(item, index2) in analyseQuestion2"
        :key="'analyse-' + index2"
      >
        <h3>判断题</h3>
        <p>{{ item.content }}</p>
        <span style="font-weight: 600">{{ item.key }}</span>
        <p class="error-rate">错误率：{{ item.errorRate }}</p>
      </div>
      <div
        class="paper-question"
        v-for="(item, index3) in analyseQuestion3"
        :key="'analyse3-' + index3"
      >
        <h3>填空题</h3>
        <p>{{ item.content }}</p>
        <span style="font-weight: 600">{{ item.key }}</span>
        <p class="error-rate">错误率：{{ item.errorRate }}</p>
      </div>
      <div
        class="paper-question"
        v-for="(item, index4) in analyseQuestion4"
        :key="'analyse4-' + index4"
      >
        <h3>问答题</h3>
        <p>{{ item.content }}</p>
        <span style="font-weight: 600">{{ item.key }}</span>
        <p class="error-rate">错误率：{{ item.errorRate }}</p>
      </div>
    </Modal>
    <!--修改试卷信息模态框-->
    <Modal v-model="reviseModal" title="修改试卷信息" @on-ok="requestRevise">
      <i-form :model="reviseFormItem" :label-width="80">
        <div>
          <Form-item label="试卷标题">
            <i-input
              v-model="reviseFormItem.title"
              placeholder="请输入"
              class="paper-input"
            ></i-input>
          </Form-item>
          <Form-item label="试卷类型">
            <i-select
              v-model="reviseFormItem.paperType"
              placeholder="请选择"
              class="paper-input"
            >
              <i-option
                v-for="(item, index) in paperTypeList"
                :key="index"
                :value="item.value"
                >{{ item.label }}</i-option
              >
            </i-select>
          </Form-item>
        </div>
        <div>
          <Form-item label="做题时间">
            <Date-picker
              :value.sync="reviseFormItem.time"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              placeholder="选择日期"
              class="paper-input"
              @on-change="getReviseTime($event)"
            ></Date-picker>
          </Form-item>
        </div>
      </i-form>
    </Modal>
  </div>
</template>

<script>
import paperApi from "../../../share/api/paperApi";
import { isEmpty } from "./paper.js";
import OrganizationApi from "../../../share/api/organizationApi";
export default {
  name: "paper",
  components: {},

  data() {
    return {
      self: this,
      pageTotal: 100,
      formItem: {
        title: "",
        paperType: "",
        paperChapter: "",
        startTime: "",
        endTime: "",
      },
      reviseFormItem: {
        paperId: 0,
        title: "",
        paperType: "",
        startTime: "",
        endTime: "",
      },
      analysePaper: {},
      currentPaperType: "",
      file: "",
      chapterList: [],
      paperList: [],
      questionList: [],
      questionList1: [],
      questionList2: [],
      questionList3: [],
      questionList4: [],
      analyseQuestions: {},
      analyseQuestion1: [],
      analyseQuestion2: [],
      analyseQuestion3: [],
      analyseQuestion4: [],
      paperTypeList: [
        {
          value: 1,
          label: "考试",
        },
        {
          value: 2,
          label: "预习题",
        },
        {
          value: 3,
          label: "课后复习题",
        },
      ],
      columns1: [
        {
          title: "试卷标题",
          key: "testpaperTitle",
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
          key: "action",
          width: 320,
          align: "center",
          // render(row, column, index) {
          //   return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button>
          //   <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
          // },
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.show(params);
                    },
                  },
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.analyse(params);
                    },
                  },
                },
                "分析"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.revise(params);
                    },
                  },
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      reviseModal: false,
      showModal: false,
      analyseModal: false,
      // 组织id
      organizationId: null,
    };
  },

  mounted() {
    this.getOrganization();
  },

  computed: {},

  watch: {},

  methods: {
    // 请求组织
    getOrganization() {
      OrganizationApi.getMyOrganization().then((res) => {
        if (res.state == 1) {
          this.organizationId = res.data[0].organizationId;
          let data = {
            organizationId: res.data[0].organizationId,
          };
          this.requestPaperList(data);
          this.requestChapter(data)
        } else {
          this.$Message.warning(res.stateInfo);
        }
      });
    },
    requestChapter(data = { organizationId: this.organizationId}) {
      paperApi.getChapter(data).then((res) => {
        // console.log(res, "获取章节");
        this.chapterList = res.data;
      });
    },
    requestPaperList(data = { organizationId: this.organizationId }) {
      paperApi.getPaperList(data).then((res) => {
        // console.log(res, "查看一个组织里面自己发布过的试卷列表");
        this.paperList = res.data;
        this.pageTotal = res.data.length;
        this.tableData = this.paperList.slice(0, 10);
      });
    },
    getExcel() {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = "http://qgailab.com/anywork/excel/template.xlsx";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href); // 释放URL 对象
      document.body.removeChild(link);
    },
    sendFile() {
      if (!this.file) {
        this.$Notice.warning({
          title: "请先选择试卷文件进行上传",
        });
        return false;
      }
      for (let key in this.formItem) {
        if (isEmpty(this.formItem[key])) {
          this.$Notice.warning({
            title: "请再次检查以上资料是否填写完整",
          });
          return false;
        }
      }
      let data = new FormData();
      data.append("testpaperTitle", this.formItem.title);
      data.append("testpaperType", this.formItem.paperType);
      data.append("createTime", this.formItem.startTime);
      data.append("endingTime", this.formItem.endTime);
      data.append("chapterId", this.formItem.paperChapter);
      data.append("file", this.file);
      paperApi.paperPublish(data).then((res) => {
        // console.log(res, "发布试卷");
        this.$Notice.success({
          title: res.stateInfo,
        });
        this.requestPaperList();
      });
    },
    getTime(e) {
      this.formItem.startTime = e[0];
      this.formItem.endTime = e[1];
    },
    getReviseTime(e) {
      this.reviseFormItem.startTime = e[0];
      this.reviseFormItem.endTime = e[1];
    },
    fileChange(e) {
      this.file = e.target.files[0];
    },
    pageChange(e) {
      this.tableData = this.paperList.slice(10 * (e - 1), 10 * e);
    },

    /**
     *
     */
    show(params) {
      if (params.row.testpaperType == 1) {
        this.currentPaperType = "考试";
      } else if (params.row.testpaperType == 2) {
        this.currentPaperType = "课前预习";
      } else if (params.row.testpaperType == 3) {
        this.currentPaperType = "课后复习";
      }
      let that = this;
      let data = {
        testpaperId: params.row.testpaperId,
      };
      paperApi.paperShow(data).then((res) => {
        // console.log(res, "试卷预览");
        this.questionList = res.data.questions;
        this.questionList.forEach(function (item, index) {
          if (item.type == 1) {
            that.questionList1.push(item);
          } else if (item.type == 2) {
            that.questionList2.push(item);
          } else if (item.type == 3) {
            that.questionList3.push(item);
          } else if (item.type == 4) {
            that.questionList4.push(item);
          }
        });
      });
      this.showModal = true;
    },
    analyse(params) {
      let that = this;
      if (params.row.testpaperType == 1) {
        this.currentPaperType = "考试";
      } else if (params.row.testpaperType == 2) {
        this.currentPaperType = "课前预习";
      } else if (params.row.testpaperType == 3) {
        this.currentPaperType = "课后复习";
      }
      this.analyseModal = true;
      let data = {
        organizationId: params.row.organizationId,
        testpaperId: params.row.testpaperId,
      };
      paperApi.paperAnalyse(data).then((res) => {
        // console.log(res, "分析试卷");
        this.analysePaper = res.data;
        this.analyseQuestions = res.data.questions;
        this.analyseQuestions.forEach(function (item, index) {
          if (item.type == 1) {
            that.analyseQuestion1.push(item);
          } else if (item.type == 2) {
            that.analyseQuestion2.push(item);
          } else if (item.type == 3) {
            that.analyseQuestion3.push(item);
          } else if (item.type == 4) {
            that.analyseQuestion4.push(item);
          }
        });
      });
    },
    revise(params) {
      this.reviseModal = true;
      this.reviseFormItem.title = params.row.testpaperTitle;
      this.reviseFormItem.paperId = params.row.testpaperId;
      this.reviseFormItem.paperType = params.row.testpaperType;
    },
    remove(params) {
      if (confirm("确定要删除吗？")) {
        let data = {
          testpaperId: params.row.testpaperId,
        };
        paperApi.paperDelete(data).then((res) => {
          // console.log(res, "删除试卷信息");
          this.requestPaperList();
          if (res.state == 1) {
            this.$Notice.success({
              title: res.stateInfo,
            });
            this.requestPaperList();
          } else {
            this.$Notice.error({
              title: res.stateInfo,
            });
          }
        });
      }
    },
    requestRevise() {
      for (let key in this.reviseFormItem) {
        if (isEmpty(this.reviseFormItem[key])) {
          this.$Notice.warning({
            title: "请再次检查以上资料是否填写完整",
          });
          return false;
        }
      }
      let data = {
        testpaperId: this.reviseFormItem.paperId,
        testpaperTitle: this.reviseFormItem.title,
        testpaperType: this.reviseFormItem.paperType,
        createTime: this.reviseFormItem.startTime,
        endingTime: this.reviseFormItem.endTime,
      };
      paperApi.paperUpdate(data).then((res) => {
        // console.log(res, "修改试卷信息");
        if (res.state == 1) {
          this.$Notice.success({
            title: res.stateInfo,
          });
        } else {
          this.$Notice.error({
            title: res.stateInfo,
          });
        }
      });
    },
  },
};
</script>
