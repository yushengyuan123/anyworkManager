import request from "../net/request";

/**
 * @author 小余
 * 和组织有关的api都在这个类里面
 */
export default class OrganizationApi extends request {
    constructor() {
        super()
    }

    //获取学生组织
    static getMyOrganization (data, param = '') {
         return this.postMethods('/organization/myOrganization/' + param , data)
    }

    //获取某个组织学生的成绩排名
    static getMemberList(data) {
        return this.postMethods('/leaderboard/teacher/show', data)
    }

    //获取所有的试卷
    static getExaminationPaperList() {
        return this.postMethods('/paper/28/list')
    }

    //获取组织的学生名单
    static getOrganizationStudent(data) {
        return this.postMethods('/organization/student', data)
    }

    //删除某一个组织,{organizationId: 37}
    static deleteOrganization(data) {
        return this.postMethods('/organization/delete', data)
    }

    static createOrganization(data) {
        return this.formDateMethods('/organization/create', data)
    }
}
