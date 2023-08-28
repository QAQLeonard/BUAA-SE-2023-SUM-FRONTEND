
import service from "../service";
import { getToken } from "../utils/setToken"
//得到团队id相应的全体成员信息
export function getAllmember(id) {
    console.log(id)
    return service({
        method: 'get',
        url: '/v1/tm/get_team_members',
        params: { 'team_id': id },
        headers: {
            'Authorization': `Token ${getToken('token')}`,   //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//查询团队
export function getGroupByID(id) {
    return service({
        method: 'get',
        url: 'v1/tm/get_team/',
        params: {
            "team_id": id
        },
        headers: {
            'Authorization': `Token ${getToken('token')}`,
            //"Authorization":`Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`
        },
    })
}

//创建团队
export function createteam(data) {
    console.log(data)
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'put',
        url: '/v1/tm/create_team',
        data,
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization':`Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`, 
        }
    })
}

//添加成员
export function addmember(data) {
    //data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/v1/tm/add_team_member',
        data,
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//删除成员
export function removememebr(data) {
    //data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/v1/tm/remove_team_member',
        data,
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//寻找成员
export function findmember(data) {
    console.log(data)
    return service({
        method: 'get',
        url: '/v1/tm/get_user',
        params: { 'username': data },
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//修改成员
export function changemember(data) {
    //data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/v1/tm/set_member_role',
        data,
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//获取所在团队
export function allteam(name) {
    console.log('allteamin')
    return service({
        method: 'get',
        url: '/v1/tm/get_teams',
        params: { "username": name },
        headers: {
            'Authorization': `Token ${getToken('token')}`,  //当前token
            //'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

export function login(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/v1/tm/login',
        data
    })
}

export function regist(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'put',
        url: '/v1/tm/register',
        data
    })
}
export function sendCode(email) {
    return service({
        method: 'post',
        url: `/v1/tm/verification`,
        params: {
            email
        }
    })
}

export function createProject(formData, token) {
    console.log(formData)
    return service({
        method: 'post',
        url: `/v1/pe/create_project`,
        data: formData,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
        },

    })
}

export function modifyProject(formData, token) {
    console.log(formData)
    return service({
        method: 'put',
        url: `/v1/pe/update_project`,
        data: formData,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
        },

    })
}

export function getTeamproject(team_id, token) {
    return service({
        method: 'get',
        url: `/v1/pe/get_team_projects`,
        params: {
            team_id,
            tag:'Normal'
        },
        headers: {
            'Authorization': `Token ${token}`,
        },
    })

}

export function getProjectData(project_id, token) {
    return service({
        method: 'get',
        url: '/v1/pe/get_project',
        params: {
            project_id
        },
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
}

//获取一个人全部团队
export function getAllTeamByName(name, token) {
    console.log('allteamin')
    return service({
        method: 'get',
        url: '/v1/tm/get_teams',
        params: { "username": name },
        headers: {
            'Authorization': `Token ${token}`, //当前token
            // 'Authorization': `Token bf1c691009871c8a93e53cc1063bb76a4efc90fe`,
        }
    })
}

//获取项目所有的文档
export function getProjectDocument(project_id) {
    return service({
        method: 'get',
        url: '/v1/pe/get_project_docs',
        params: {
            project_id
        }
    })
}


export function getLimit(doc_id, username) {
    // data = JSON.stringify(data)
    // console.log(data)
    return service({
        method: 'get',
        url: '/api/v1/pe/get_doc_permissions',
        params: {
            doc_id,
            username
        },
    })
}

export function changeLimit(doc_id, editable_by_guests) {
    // data = JSON.stringify(data)
    // console.log(data)
    return service({
        method: 'put',
        url: '/api/v1/pe/update_doc_permissions',
        params: {
            doc_id,
            editable_by_guests
        },
    })
}


export function createDocument(data) {
    // console.log(formData)
    return service({
        method: 'post',
        url: `/api/v1/pe/create_doc`,
        data
    })
}

export function deleteDocument(doc_id) {
    // console.log(formData)
    return service({
        method: 'del',
        url: `/api/v1/pe/delete_doc`,
        params: {
            doc_id
        }

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

