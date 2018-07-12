<template>
  <el-select v-model="internalValue" v-bind="props">
    <el-option
      v-for="option in options"
      :key="option.value"
      v-bind="option">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: ['value', 'options', 'placeholder', 'props'],
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    }
  }
</script>