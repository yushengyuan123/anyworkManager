import request from "../net/request";

export default class testDetailsApi extends request{
    constructor(){
        super();
    }

    // 获取当前学生的试卷答题情况
    static getTestDetails (data){
        return this.postMethods('/paper/student/testDetail',data);
    }
    // 获取学生简答题情况，作评分使用
    static getSubject(data){
        return this.postMethods('/paper/student/subject',data);
    }
    // 提交评分情况
    static commitMark(data){
        return this.postMethods('/paper/teacher/judge',data);
    }
}