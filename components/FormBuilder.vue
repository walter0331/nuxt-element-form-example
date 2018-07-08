<template>
  <el-form ref="form" :model="value" label-width="120px">
    <el-form-item v-for="(field, index) in fields" :key="index" :label="field.label || field.name">
      <FormField v-if="!field.fields" :value="getValue(field.name)" :ui="field.ui" @update="onUpdate(field.name, $event)" v-bind="field"></FormField>    
      <div v-else>
        <el-card v-for="(v, ii) in getValue(field.name)" :key="ii">
          <el-form-item v-for="(nestedField, iii) in field.fields" :key="`${index}_${iii}`" :label="nestedField.label || nestedField.name">
            <FormField 
              :value="getValue(nestedField.name)" 
              :ui="nestedField.ui" 
              @update="onUpdate(`${field.name}[${ii}]${nestedField.name}`, $event)" 
              v-bind="nestedField"></FormField>
          </el-form-item>
        </el-card>
        <el-button type="primary" @click="onUpdate(`${field.name}[${getValue(field.name).length}]`, {})">Add</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
  import FormField from './FormField';
  import set from 'lodash/set';
  import get from 'lodash/get';

  export default {
    props:['value', 'fields'],
    components: {
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