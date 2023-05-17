<template>
<div class="home-page"></div>
<div class="container page">
  <div class="row">
    <div class="col-md-9"></div>
    <mcv-feed
    :api-url="apiUrl"
    />
    <div class="col-md-3"></div>
    POPULAR TAGS
  </div>
</div>
</template>

<script>
import McvFeed from '@/components/FeedPage.vue'
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed
  },
  data(){
    return {
      apiUrl:'/articles'
    }
  }
}
</script>