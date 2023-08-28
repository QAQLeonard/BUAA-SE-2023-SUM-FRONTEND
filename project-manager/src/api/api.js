import http from '../utils/request'
import service from "../service";

//请求数据
export const get1Data = (params) => {
    return http.get('/get_team_members', params)
}

//得到团队id相应的全体成员信息
export function getAllmember(id) {
    return service({
        method: 'get',
        url: `/get_team_members/${id}`,
        id
    })
}

//创建团队
export function createteam(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'put',
        url: '/create-team',
        data
    })
}

//添加成员
export function addmember(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/add_team_member',
        data
    })
}

//删除成员
export function removememebr(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/remove_team_member',
        data
    })
}

//修改成员
export function changemember(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/set_member_role',
        data
    })
}

//登录 
export function login(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/login',
        data,
    })
}

//查询用户所在群聊
export function getGroupByUser(username) {
    return service({
        method: 'get',
        url: '/v1/tm/get_groups',
        params: {
            "username": username
        },
        headers: {
            'Authorization': `Token ${token}`, //当前token
            // 'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//获取群聊消息
export function getMessageList(group_id) {
    return service({
        method: 'get',
        url: '/v1/tm/get_messages',
        params: {
            "group_id": group_id
        },
        headers: {
            'Authorization': `Token ${token}`, //当前token
            // 'Authorization': `Token e0c1d86cdf2ecf302a8390a39a9988d1e2a88eac`,
        }
    })
}

