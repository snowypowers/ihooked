<template lang="pug">
section.container
  #gif
    img(:src="link")
  #blurb {{ blurb }}
  #social Coming soon...
</template>

<script>
import axios from '~plugins/axios'
export default {
  asyncData ({ params, error }) {
    return axios.get(`http://54.169.131.28:3000/api/gifs/${params.term}`)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'GIF not found' })
    })
  },
  data () {
    return {
      tag: -1,
      terms: ['placeholder'],
      link: "https://media.giphy.com/media/mIzJ648c4qwve/giphy.gif",
      blurb: "Meow"
    }
  },
  head () {
    return {
      title: 'GIF  iHooke'
    }
  }
}
</script>

<style lang="stylus">

</style>
