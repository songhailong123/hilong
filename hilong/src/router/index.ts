import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import( "../views/Home.vue");
const About = () => import( "../views/Home.vue");
const NotFound = () => import( "../views/NotFound.vue");
const Person = () => import( "../views/Person.vue");
const Detail = () => import( "../views/Detail.vue");
const Login = () => import( "../views/Login.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/person",
    name: "Person",
    component: Person
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: '*',
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
