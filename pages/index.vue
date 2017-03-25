<template lang="pug">
section.container.flex.col#splash
  img.logo.title(src="../assets/img/name.png" alt="iHooke Logo")
  input#search(ref="input" type="search")
  #buttons
    button( @click="clickSearch(false)") Search
  p OR
  button( @click="clickSearch(true)") Get Lucky
</template>

<script>
export default {
  layout: 'landing',
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'iHooke'
    }
  },
  methods: {
    clickSearch(getLucky) {
      let input = this.$refs.input.value
      input = input.split(' ').join('_')
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

#search
  width: 60%
  max-width: 600px

#buttons
  margin : 10px
</style>
