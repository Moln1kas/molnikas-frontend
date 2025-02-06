import {createRouter, createWebHistory} from 'vue-router';

import Desktop from './pages/Desktop.vue';
// import Admin from './pages/Admin.vue';
// import Dashboard from './pages/Dashboard.vue';
import NotFound from './pages/NotFound.vue';
// import Config from '../config.json';
// import Axios from 'axios';

const routes = [
    {path: '', component: Desktop},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
    // {path: '/admin', redirect: '/admin/dashboard', children: [
    //     {path: 'dashboard', component: Dashboard},
    //     {path: 'login', component: Admin}
    // ]},
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

// router.beforeEach((to, _from, next) => {
//     if(to.path != '/admin/dashboard') {
//         next();
//         return;
//     }

//     const token = localStorage.getItem('token');
//     if(!token) {
//         next('/admin/login');
//         return;
//     }
    
//     Axios.get(`${Config.apiAddr}/api/admin/auth`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(() => {
//         return next();
//     })
//     .catch(() => {
//         return next('/admin/login');
//     })
    
// });

export default router;