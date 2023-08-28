<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="201px">
          <teamaside />
        </el-aside>
        <el-main>

          <div class="header">
            <el-form :inlie="true" class="form">
              <el-form-item>
                <el-button type="primary" icon="el-icon-user-solid" @click="open">邀请新成员</el-button>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.username" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit(form)">查询</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="conmmon-tabel">
            <el-table :data="tableData" style="width: 1400px;" border :row-class-name="tableRowClassName" height="1000">
              <el-table-column prop="username" label="昵称" align="center">
              </el-table-column>
              <el-table-column prop="real_name" label="真实姓名" align="center">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" align="center">
              </el-table-column>
              <el-table-column prop="role" label="身份" width="100"
                :filters="[{ text: 'Member', value: 'Member' }, { text: 'Admin', value: 'Admin' }, { text: 'Creator', value: 'Creator' }]"
                :filter-method="filterTag" filter-placement="bottom-end" align="center">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.role === 'Creator' ? 'danger' : (scope.row.role === 'Member' ? 'primary' : 'success')"
                    disable-transitions>{{ scope.row.role }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-descriptions class="margin-top" :column="2" size="mini" border>
              <el-descriptions-item label-class-name="my-label1" content-class-name="my-content1">
                <template slot="label" width:300px>
                  <i class="el-icon-user"></i>
                  成员人数
                </template>
                3
              </el-descriptions-item>
              <el-descriptions-item label-class-name="my-label2" content-class-name="my-content2">
                <template slot="label">
                  <i class="el-icon-user"></i>
                  管理员人数
                </template>
                2
              </el-descriptions-item>
            </el-descriptions>


            <el-dialog title="相关信息" :visible.sync="dialogFormVisible" width="600px">
              <div class="diatable">
                <el-table :model="pin" :data="memberData">
                  <el-table-column label="username" :label-width="formLabelWidth" prop="username">
                    <!-- <el-input v-model="pin.username" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                  <el-table-column label="email" :label-width="formLabelWidth" prop="email">
                    <!-- <el-input v-model="pin.email" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                  <el-table-column label="real_name" :label-width="formLabelWidth" prop="real_name">
                    <!-- <el-input v-model="pin.real_name" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                </el-table>
              </div>
            </el-dialog>

            <el-dialog title="提示" :visible.sync="dVisible" width="30%" :before-close="handleClose">
              <span>将其身份修改为？</span>
              <span class="dialog-footer">
                <el-button type="primary" @click="handleAdmin(Name)">Admin</el-button>
                <el-button type="primary" @click="handleMember(Name)">Member</el-button>
              </span>
            </el-dialog>

          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import teamaside from '../components/teamaside.vue';
import { getAllmember } from '../api/api';
import { addmember } from '../api/api';
import { removememebr } from '../api/api';
import { findmember } from '../api/api';
import { changemember } from '../api/api';

export default {
  /* 不同身份高光不同 */
  methods: {
    open() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已将邀请发送至 ' + value
        });
        console.log(value);
        var tid = localStorage.getItem('teamid')
        const additem = { "team_id": localStorage.getItem("team_id"), "email": value }
        console.log(additem);
        addmember(additem)
        //this.getData(localStorage.getItem('id'))
        10000;
        this.getData(localStorage.getItem("team_id"))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    onSubmit(form) {
      console.log(form)
      findmember(form.username).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.memberData = []
          this.memberData.push(res.data.data)
          //localStorage.getItem('token')
          // console.log(this.memberData)
          // console.log(res.data.status)
          //this.memberData.pop()
          this.dialogFormVisible = true
          //if (this.tableData.length >= 1) {
          //  this.changeData()
          //}
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.role === 'Creator') {
        return 'warning-row';
      } else if (row.role === 'Admin') {
        return 'success-row';
      } else if (row.role === 'Member') {
        return 'background: blue';
      }
      return '';
    },
    handleEdit(index, row) {
      this.dVisible = true
      this.Name = row.username
      console.log(2)
      console.log(this.Name)
    },
    handleAdmin(Name) {
      console.log(1)
      console.log(Name)
      const editem = { "team_id": localStorage.getItem("team_id"), "username": Name, "role": "Admin" }
      changemember(editem).then(res => {

      }, err => {
        console.log(err)
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      this.dVisible = false
    },
    handleMember(Name) {
      console.log(1)
      console.log(Name)
      const editem = { "team_id": localStorage.getItem("team_id"), "username": Name, "role": "Member" }
      changemember(editem).then(res => {

      }, err => {
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      this.dVisible = false
    },
    handleDelete(index, row) {
      const delitem = { "team_id": localStorage.getItem("team_id"), "username": row.username }
      /*       this.$message({
              type: 'danger',
              message: '删除成功'
            }); */
      removememebr(delitem).then(res => {
        if (res.data.status = 200) {
          this.$message({
            type: 'danger',
            message: '删除成功'
          });
        }
      },err=>{
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      //console.log(index, row);
      this.getData(localStorage.getItem("team_id"))
    },
    times() {			//定义了一个times()方法来执行定时查询findDB()
      return setInterval(() => {			//setInterval换个名字就行了
        this.getData(localStorage.getItem("team_id"))
      }, 1000)		//设置时间，这里是1s
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    /* formatter(row, column) {
      return row.address;
    }, */
    filterTag(value, row) {
      return row.role === value;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    getData(id) {
      //查询数据
      console.log(id)
      getAllmember(id).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.data
          //localStorage.getItem('token')
          console.log(this.tableData.length)
          //if (this.tableData.length >= 1) {
          //  this.changeData()
          //}
        }
      },err=>{

      })
    },
  },
  data() {

    return {
      dVisible: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      pin: {

      },
      Name: "",
      tableData: [],
      memberData: [],
      form: {
        username: ''
      }
    }
  },
  components: {
    teamaside
  },
  /*   mounted(){
      get1Data().then((data)=>{
        console.log(data)
      })
    } */
  mounted() {
    console.log(localStorage.getItem("team_id"))
    //this.getData(localStorage.getItem("team_id"))
    this.times()         //实时更新
  }
}
</script>
  
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.userForm {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.common-tabel {}


.my-label1 {
  background: #E1F3D8;
  width: 100px;
}

.my-label2 {
  background: #E1F3D8;
  width: 120px;
}

.diatable {
  height: 60vh;
  overflow: auto;
}
</style>