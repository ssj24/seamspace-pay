<template>
  <div>
    <div style="display: flex; align-items: center;">
      <img src="@/assets/seamspace.png" width="70">
      <p style="display: inline-block; font-size: 40px; font-weight: bold; margin: 0;">
        seamspace
      </p>
    </div>
    <ul v-if="menu">
      <li v-for="(item, index) in menu" :key="menu[index].title">
        <NuxtLink :to="item.path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
    <h2>
      API Routes (GET Methods)
    </h2>
    <ul v-if="apiGets">
      <li v-for="(item, index) in apiGets" :key="apiGets[index].title">
        <a :href="item.path">
          {{ item.title }}
        </a>
      </li>
    </ul>
    <h2>
      API Routes (POST Methods)
    </h2>
    <ul v-if="apiPosts">
      <li v-for="(item, index) in apiPosts" :key="apiPosts[index].title">
        <h3>
          {{ item.title }}
        </h3>
        <p>Path:
          {{ item.path }}
        </p>
      </li>
    </ul>
    <NuxtPage/>
  </div>
</template>

<script>
// Use a static import for server-side compatibility
import '~/assets/css/first.css'

</script>
<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'pay',
    path: '/pay'
  }
]

const apiGets = [
  {
    title: 'API',
    path: '/api'
  },
  {
    title: 'API/Users',
    path: '/api/users'
  }
]

const apiPosts = [
  {
    title: 'API/Users/Create/One',
    path: '/api/users/create/one'
  }
]
</script>