<template>
  <component 
    :is="ui"
    v-model="internalValue"
    v-bind="[$props, attr]">
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
        this.$emit('update', value)
      }
    }
  }
}
</script>

