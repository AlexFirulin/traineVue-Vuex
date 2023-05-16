<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'globalFeed'}" exact active-class="active">Home</router-link>
          </li>

          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'createArticle'}" active-class="active">
                <i class="ion-compose"></i>
                &nbsp; New Article
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'settings'}" active-class="active">
                <i class="ion-gear-a"></i>
                &nbsp; Settings
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              >
                <img class="user-pic" :src="currentUser.image" />
                &nbsp;
                {{ currentUser.username }}
              </router-link>
            </li>
          </template>

          <template v-if="isAnonimus">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'login'}">
                Sign in
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'register'}">
                Sign up
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getterTypes } from '@/store/modules/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'McvTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn:getterTypes.isLoggedIn,
      isAnonimus: getterTypes.isAnonimus
    }),
  }
}
</script>
