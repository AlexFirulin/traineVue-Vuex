<template>
  <ul class="error-messages">
    <li v-for="errorMessagess in errorMessagess" :key="errorMessagess">
    {{ errorMessagess }}
    </li>
  </ul>
</template>

<script>
export default {
  name:'McvValidationErros',
  props: {
    validationErrors: {
      type: Object,
      required : true
    }
  },
  computed :{
    errorMessagess(){

      return Object.keys(this.validationErrors).map(name=>{
        const messages = this.validationErrors[name].join(',')
        return `${name} ${messages}`
      })
    }
  }
}
</script>