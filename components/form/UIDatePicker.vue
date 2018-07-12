<template>
  <el-date-picker
    v-model="internalValue"
    v-bind="props">
  </el-date-picker>
</template>

<script>
  export default {
    props: ['value', 'props'],
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    methods: {

    }
  }
</script>