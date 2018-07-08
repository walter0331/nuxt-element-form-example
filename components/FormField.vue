<template>
  <component 
    :is="ui"
    v-model="internalValue"
    v-bind="$props">
    </component>
</template>
<script>
export default {
  props: ['value', 'ui', 'type', 'options', 'attr'],
  computed: {
    internalValue: {
      get() {
       return this.value; 
      },
      set(value) {
        console.log(value)
        this.$emit('update', value)
      }
    }
  }
}
</script>

