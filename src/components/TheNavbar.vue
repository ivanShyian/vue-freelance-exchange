<template>
  <header class="navbar">
    <h2>Freelance</h2>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li>
        <router-link to="/create">Создать</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
header.navbar {
  h2 {
    font-weight: 700;
    margin: 0;
    border: 0;
  }
}
</style>
