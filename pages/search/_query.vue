<template lang="pug">
section.body
  .column
    .gif-container( @click="googleThis")
      video( v-if="format == 'mp4'", preload="auto", autoplay, loop, muted, key="mp4")
        source( :src="addExt('mp4')", type="video/mp4")
      div( v-else-if="fromGfycat", style='position:relative;padding-bottom:57%', key="gfycat")
        iframe( :src="gfycatEmbed" frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen)
      div( v-else-if="fromGiphy")
        iframe(:src="giphyEmbed" width="480" height="384" frameBorder="0" class="giphy-embed" allowFullScreen)
      img#gif( :src="addExt('gif')", v-else-if="format == 'gifv'", key="gifv")
      img#gif( :src="link", v-else, key="else")
    #blurb {{ blurb }}
    #actions
      #icons
        h3 Share!
        a( :href="shareToWhatsapp", data-action="share/whatsapp/share")
          i.fa.fa-whatsapp
        h3 Learn!
        a( :href="shareToWhatsapp")
          i.fa.fa-google
      #rand(v-if="train.length == 0")
        h3 More?
        a( @click="getRandom")
          i.fa.fa-random
      #next(v-else)
        h3 More!
        a( @click="getNext")
          i.fa.fa-arrow-right


</template>

<script>
import axios from '~plugins/axios'
export default {
  transition(to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  asyncData({ params, error }) {
    console.log(params.query)
    if (!params.query) return axios.get(`http://54.169.131.28/api/gifs`)
    else if (params.query[0] == '#') return axios.get(`http://54.169.131.28/api/gifs/tag/${params.query.substring(1)}`)
    else return axios.get(`http://54.169.131.28/api/gifs/${params.query}`)
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'GIF not found' })
      })
  },
  data() {
    return {
      tag: -1,
      terms: ['placeholder'],
      link: "../assets/spin.gif",
      blurb: "Meow",
      train: []
    }
  },
  computed: {
    shareToWhatsapp: function () {
      return "whatsapp://send?text=http://54.169.131.28/api/gifs/" + '#' + this.tag
    },
    format: function () {
      return this.link.split('.').pop()
    },
    fromGfycat: function () {
      return this.isGfycat()
    },
    fromGiphy: function () {
      return this.isGiphy()
    },
    gfycatEmbed: function () {
      let hash = this.link.match(/https:\/\/gfycat\.com\/([\d\w]*)/)
      return "https://gfycat.com/ifr/" + hash[1]
    },
    giphyEmbed: function () {
      let hash = this.link.match(/https:\/\/media\.giphy\.com\/media\/([\d\w]*)\/giphy\.gif/)
      return "//giphy.com/embed/" + hash[1] + "?html5=true"
    }
  },
  methods: {
    isGfycat() {
      return /https:\/\/gfycat\.com/.test(this.link)
    },
    isGiphy() {
      return /https:\/\/media\.giphy\.com/.test(this.link)
    },
    getMore() {
      axios.get(`http://54.169.131.28/api/gifs/${this.terms.join('_')}?count=10`)
        .then((res) => {
          this.train = res.data
        })
        .then(() => {
          this.getNext()
        })
        .catch((e) => {
          console.log("ERROR")
        })
    },
    getRandom() {
      return axios.get(`http://54.169.131.28/api/gifs/word`)
        .then((res) => {
          this.$router.push({ path: res.data.word, params: { term: res.data.word } })
        })
        .catch((e) => {
          console.log("ERROR in getting word")
        })
    },
    getNext() {
      let next = this.train.shift()
      this.tag = next.tag
      this.terms = next.terms
      this.link = next.link
      this.blurb = next.blurb
    },
    addExt(ext) {
      let base = this.link.split('.')
      base.pop()
      return base.join('.') + "." + ext
    },
    googleThis() {
      let googleLink = "http://www.google.com/search?q=" + this.terms.join('+')
      window.open(googleLink, '_blank')
    }
  },
  head() {
    return {
      title: 'iHooked: GIF'
    }
  }
}
</script>

<style lang="stylus">
.body
  width: 100%
  padding: 50px 0
  text-align: center

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
  padding-bottom: 50px
  border-bottom: rgba(0, 0, 0, 0.1) solid 0.1px

#icons
  padding: 5px
  font-size: 60px
  flex: 1
  border-right: rgba(0, 0, 0, 0.1) solid 0.1px

#rand, #next
  padding: 5px 20px
  font-size: 60px

#actions
  display: flex
  flex-flow: row wrap
</style>
