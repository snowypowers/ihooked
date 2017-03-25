<template lang="pug">
section.container.flex.col#splash
  img.logo.title(src="../assets/img/name.png" alt="iHooke Logo")
  #input-container
    b-form-input#search(ref="input", type="search", placeholder="What's interesting today", v-model:state="query")
  #buttons
    b-button( @click="clickSearch(false)") Hook Me Up
  p OR
  b-button( @click="clickSearch(true)") Get Lucky
</template>

<script>
export default {
  layout: 'landing',
  data () {
    return {
      query: ""
    }
  },
  head () {
    return {
      title: 'iHooke'
    }
  },
  methods: {
    clickSearch(getLucky) {
      let input = this.query.split(' ').join('_')
      if (getLucky) {
        this.$router.push({path:'search/a', params: {term:'a'}})
      } else {
        this.$router.push({path:'search/'+input, params: {term: input}})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  margin: 30px 0

#splash
  align-items: center
  justify-content: center

#input-container
  width: 60%
  max-width: 600px

#buttons
  margin : 10px
</style>
