<template>
  <div class="remarkPaper-container">
      <Dropdown class="organzation-dropdown" trigger="click" @on-click="selectOrganzation">
        <Button type="primary">
            {{title}}
            <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem  :name="item.organizationName" v-for="(item, index) in organization" :key="index">{{item.organizationName}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Table border :columns="columns" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ index }" slot="action">
        <studentList :index="index" :testData="allData" :organizationId="organizationId"></studentList>
      </template>
    </Table>
    <Page
      :total="totalPaper"
      :page-size="pageSize"
      class="remarkPaper-page"
      @on-change="changePage"
    />
  </div>
</template>

<script>
import organizationApi from "../../../../share/api/organizationApi";
import studentList from "../../../../components/studentList/studentList";

export default {
  name: "remarkPaper",

  components: {
    studentList: studentList
  },

  data() {
    return {
      title: '组织',
      columns: [
        {
          title: "试卷标题",
          slot: "name"
        },
        {
          title: "开始时间",
          key: "createTime"
        },
        {
          title: "结束时间",
          key: "endingTime"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
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

      /* 组织名、id */
      organizationId: 0,
      organization:[]
    };
  },

  mounted() {
    this.getOrganization();
  },

  methods: {
    /* 点击组织对应选项 */
    selectOrganzation(name){
      this.title = name;
      for(let i = 0; i < this.organization.length; i++){
        //找到匹配的organzationId
        if(name == this.organization[i].organizationName){
          this.organizationId = this.organization[i].organizationId;
        }
      }
      // console.log(this.organizationId);
      this.getDataPaper(this.organizationId);
    },

    /* 得到学生对应的组织 */
    getOrganization(){
      organizationApi.getMyOrganization().then(res=>{
        if(res.state == 1){
          this.organization = res.data;
        } else {
          this.$Message.error("组织" + res.stateInfo)
        }
        // console.log(this.organization)
      })
    },

    remove(index) {
      this.data6.splice(index, 1);
    },

    /* 获取试卷数据 */
    getDataPaper(data) {
      // console.log(data);
      this.allData.length = 0;
      organizationApi
        .getExaminationPaperList({ organizationId: data })
        .then(res => {
          if(res.state == 1){
            // console.log(res.data);
            this.$Message.success(res.stateInfo)
            this.dataControl(res.data);
          } else {
            this.$Message.error(res.stateInfo)
          }
          
        });
    },

    /* 处理获取的试卷数据*/
    dataControl(arr) {
      arr.forEach((item, index) => {
        this.allData.push({
          name: item.testpaperTitle,
          createTime: item.createTime,
          endingTime: item.endingTime,
          testpaperId : item.testpaperId
        });
        this.paperId.push(item.testpaperId);
      });
      this.totalPaper = arr.length;// 试卷总数
      this.data6 = this.allData.slice(0, this.pageSize);// 显示当前页面
    },

    /* 分页 */
    changePage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data6 = this.allData.slice(_start, _end);
      this.nowPage = index - 1;
    }
  }
};
</script>

<style scoped lang="scss">
.remarkPaper-container {
  width: 95%;
  margin: auto;
  margin-top: 32px;

  .organzation-dropdown{
    margin-bottom: 15px;
  }

  .remarkPaper-page {
    margin-top: 16px;
    text-align: center;
  }
}

</style>
