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
  :total ="feed.articlesCount"
  :limit="limit"
  :current-page="currentPage"
  :url="baseUrl"
  ></Mcv-Pagination>
</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {parseUrl} from 'query-string'
import  {stringify}  from 'query-string'
import McvPagination from '@/components/paginationComp'
import {actionTypes} from '@/store/modules/feed'
import { limit } from '@/helppers/variables'


export default {
  name: 'McvFeed',
  data(){
    return {
      limit,
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
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * limit - limit
    },
    baseUrl(){
      return this.$route.path
    }
  },
  mounted() {
    this.fetchFeed()
  },
  watch:{
    currentPage(){
      this.fetchFeed()

    }
  },
    methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset:this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }


}
</script>