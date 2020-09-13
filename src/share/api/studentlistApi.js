import request from "../net/request";

export default class studentlistApi extends request{
    
    constructor() {
        super()
    }

    //获取对应试卷学生的完成情况
    static getStudentList(data){
        return this.postMethods('/paper/student/list',data);
    }


}