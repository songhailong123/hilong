import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import( "../views/Home.vue");
const Edit = () => import( "../views/Edit.vue");
const NotFound = () => import( "../views/NotFound.vue");
const Person = () => import( "../views/Person.vue");
const Detail = () => import( "../views/Detail.vue");
const Login = () => import( "../views/Login.vue");
const Add = () => import( "../views/Add.vue");
const Analysis = () => import( "../views/Analysis.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit
  },
  {
    path: "/add",
    name: "Add",
    component: Add
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
    path: "/analysis",
    name: "Analysis",
    component: Analysis
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
