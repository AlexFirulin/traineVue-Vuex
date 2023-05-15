<template>
  <div>
    <mcv-topbar />
  </div>
  <router-view />
</template>
<script>
import McvTopbar from '@/components/topBar.vue'
import { actionTypes } from './store/modules/auth';
export default {
  name:"mcvApp",
  components:{
    McvTopbar
  },
  mounted(){
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>

