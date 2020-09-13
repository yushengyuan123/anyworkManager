<template>
  <div>
    <div class="title">填空题</div>
    <div class="content">{{details.question.content}}</div>
    <div class="result">
      <div>
        <div class="standardAnswer">
          <span>标准答案：</span>
          <span>{{details.question.key}}</span>
        </div>
        <div class="studentAnswer">
          <span>学生答案：</span>
          <span>{{details.studentAnswer}}</span>
        </div>
        <div class="explaination">
          <span>解析：</span>
          <div>{{details.question.analysis}}</div>
        </div>
      </div>
      <div class="score">
        <span>得分：</span>
        <span>{{details.socre}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name : 'fillBlank',
    props : [
      'details'
    ]
};
</script>
<style lang="scss">
@import "../objectDetails.scss";
</style>