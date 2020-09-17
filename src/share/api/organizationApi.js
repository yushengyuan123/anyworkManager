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
    static getMyOrganization(data) {
        return this.postMethods('/organization/myOrganization', data)
    }

    //获取某个组织学生的成绩排名
    static getMemberList(data, param = '') {
        return this.postMethods('/leaderboard/teacher/show/' + param, data)
    }

    //获取所有的试卷
    static getExaminationPaperList() {
        return this.postMethods('/paper/list')
    }

    //获取组织的学生名单
    static getOrganizationStudent(data) {
        return this.postMethods('/organization/student', data)
    }

    //删除某一个组织,{organizationId: 37}
    static deleteOrganization(data) {
        return this.postMethods('/organization/delete', data)
    }

    //创建组织
    static createOrganization(data) {
        return this.formDateMethods('/organization/create', data)
    }

    //修改组织
    static editOrg(data) {
        return this.formDateMethods('/organization/alter', data)
    }
}
