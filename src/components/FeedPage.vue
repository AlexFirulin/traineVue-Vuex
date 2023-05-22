<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happed</div>

<div v-if="feed">
  <div
    class="article-preview"
    v-for="(article, index) in feed.articles"
    :key="index"
  >
    <div class="article-meta">
      <router-link
        :to="{ name: 'userProfile', params: { slug: article.author.username } }"
      >
        <img :src="article.author.image" class="rounded-circle" />
      </router-link>
      <div class="info">
        <router-link
          :to="{
            name: 'userProfile',
            params: { slug: article.author.username }
          }"
          class="text-decoration-none"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ article.createdAt }}</span>
      </div>
      <div class="float-end">ADD TO FAVORITES</div>
    </div>
    <router-link
      :to="{ name: 'article', params: { slug: article.slug } }"
      class="preview-link text-decoration-none"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span class="text-primary">Read more...</span>
      TAG LIST
    </router-link>
  </div>
  <Mcv-Pagination
  :total ="total"
  :limit="limit"
  :current-page="currentPage"
  :url="url"
  ></Mcv-Pagination>
</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvPagination from '@/components/paginationComp'
import {actionTypes} from '@/store/modules/feed'

export default {
  name: 'McvFeed',
  data(){
    return {
      total:500,
      limit:10,
      currentPage:5,
      url:'/'
    }
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components:{
    McvPagination
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    })
  },
  mounted() {
    console.log('feed')
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
  }
}
</script>