<template>
    <div class="rank-container">
        <div class="my-organization-title">排行榜</div>
        <div style="padding-bottom: 2rem">
            <div class="row-container" v-for="item in studentList" :key="item.id">
                <div class="rank-number">
                    <span v-if="item.rank > 3">No.{{item.rank}}</span>
                    <img :src="require(`../../../assets/images/reward${item.rank}.png`)" alt="" v-else>
                </div>
                <div class="icon">
                    <img src="../../../assets/images/noimage.png" alt="">
                </div>
                <div class="name">{{item.name}}</div>
                <div class="studentId">{{item.id}}</div>
                <div class="score">{{item.score}}分</div>
            </div>
        </div>
    </div>
</template>

<script>
    import organizationApi from "../../../share/api/organizationApi";

    export default {
        name: "rank",

        props: {
            rank: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        watch: {
            ///观测外部rank的变化，如果变化马上进行视图更新，如果不主动触发，视图是不会更新
            'rank': function () {
                this.renderData(this.rank)
            }
        },

        data() {
            return {
                studentList: []
            }
        },

        methods: {
            renderData(arr) {
                //渲染前先清空studentList
                this.studentList.length = 0

                arr.forEach((item, index) => {
                    this.studentList.push({
                        rank: index + 1,
                        imgUrl: item.imagePath,
                        name: item.username,
                        id: item.studentId,
                        score: item.score
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "rank";
</style>
