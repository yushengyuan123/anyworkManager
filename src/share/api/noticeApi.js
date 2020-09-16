import request from "../net/request";

/**
 * @author 树干
 * 请求通知、添加通知、删除通知
 */
export default class ExerciseApi extends request {
  constructor() {
    super()
  }
  // 请求全部通知
  static getNotice (data) {
    return this.postMethods('/message/list', data)
  }

  // 添加通知
  static addNotice (data) {
    return this.postMethods('/message/publish', data)
  }

  // 删除通知
  static delNotice (data) {
    return this.postMethods('/message/delete', data)
  }

}