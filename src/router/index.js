import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CharacterDetailView from '@/views/CharacterDetailView.vue';
import UserTableView from '@/views/UserTableView.vue';

const routes = [
     {
          path: '/',
          name: 'Home',
          component: HomeView
     },
     {
          path: '/about',
          name: 'About',
          component: AboutView
     },
     {
          path: '/character/:id',
          name: 'CharacterDetail',
          component: CharacterDetailView
     },
     {
          path: '/table',
          name: 'UserTable',
          component: UserTableView
     }
];

export const router = createRouter({
     history: createWebHistory(),
     routes
});