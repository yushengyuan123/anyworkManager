<template>
  <div>
    <div class="title">选择题</div>
    <div class="content">{{details.question.content}}</div>
    <ul class="choices">
      <li>
        <span>A</span>
        <span>{{details.question.a}}</span>
      </li>
      <li>
        <span>B</span>
        <span>{{details.question.b}}</span>
      </li>
      <li>
        <span>C</span>
        <span>{{details.question.c}}</span>
      </li>
      <li>
        <span>D</span>
        <span>{{details.question.d}}</span>
      </li>
    </ul>
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
    name :'choiceQuestion',
    props : [
      'details'
    ]
};
</script>
<style lang="scss">
@import "../objectDetails.scss";
</style>