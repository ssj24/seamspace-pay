<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <img src="@/assets/seamspace.png" width="70">
        <p style="display: inline-block; font-size: 40px; font-weight: bold; margin: 0;">
          seamspace
        </p>
      </div>
      <div style="margin-right: 20px;">
        <ul v-if="menu" style="text-align: center; list-style: none; padding: 0; display: flex; justify-content: center; gap: 20px;">
          <li v-for="(item, index) in menu" :key="menu[index].title">
            <NuxtLink :to="item.path" style="text-decoration: none;">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<script>
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
  },
  {
    title: 'estimate',
    path: '/estimate'
  },
  {
    title: 'book',
    path: '/book'
  }
]
</script>