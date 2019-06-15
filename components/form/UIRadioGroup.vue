<template>
  <el-radio-group v-model="internalValue">
    <el-radio v-for="(option, index) in options" :key="index" :label="option.value">{{option.label}}</el-radio>
  </el-radio-group>
</template>


<script>
  export default {
    props: ['value', 'options'],
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
  };
</script>