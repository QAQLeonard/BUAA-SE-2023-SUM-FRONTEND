<template>
    <div>
        <div class="Team" style="left: 220px;" @click="toTeamList">
            <span>{{ team }}<i class="el-icon-s-custom"></i></span>
        </div>
        <div class="Team" style="left: 840px;" @click="toProjectList">
            <span>{{ project }}<i class="el-icon-data-analysis"></i></span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            team: '团队 ',
            project: '项目 '
        };
    },
    methods: {
        toProjectList()
        {
            this.$router.push('/projectlist')
        },
        toTeamList()
        {
            this.$router.push('/teamlist')
        }
    },
}
</script>
<style lang="scss" scoped>
.Team {
    display: inline-block;
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fefefe), to(#abdafe));
    height: 200px;
    width: 350px;
    margin-left: 50px;
    border-radius: 22px;
    border: none;
    text-align: center;
    font-size: 50px;
    font-weight: 1000;
    padding: 18px;
    cursor: pointer;
    transition: all 0.5s;
    vertical-align: middle;
    margin-top: 20px;
    font-family: SimHei;
    color: #34495e;
    position: absolute;
    top: 220px;


    span {
        cursor: pointer;
        display: block;
        position: relative;
        transition: 0.5s;
        line-height: 200px;
    }

    span::after {
        content: '>';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }
}

.Team:hover span {
    padding-right: 30px;
}

.Team:hover {
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.3);
}

.Team:hover span::after {
    opacity: 1;
    right: 0;
}
</style>