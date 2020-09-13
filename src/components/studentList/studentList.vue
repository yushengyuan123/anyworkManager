<template>
    <div>
        <Button type="primary" @click="getTest">完成情况</Button>
        <Modal
            width="1005"
            fontWeight="700"
            v-model="modal1"
            :title="title"
            @on-ok="ok"
            @on-cancel="cancel">
            <Table :columns="studentMessage" :data="studentData">
                <template slot-scope="{ index }" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                    <Button type="success" size="small" @click="assess(index)">评卷</Button>
                </template>
            </Table>
        </Modal>
    </div>
</template>

<script>

    import studentlistApi from '../../share/api/studentlistApi'
    
    export default {
        name: "studentList",
        data () {
            return {
                title: ' ',
                modal1: false,
                studentData:[],
                studentSend:{
                    organizationId: 28,
                    testpaperId: 13 
                },
                studentMessage: [
                    {
                        title: '学号',
                        key: 'studentNum',
                        width: 150,
                    },
                    {
                        title: '学生姓名',
                        key: 'studentName',
                        width: 100,
                    },
                    {
                        title: '是否评分',
                        key: 'ifCheck',
                        width: 100,
                    },
                    {
                        title: '客观题分数',
                        key: 'object',
                        width: 110,
                    },
                    {
                        title: '主观题分数',
                        key: 'subject',
                        width: 110,
                    },
                    {
                        title: '是否参加考试',
                        key: 'ifAttend',
                        width: 100,
                    },
                    {
                        title: '考试总分',
                        key: 'testpaperScore',
                        width: 100,
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
            }
        },
        methods: {
            getTest(){
                
                studentlistApi.getStudentList(this.studentSend).then(res=>{
                    if(res.state == 1){
                        this.$Message.success(res.stateInfo);
                        this.modal1 = true;
                        //先清空数组
                        this.studentData.length = 0;
                        this.handle(res.data);
                    } else {
                        this.$Message.error(res.stateInfo);
                    }
                })
            },
            //处理请求的结果
            handle(dataSet){
                
                this.title = `${dataSet[0].testpaper.testpaperTitle}(${this.getWhichType(dataSet[0].testpaper.testpaperType)})的完成情况`;
                for(let i = 0; i < dataSet.length; i++){
                    let student = {};
                    student.studentNum = dataSet[i].studentNum;
                    student.studentName = dataSet[i].studentName;
                    student.ifCheck = this.ifTrue(dataSet[i].ifCheck);
                    student.object = dataSet[i].object;
                    student.subject = dataSet[i].subject;
                    student.ifAttend = this.ifTrue(dataSet[i].ifAttend);
                    student.testpaperScore = dataSet[i].testpaper.testpaperScore;
                    this.studentData.push(student); 
                }
            },
            ifTrue(data){
                return data == 0?'否':'是'; 
            },
            //得到对应的试卷类型
            getWhichType(data){
                if(data == '1') return '考试';
                else if(data == '2') return '预习题';
                else if(data == '3') return '课后题';
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            //查看
            show (index) {
                //判断是否参加考试
                if(this.studentData[index].ifAttend == '否'){
                    this.$Message.error('该学生无参加考试！');
                } else {
                    this.$Message.success('获取成功')
                    this.$Modal.info({
                        title: 'User Info',
                        content: `
                            学号： ${this.studentData[index].studentNum}<br>
                            姓名：${this.studentData[index].studentName}<br>
                            是否评分：${this.studentData[index].ifCheck}<br>
                            客观题分数：${this.studentData[index].object}<br>
                            主观题分数：${this.studentData[index].subject}<br>
                            是否参加考试：${this.studentData[index].ifAttend}<br>
                            考试总分：${this.studentData[index].testpaperScore}<br>
                        `
                    })
                }
                
            },
            //评卷
            assess(index) {
                //判断是否参加考试
                if(this.studentData[index].ifAttend == '否'){
                    this.$Message.error(`该学生无参加考试！`);
                } else {
                    this.$Message.info(`第${index+1}个学生有参加考试`)
                }
                // this.studentData.splice(index, 1);
            },
        },
    }


</script>

<style scoped lang="scss">
    .ivu-modal-header-inner {
        font-weight: 700;
    }

</style>
