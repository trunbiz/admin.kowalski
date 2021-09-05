import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    let infoUser = JSON.parse(localStorage.getItem('infoUser'))
    if (infoUser === null){
      router.push("/login").catch(()=>{});
    } else if(to.name === 'login'){
      router.push("/dashboard").catch(()=>{});
    }
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
