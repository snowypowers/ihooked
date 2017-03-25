<template lang="pug">
section.container
  img.logo(src="../assets/img/logo.png" alt="Nuxt.js Logo")
  h1.title {{ error.statusCode }}
  h2.info {{ error.message }}
  nuxt-link.button(to="/" v-if="error.statusCode === 404") Homepage
</template>
<script>
export default {
  props: ['error']
}
</script>

<style lang="stylus" scoped>
.title
  margin-top: 15px;
  font-size: 5em;

.logo
  width: 100%
  max-width: 300px
  height: auto
  margin-bottom: 50px

.info
  font-weight: 300;
  color: #9aabb1;
  margin: 0;

.button
  margin-top: 50px;

</style>
