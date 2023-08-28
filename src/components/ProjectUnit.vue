<template>
    <!--  -->
    <div class="unit" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
        <div class="drawer" >
            <span  @click="CallJump">{{ name }}</span>
            <button class="btn" @click="CallTest"><i class="el-icon-delete"></i></button>
            <!-- <button class="btn"><i class="el-icon-star-off"></i></button> -->
            <!-- <button class="btn"><i class="el-icon-user"></i></button> -->
        </div>
    </div>
</template>
<script>
export default {
    props: { name: String, imageUrl: String, Jump: Function,testFunc:Function,projectID:String,team_id:String},
    methods: {
        CallJump() {
            console.log("123")
            console.log(this.team_id)
            localStorage.setItem("team_id",this.team_id)
            this.Jump()
            localStorage.setItem('projectID',this.projectID)
            console.log(localStorage.getItem('projectID'))
        },
        CallTest(){
            this.testFunc()
        }
    }
}
</script>
<style lang="scss" >
.unit {
    background-image: none;
    position: relative;
    width: 300px;
    height: 150px;
    background-color: #EBEEF5;
    display: inline-block;
    float: left;
    margin-left: 40px;
    border-radius: 10px;
    transition: 0.5s;
    overflow: hidden;
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.1);

    .drawer {
        position: absolute;
        width: 100%;
        height: 100px;
        border-radius: 10px 10px 10px 10px;
        background-color: #fff;
        transition: transform 0.3s ease;
        transform: translateY(100%);

        span {
            display: inline-block;
            width: 100px;
            float: left;
            margin-left: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
    }


}

.unit:hover {
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.3);
}

.unit:hover .drawer {
    transform: translateY(70%);
    /* 打开抽屉时移动至可见位置 */
}

.unit:hover .btn {
    display: inline-block;
}

.btn {
    border: none;
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    display: none;
    transition: 0.5s;
    margin-right: 20px;
    margin-top: 10px;
    float: right;
}
</style>
