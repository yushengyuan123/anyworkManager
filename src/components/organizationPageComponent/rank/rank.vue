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
    export default {
        name: "rank",

        data() {
            return {
                studentList: [
                    {
                        rank: 1,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004982',
                        score: '12.4'
                    },
                    {
                        rank: 2,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004983',
                        score: '12.4'
                    },
                    {
                        rank: 3,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004984',
                        score: '12.4'
                    },
                    {
                        rank: 4,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004985',
                        score: '12.4'
                    },
                    {
                        rank: 5,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004986',
                        score: '12.4'
                    },
                    {
                        rank: 6,
                        imgUrl: '',
                        name: '余圣源',
                        id: '3118004987',
                        score: '12.4'
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "rank";
</style>
