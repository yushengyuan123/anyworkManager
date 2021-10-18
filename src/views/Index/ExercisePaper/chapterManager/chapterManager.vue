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

.select-organization {
  padding: 20px;
}
</style>

<template>
  <div class="chapterManager">
    <!-- <div class="select-organization">
      <Select
        v-model="organization_selected"
        style="width: 200px"
        @on-change="changeOrganization"
        placeholder="请选择组织"
      >
        <Option
          v-for="item in organizations"
          :value="item.organizationId"
          :key="item.organizationName"
          >{{ item.organizationName }}</Option
        >
      </Select>
    </div> -->
    <div class="dataCon">
      <div class="list" v-for="(chapter, index) in chapterArr" :key="index">
        <span class="text" @click="editClick(chapter)">
          {{ chapter.chapterName }}<Icon type="md-create" />
        </span>
        <Icon class="del" type="md-close" @click="delClick(chapter)" />
      </div>
      <Button class="add" type="dashed" @click="addClick">+ 添加章节</Button>
    </div>
    <chapterModel
      :control="myModelControl"
      @getChapter="getChapter"
    ></chapterModel>
  </div>
</template>

<script>
import chapterModel from "../../../../components/chapterManager/chapterModel/chapterModel";
import chapterApi from "../../../../share/api/chapterApi";
import paperApi from "../../../../share/api/paperApi";
import OrganizationApi from "../../../../share/api/organizationApi";
export default {
  name: "chapterManager",
  components: {
    chapterModel,
  },
  data() {
    return {
      chapterArr: null,
      addValue: "",
      myModelControl: {
        // 用来控制子组件chapterModel的prop
        type: 0, // 0-> 编辑章节名   1-> 新建章节
        ifShow: false, // 是否展示Modal
        chapterId: "", // 章节id
        chapterName: "", // 章节名字
      },
      organizations: [],
      organization_selected: null,
    };
  },
  methods: {
    // 请求组织
    getOrganization() {
      OrganizationApi.getMyOrganization().then((res) => {
        if (res.state == 1) {
          this.organizations = res.data;
          this.organization_selected = this.organizations[0].organizationId;
          let data = {
            organizationId: this.organization_selected,
          };
          this.getChapter(data);
        } else {
          this.$Message.warning(res.stateInfo);
        }
      });
    },
    // 修改组织
    // changeOrganization(newOgn) {
    //   this.organization_selected = newOgn;
    //   let data = {
    //     organizationId: this.organization_selected,
    //   };
    //   this.getChapter(data);
    // },

    // 请求全部章节
    getChapter(data = { organizationId: this.organization_selected }) {
      // let data = {
      //   organizationId: this.$store.state,
      // };
      paperApi.getChapter(data).then((res) => {
        if (res.state == 1) {
          this.chapterArr = res.data;
        } else {
          this.$Message.warning(res.stateInfo);
        }
      });
    },
    // 点击添加章节
    addClick() {
      // 重置子组件chapterModel的值
      this.myModelControl.type = 1;
      this.myModelControl.ifShow = true;
      this.myModelControl.chapterId = "";
      this.myModelControl.chapterName = "";
    },
    // 点击编辑章节
    editClick(chapter) {
      // 重置子组件chapterModel的值
      this.myModelControl.type = 0;
      this.myModelControl.ifShow = true;
      this.myModelControl.chapterId = chapter.chapterId;
      this.myModelControl.chapterName = chapter.chapterName;
    },
    // 点击删除章节
    delClick(chapter) {
      this.$Modal.confirm({
        title: "确认删除",
        content: `你确定删除章节<strong>《${chapter.chapterName}》</strong>吗`,
        onOk: () => {
          // 请求删除章节
          this.delChapter(chapter);
        },
      });
    },
    // 删除章节
    delChapter(chapter) {
      let send = {
        chapterId: chapter.chapterId,
      };
      chapterApi.delChapter(send).then((res) => {
        if (res.state == 1) {
          this.$Message.success("删除成功");
          let data = {
            organizationId: this.organization_selected,
          };
          this.getChapter(data);
        } else {
          this.$Message.warning(res.stateInfo);
        }
      });
    },
  },
  mounted() {
    this.getOrganization();
  },
};
</script>
