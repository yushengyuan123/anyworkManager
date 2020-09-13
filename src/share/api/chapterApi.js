import request from "../net/request";

/**
 * @author 树干
 * 添加章节、编辑章节、删除章节
 */
export default class ExerciseApi extends request {
  constructor() {
    super()
  }
  // 请求全部章节
  static getChapter () {
    return this.postMethods('/test/chapter')
  }

  // 添加章节
  static addChapter (data) {
    return this.postMethods('/test/addChapter', data)
  }

  // 编辑章节
  static editChapter (data) {
    return this.postMethods('/test/chapter/update', data)
  }

  // 删除章节
  static delChapter (data) {
    return this.postMethods('/test/deleteChapter', data)
  }

}