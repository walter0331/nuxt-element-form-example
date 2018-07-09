<template>
  <div>
    <el-card v-for="(v, i) in internalValue" :key="i">
      <el-form-item v-for="(field, ii) in fields" :key="`${i}_${ii}`" :label="field.label || field.name">
        <FormField 
          :value="internalValue[i][field.name]" 
          :ui="field.ui" 
          @update="onUpdate(`[${i}]${field.name}`, $event)" 
          v-bind="field"></FormField>
      </el-form-item>
    </el-card>
    <el-button type="primary" @click="onUpdate(`[${internalValue.length}]`, getDefaultValue())">Add</el-button>
  </div>
</template>

<script>
  import set from 'lodash/set';
  import { getModelFromFields } from '~/utils/formHelper';
  import FormField from './FormField';

  export default {
    props: {
      value: { type: Array, default: () => [] },
      name: { type: String },
      fields: { type: Array, default: () => [] },
      show: { type: Object }
    },
    components: {
      FormField
    },
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('update', value);
        }
      }
    },
    methods: {
      onUpdate(path, value) {
        this.$emit('update', set([ ...this.value ], path, value));
      },
      getDefaultValue() {
        return getModelFromFields(this.fields);
      }
    }
  };
</script>