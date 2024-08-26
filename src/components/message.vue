<template>
  <div class="c-message">
    <h1 class="c-message__message">
      {{ msg }}
    </h1>
  </div>
</template>
<script>
export default {
  name: 'Message',
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
.c-message {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;

  &__message {
    font-size: clamp(1em, 1vw, 1.2em);
  }
}
</style>