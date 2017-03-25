<template lang="pug">
section.container
  .column

    img#gif( :src="link", v-if="format == 'gif' || format != 'gifv'")
    video(v-else-if="format == 'mp4'", preload="auto", autoplay, loop, muted)
      source( :src="addExt('mp4')", type="video/mp4")
    video(v-else, preload="auto", autoplay, loop, muted)
      source( :src="addExt('webm')", type="video/webm")
    #blurb {{ blurb }}
    #social
      h2 Share!
      #icons
        a( :href="shareToWhatsapp", data-action="share/whatsapp/share")
          i.fa.fa-whatsapp
</template>

<script>
import axios from '~plugins/axios'
export default {
  asyncData ({ params, error }) {
    if (params.query[0] == '#') return axios.get(`http://54.169.131.28/api/gifs/tag/${params.query.substring(1)}`)
    else return axios.get(`http://54.169.131.28/api/gifs/${params.query}`)
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
      link: "../assets/spin.gif",
      blurb: "Meow",
    }
  },
  computed: {
    shareToWhatsapp:function() {
      return "whatsapp://send?text=http://localhost:3000/api/gifs/" + '#' + this.tag
    },
    format: function() {
      return this.link.split('.').pop()
    },
    addExt: function(ext) {
      let base = this.link.split('.')
      base.pop()
      return base.join('.') + "." + ext
    }
  },
  head () {
    return {
      title: 'iHooked: GIF'
    }
  }
}
</script>

<style lang="stylus">
.column
  width:100%
  max-width: 980px
  padding: 0 20px
  margin: 0 auto

#gif
  width: 100%
  max-width: 600px
  height: auto
  margin-bottom: 50px

#blurb
  text-align:left
  margin-bottom: 50px

#icons
  font-size: 60px
</style>
