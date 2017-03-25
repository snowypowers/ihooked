<template lang="pug">
section.container
  .column
    h1 About us
    p.tl We are a group of people who wants to spread the joy of learning around. We believe that the modern content medium can go beyond video recordings and virtual reality. As avid users of technology ourselves, we found gifs to be the perfect medium to capture that short and sweet message.
    p.tl Inspired by Giphy, we want to spread the fun and excitment of receiving a cool yet random animated image. Figuring out how it fits with the word that we submitted, laughing at its quirkiness, amazed at the coolness of the unknown. Just like a random fact of the day, but packed with a lot more fun.
    img.sized(src="https://media.giphy.com/media/l2Sq5GffrCyUMEXjW/giphy.gif")
</template>

<script>

export default {
  data () {
    return {

    }
  },
  head () {
    return {
      title: 'iHooked: About'
    }
  }
}
</script>

<style lang="stylus" scoped>
.column
  width:100%
  max-width: 980px
  padding: 0 20px
  margin: 0 auto

.sized
  width: 100%
  max-width: 300px
  height: auto
  margin-bottom: 50px

.tl
  text-align: left
  margin-top: 10px
  margin-bottom: 20px
</style>
