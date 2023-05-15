<template>
  <div class="auth-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-12">
          <h1 class="text-center">Sign up</h1>
          <p class="text-center">
            <router-link to="/login">
              Have an account?
            </router-link>
          </p>
          VALIDATION ERRORS
          <mcv-validation-errors
          v-if="validationErrors"
          :validation-errors="validationErrors"/>
          <form
          @submit.prevent="onSubmit"
          >
            <div class="mb-3">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button class="btn btn-lg btn-primary d-grid gap-2 col-12 mx-auto"
            :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// import store from '@/store';
import McvValidationErrors from '@/components/validationErrors.vue'
import { actionTypes } from '@/store/modules/auth'
import { mapState } from 'vuex'
export default {
  name: "McvRegister",
  components: { McvValidationErrors },
  data (){
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed:{
    ...mapState({
      isSubmitting: state =>state.auth.isSubmitting,
      validationErrors: state=> state.auth.validationErrors
    }),
  },
  methods:{
    onSubmit(){
    this.$store
    .dispatch(actionTypes.register,{
    email:this.email,
    username:this.username,
    password:this.password
   }).then(user =>{
      console.log('succes register',user)
      this.$router.push({name:"home"})
    } )
  }
}
}
</script>