<template lang="pug">
section.container.flex.col#splash
  img.logo.title(src="../assets/img/name.png" alt="iHooked Logo")
  #input-container
    b-form-input#search(ref="input", type="search", placeholder="What's interesting today", v-model:value="query", @keyup.enter="clickSearch(false)")
  #buttons
    b-button( @click="clickSearch(false)") Hook Me Up
  p OR
  b-button( @click="clickSearch(true)") Get Lucky
  p Get a random surprise!
</template>

<script>
import axios from '~plugins/axios'

export default {
  asyncData({params, error}) {
    return axios.get(`http://54.169.131.28/api/gifs/word`)
    .then((res)=> {
      return res.data
    })
    .catch((e) => {
      console.log("ERROR in getting word")
    })
  },
  layout: 'landing',
  data () {
    return {
      query: "",
      word: ""
    }
  },
  head () {
    return {
      title: 'iHooked: Home'
    }
  },
  methods: {
    clickSearch(getLucky) {
      let input = this.query.split(' ').join('_')
      if (getLucky || input == "") {
        this.$router.push({path:'search/'+this.word, params: {term:this.word}})
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
  min-height: 90vh
  align-items: center
  justify-content: center

#input-container
  width: 60%
  max-width: 600px

#buttons
  margin : 10px
</style>
