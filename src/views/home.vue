<template>
  <Banner />
  <div class="main-container">
    <h1 class="main-container__title">Monte o seu burger:</h1>
    <BurguerForm />
  </div>
</template>
<script>
import Banner from '@/components/banner.vue';
import BurguerForm from '@/components/burguerForm.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    BurguerForm
  }
};
</script>
<style lang="scss" scoped></style>
