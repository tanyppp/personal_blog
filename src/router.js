import Vue from 'vue';
import VueRouter from 'vue-router';

// 组件
import Home from './pages/home/home';
import Notes from './pages/notes/notes';
import About from './pages/about/about';
import MsgBoard from './pages/msg_board/msgBoard';

// Edit
import editEveryDay from './pages/edit_every_day/editEveryDay';
import editArticle from './pages/edit_article/editArticle';
import editNote from './pages/edit_note/editNote';

// article
import articleDetail from './pages/article_detail/articleDetail';

// not found
import NotFound from './pages/not_found/notFound';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      alias: '/home'
    },
    {
      path: '/notes',
      name: 'notes',
      component: Notes
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/msgBoard',
      name: 'msgBoard',
      component: MsgBoard
    },
    {
      path: '/editEveryDay',
      name: 'editEveryDay',
      component: editEveryDay
    },
    {
      path: '/editArticle',
      name: 'editArticle',
      component: editArticle
    },
    {
      path: '/editNote',
      name: 'editNote',
      component: editNote
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
