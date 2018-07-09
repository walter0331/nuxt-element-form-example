<template>
  <el-form ref="form" :model="value" label-width="120px">
    <el-form-item v-for="(field, index) in fields" :key="index" :label="field.label || field.name">
      <FormNestedFields v-if="field.fields" :value="getValue(field.name)"  @update="onUpdate(field.name, $event)" v-bind="field" />
      <FormField v-else :value="getValue(field.name)" :ui="field.ui" @update="onUpdate(field.name, $event)" v-bind="field"></FormField>    
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
  import FormNestedFields from './FormNestedFields';
  import FormField from './FormField';
  import set from 'lodash/set';
  import get from 'lodash/get';

  export default {
    props:['value', 'fields'],
    components: {
      FormNestedFields,
      FormField
    },
    methods: {
      getValue(path) {
        return get(this.value, path);
      },
      onUpdate(path, value) {
        this.$emit('input', set({ ...this.value }, path, value));
      }
    }
  }
</script>