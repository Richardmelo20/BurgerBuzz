<template>
  <div class="container-banner">
    <h1 class="container-banner__title">Make Your Burger</h1>
  </div>
</template>
<script>
export default {
  name: 'Banner'
};
</script>
<style lang="scss" scoped>
.container-banner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  max-height: 700px;
  background-image: url('/images/burger.jpg');
  background-position: center 60%;
  background-size: cover;

  &__title {
    @include title($color: $secondary, $size: 3.75em, $align: center);
    background-color: $primary;
    padding: 20px 40px;
  }
}
</style>
