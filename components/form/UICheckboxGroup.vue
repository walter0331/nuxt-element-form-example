<template>
  <div>
    <el-checkbox-group v-model="internalValue">
      <el-checkbox v-for="(option, index) in options" :key="index" v-bind="option"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    props: {
      value: { type: Array, default: () => [] },
      options: { type: Array, default: () => [] }
    },
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