<template>
  <el-date-picker
    v-model="internalValue"
    type="datetime"
    placeholder="Select date and time"
    default-time="12:00:00">
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