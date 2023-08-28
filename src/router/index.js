import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import control from '../components/control-team.vue'
import MainView from '../views/MainView.vue'
import create from '../components/create-team.vue'
import Teamintroduce from '../components/team-introduce.vue'
import me from '../components/me-introduce.vue'

import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'
import Message from "../views/Message.vue"
import Team from '../views/team(use-copy)'

import WorkSpace from '../views/WorkSpace.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectListcp from '../views/ProjectList-copy.vue'
import TeamList from '../views/TeamList.vue'
import ProjectPage from '../components/ProjectPage.vue'
import Project from '../views/Project.vue'
import Design from '../views/Design.vue'
import Setting from '../views/ProjectSetting.vue'
import Document from '../views/Document.vue'
import DocumentList from '../views/DocumentList.vue'
import Designlist from '../views/Designlist.vue'
import RecycleBin from '../views/RecycleBin.vue'
import TiptapEditor from '../views/Editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/main',
    children: [
      { path: '/main', component: WorkSpace },
      { path: '/message', component: Message },
      { path: '/workspace', component: WorkSpace},
      { path: '/projectlist', component: ProjectList},
      { path: '/teamlist', component: TeamList},
      { path: '/teamspace', component: Team},
      { path: '/control-team', component: control},
      { path:'/team-introduce', component: Teamintroduce},
      { path:'/me-introduce', component:me},
      { path:'/ProjectList-copy',component:ProjectListcp},
      { path:'/create',component:create},
      {
        path: '/edit/:documentid', component: TiptapEditor, props: true
      },
      
      {
        path: '/project', component: ProjectPage,
        children: [
          { path: '/project', component: Project },
          { path: '/project/setting', component: Setting },
          { path: '/project/document', component: Document },
          { path: '/project/documentlist', component: DocumentList },
          { path: '/project/designlist/design', component: Design },
          { path: '/project/designlist', component: Designlist },
        ]
      },
      {
        path: '/projectlist/recyclebin', component: RecycleBin
      },
    ]
    },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/regist',
    component: Regist,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
