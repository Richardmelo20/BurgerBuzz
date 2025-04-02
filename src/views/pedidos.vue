<template>
  <div class="main-container">
    <h1 class="main-container__title">Gerenciar pedidos:</h1>
    <dashboard />
  </div>
</template>
<script>
import dashboard from '@/components/dashboard.vue';
export default {
  name: 'Pedidos',
  components: {
    dashboard
  }
};
</script>
<style lang="scss" scoped></style>
