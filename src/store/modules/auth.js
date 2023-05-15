import authApi from "@/api/auth"
import { Promise } from "core-js"
import { setItem } from "@/helppers/persistanceStorage"
// import { resolve } from "core-js/fn/promise"
const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors:null,
  isLoggedIn: null,
  isLoading:false
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUsernStart: '[auth]  getCurrentUserStart',
  getCurrentUserSuccess: '[auth]  getCurrentUserSuccess',
  getCurrentUserFailure: '[auth]  getCurrentUserFailure'

}

export const actionTypes ={
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth]  getCurrentUser'
}

export const getterTypes ={
  currentUser:'[auth] currentUser',
  isLoggedIn:'[auth] isLoggedIn',
  isAnonimus:'[aut] isAnonimus'
}

const getters = {
  [getterTypes.currentUser]: state =>{
    return state.currentUser
  },
  [getterTypes.isLoggedIn]:state =>{
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonimus]:state=>{
    return state.isLoggedIn === false
  }
}

const mutations = {
  [mutationTypes.registerStart](state){
    state.isSubmitting = true
  },
  [mutationTypes.registerSuccess](state , payload){
    state.isSubmitting=false,
    state.currentUser = payload,
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state , payload){
    state.isSubmitting=false,
    state.validationErrors = payload
  },


  [mutationTypes.loginStart](state){
    state.isSubmitting=true,
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state , payload){
    state.isSubmitting = false,
    state.currentUser = payload,
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](payload , state){
    state.isSubmitting = false,
    state.validationErrors = payload
  },
  [mutationTypes.getCurrentUsernStart](state){
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state , payload){
    state.isLoading = false,
    state.currentUser = payload,
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state){
    state.isLoading = false,
    state.isLoggedIn = false,
    state.currentUser = null
  }
}
const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.users)
          setItem('accessToken',response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.registerFailure, result.response.data.errors)
        })
    })
  },

  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart)
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.users)
          setItem('accessToken',response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.loginFailure, result.response.data.errors)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUsernStart)
      authApi
        .register()
        .then(response => {
          context.commit(mutationTypes.getCurrentUserSuccess, response.data.users)
          setItem('accessToken',response.data.user.token)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
  },
}

export default{
  state,
  mutations,
  actions,
  getters
}