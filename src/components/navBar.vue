<template>
  <header class="heading">
    <router-link to="/" class="heading__logo-container">
      <img :src="logo" :alt="alt" class="heading__logo-container__logo" />
    </router-link>
    <router-link to="/" class="heading__links">Home</router-link>
    <router-link to="/ordersList" class="heading__links">Pedidos</router-link>
  </header>
</template>
<script>
export default {
  name: 'navBar',
  props: ['logo', 'alt']
}
</script>
<style lang="scss" scoped>
.heading {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: $primary;
  border-bottom: 4px solid #111;
  padding: 15px 50px;

  &__logo-container {
    margin: auto;
    margin-left: 0;

    &__logo {
      width: 40px;
      height: auto;
    }
  }

  &__links {
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: 0.5s;

    &:hover {
      color: $secondary;
    }
  }
}
</style>
