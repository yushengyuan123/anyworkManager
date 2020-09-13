<template>
    <div>
        <div class="title">简答题</div>
    <div class="content">{{list.question.content}}({{list.question.socre}}分)</div>
    <div class="result">
      <div>
        <div class="standardAnswer">
          <span>标准答案：</span>
          <span>{{list.question.key}}</span>
        </div>
        <div class="studentAnswer">
          <span>学生答案：</span>
          <span>{{list.studentAnswer}}</span>
        </div>
      </div>
      <div class="score">
        <input type="number" placeholder="得分"  min="0" :max="list.question.socre" v-model="score" @change="limit(list.question.socre),emitToFather()">
      </div>
    </div>
    </div>
</template>
<script>
    export default{
        name : "subjectMark",
        props: [
            'list'
        ],
        data(){
            return{
                questionId : this.list.question.questionId,
                score : this.list.socre
            }
        },
        methods:{
            // 将子组件的值传递给父组件
            emitToFather(){
                let data = {
                    "questionId" : this.questionId,
                    "socre" : this.score
                }
                this.$emit('mark-item',data)
            },
            // 限制分数范围
            limit(max){
                if(this.score > max){
                    this.score = max;
                }else if(this.score < 0){
                    this.score = 0;
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../testDetails.scss";
</style>