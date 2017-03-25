<template lang="pug">
b-navbar#nav(type="inverse")
  b-link.navbar-brand#logo
    span H
  b-nav#navsearch(is-nav)
    b-form-input#searchinput(ref="navsearch" type="search")
    b-button( @click="search")
      i.material-icons search
</template>

<script>
export default {
  methods: {
    search() {
      let input = this.$refs.navsearch.value
      input = input.split(' ').join('_')
      this.$router.push({path:'search/'+input, params: {term: input}})
    }
  }
}
</script>

<style lang="stylus" scoped>
#nav
  flex-flow: row
  background-color: #E6AF40

#logo
  flex: 1
  margin: 0 10px

#searchinput
  width: 150px
  margin: 0 10px
</style>
