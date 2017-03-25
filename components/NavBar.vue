<template lang="pug">
#nav
  #homeicon H
  #navsearch
    input(ref="navsearch" type="search")
    button( @click="search") S
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
  height: 40px
  width: 100%

#homeicon
  margin: 0 10px

#navsearch
  width:100%
  position: absolute
  left: 0
</style>
