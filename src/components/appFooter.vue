<template>
  <footer class="footer">
    <p>Make your burger &copy; 2024</p>
  </footer>
</template>
<script>
export default {
  name: 'AppFooter'
};
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  position: relative;
  bottom: 0;
  color: $tertiary;
  background-color: $primary;
  border-top: 4px solid #111;
}
</style>
