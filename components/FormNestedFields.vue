<template>
  <div>
    <el-card v-for="(v, i) in internalValue" :key="i"  shadow="never">
      <div slot="header" class="clearfix">
        <span>{{`${i+1}`}}</span>
        <el-button v-if="internalValue.length > 1" style="float: right; padding: 4px" type="text" @click="onRemove(i)">
          <i class="el-icon-delete"></i>
        </el-button>
      </div>
      <el-form-item v-for="(field, ii) in fields" :key="`${i}_${ii}`" :label="field.label || field.name">
        <component 
          :is="`${field.fields ? 'FormNestedFields' : 'FormField'}`"
          :value="internalValue[i][field.name]" 
          :ui="field.ui" 
          @update="onUpdate(`[${i}]${field.name}`, $event)" 
          v-bind="field">
        </component>
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
    name: 'FormNestedFields',
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
      onRemove(index) {
        const value = [ ...this.value ]; 
        value.splice(index, 1)
        this.$emit('update', value);
      },
      getDefaultValue() {
        return getModelFromFields(this.fields);
      }
    }
  };
</script>