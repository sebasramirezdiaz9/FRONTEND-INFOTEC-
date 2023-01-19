<template>
  <div id="app">
    <GalleryApp msg="Gallery App"/>
  </div>
</template>

<script>
import GalleryApp from './components/GalleryApp.vue'

export default {
  name: 'App',
  components: {
    GalleryApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
