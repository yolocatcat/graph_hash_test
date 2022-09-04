<template>
  <div>
    <mainHome></mainHome>
  </div>
</template>

<script>
  import mainHome from './components/mainHome.vue'

  export default {
    name: 'App',
    components: {
      mainHome
    },
  }
</script>

<style>
body{
  font-size:100%;
  font-weight:normal;
  font-family: 'Electrolize', Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  overflow: hidden;
}
</style>
