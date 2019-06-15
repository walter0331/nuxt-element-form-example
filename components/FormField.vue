<template>
  <component 
    :is="ui"
    v-model="internalValue"
    v-bind="[$props, props]">
    </component>
</template>
<script>
export default {
  props: ['value', 'ui', 'props'],
  computed: {
    internalValue: {
      get() {
       return this.value; 
      },
      set(value) {
        this.$emit('update', value)
      }
    }
  },
}
</script>

