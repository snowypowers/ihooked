<template lang="pug">
b-navbar#nav(type="inverse")
  b-link.navbar-brand.logo-container(to="/")
    img.spin#logo(src="../assets/img/logoblack.png")
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

#searchinput
  width: 150px
  margin: 0 10px
</style>
