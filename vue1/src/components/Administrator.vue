<template>
  <div class="admin">
    <h1>{{ msg }}</h1>
    <h2 class="h2_test">link_test</h2>
    <ul>
      <li>
        <a href="/">link</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Administrator',
  data () {
    return {
      msg: 'Administrator'
    }
  }
}
</script>

<style scoped>
.h2_test{
    width:auto;
}
</style>
