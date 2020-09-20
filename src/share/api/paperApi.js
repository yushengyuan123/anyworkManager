import request from "../net/request";

/**
 * @author 魏桂佳
 * 组卷->试卷
 * 
 */
export default class paperApi extends request {
  constructor() {
    super()
  }
  // 试卷发布form-data
  static paperPublish (data) {
    return this.formDateMethods('/paper/publish', data)
  }

  // 更新试卷
  static paperUpdate (data) {
    return this.postMethods('/paper/update', data)
  }

  // 删除已发布的试卷
  static paperDelete (data) {
    return this.postMethods('/paper/delete', data)
  }

  // 查看试卷内容（预览）
  static paperShow (data) {
    return this.postMethods('/paper/show', data)
  }

  // 试卷分析
  static paperAnalyse (data) {
    return this.postMethods('/paper/analyse', data)
  }

  // 查看一个组织里面自己发布过的试卷列表
  static getPaperList (data) {
    return this.postMethods('/paper/list', data)
  }

  // 获取章节
  static getChapter (data) {
    return this.postMethods('/test/chapter', data)
  }

  // // 具体查看某学生完成过的某套试题
  // static getPaperList (data) {
  //   return this.postMethods('/student/testDetail', data)
  // }

  // 下载模板
  static getExcel (data) {
    return this.formDataDownload('/excel/template.xlsx', data)
  }

}