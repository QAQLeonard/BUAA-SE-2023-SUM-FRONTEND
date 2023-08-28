<template>
    <div>
        <el-page-header @back="goBack" content="团队" title="返回工作台">
        </el-page-header>
        <ProjectUnit class="unit ListUnit" v-for="(team, index) in teams" :key="index" :name="team.team_name" :jump="Jump" :team_id="team.team_id">
        </ProjectUnit>
        <el-button class="unit ListUnit" @click="Tocreate"> <span class="text" style="font-size: 60px;">+</span> <span class="text"
                style="font-size: 20px; font-weight: 100;">创建新团队</span></el-button>
    </div>
</template>



<script>
import ProjectUnit from '@/components/ProjectUnit.vue';
import { allteam } from '../api/api';
export default {
    data() {
        return {
            teams: []
        }
    },
    methods: {
        getteams(){
            console.log(localStorage.getItem("username"))
            allteam(localStorage.getItem("username")).then(res=>{
                console.log(2)
                this.teams=res.data.data
            })
        },
        goBack() {
            console.log('go back');
            this.$router.push('/workspace')
        },
        Jump() {

            this.$router.push('/control-team')

        },
        Tocreate(){
            this.$router.push('/create')
        }
    },
    components: { ProjectUnit },
    mounted() {
    this.getteams()
    }
}
</script>
<style scoped lang="scss">
.el-page-header {
    height: 60px;
    line-height: 60px;
}

.ListUnit {
    margin-top: 20px;
    margin-left: 40px;
    border-radius: 10px;
}

.text {
    display: block;
}
</style>