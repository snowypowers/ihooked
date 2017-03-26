<template lang="pug">
b-navbar#nav(type="inverse")
  b-link.navbar-brand.logo-container(to="/")
    img#logo(src="../assets/img/logoblack.png")
  b-nav#navsearch(is-nav)
    b-form-input#searchinput(ref="navsearch", type="search", v-model:state="query", @keyup.enter="search")
    b-button( @click="search")
      i.material-icons search
</template>

<script>
export default {
  methods: {
    search() {
      if (this.query == "") return
      let input = this.query.split(' ').join('_')
      this.$router.push({path:input, params: {term: input}})
    }
  },
  data() {
    return {
      query: ""
    }
  }
}
</script>

<style lang="stylus" scoped>
#nav
  flex-flow: row
  background-color: #E6AF40

.logo-container
  flex: 1

#logo

  width: 40px
  height: auto
  margin: 0 10px
  -webkit-transition: -webkit-transform .6s ease-in-out
  transition: transform .6s ease-in-out
  &:hover
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)

#searchinput
  width: 150px
  margin: 0 10px
</style>
