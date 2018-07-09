<template>
  <el-form ref="form" :model="value" label-width="120px">
    <el-form-item v-for="(field, index) in fields" :key="index" :label="field.label || field.name" v-if="shouldShowField(field)">
        <FormNestedFields 
          v-if="field.fields" 
          :value="getValue(field.name)"  
          @update="onUpdate(field.name, $event)" 
          v-bind="field" />
        <FormField 
          v-else 
          :value="getValue(field.name)" 
          :ui="field.ui" 
          @update="onUpdate(field.name, $event)" 
          v-bind="field"></FormField>    
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
  import set from 'lodash/set';
  import get from 'lodash/get';
  import omit from 'lodash/omit';
  import pick from 'lodash/pick';
  import some from 'lodash/some';
  import isEmpty from 'lodash/isEmpty';
  import FormNestedFields from './FormNestedFields';
  import FormField from './FormField';
  import { getModelFromFields } from '~/utils/formHelper';

  const shouldShowField = (model, field) => {
    const { show, hide } = field;

    //show has a higher priority then hide
    if (show) {
      const { name, value } = show;
      return !!~[].concat(get(model, name)).indexOf(value);
    } else if(hide) {
      const { name, value } = hide;
      return !~[].concat(get(model, name)).indexOf(value);
    }

    return true;
  }

  export default {
    props:['value', 'fields'],
    components: {
      FormNestedFields,
      FormField
    },
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          const diff = [].concat(this.fields)
            .map((field) => ({ 
              didChange: shouldShowField(value, field) !== shouldShowField(this.value, field),
              show: shouldShowField(value, field), 
              name: field.name 
            }))
            .filter(state => state.didChange)
            .reduce((result, { show, name }) => set(result, name, { name, value: this.getValue(name), show }), {});

          const diffKeys = Object.keys(diff);

          if (diffKeys.length) {
            if (some(diff, 'show')) {
              this.$emit('input', { ...pick(getModelFromFields(this.fields), diffKeys), ...value });
            } else {
              this.$emit('input', omit({ ...value }, diffKeys));
            }  
          } else {
            this.$emit('input', value);
          }
        }
      }
    },
    methods: {
      getValue(path) {
        return get(this.internalValue, path);
      },
      onUpdate(path, value) {
        this.internalValue = set({ ...this.internalValue }, path, value);
      },
      shouldShowField(field) {
        return shouldShowField(this.internalValue, field);
      }
    }
  }
</script>