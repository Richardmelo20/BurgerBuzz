<template>
  <navBar />
  <router-view />
  <appFooter />
</template>

<script>
import navBar from './components/navBar.vue';
import appFooter from './components/appFooter.vue';

export default {
  name: 'App',
  components: {
    navBar,
    appFooter
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.main-container {
  margin: 50px;
  height: 100vh;
  max-height: 620px;

  &__title {
    @include title($align: center, $margin: 0 0 30px 0);
  }
}
</style>
