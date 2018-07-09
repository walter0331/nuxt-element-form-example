<template>
  <div>
    <FormBuilder v-model="model" :fields="fields" @submit.native.prevent>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </FormBuilder>

    <h1>Fields</h1>
    <textarea v-model="jsonFields"></textarea>
    <h1>Model</h1>
    <pre>{{model}}</pre>
  </div>
</template>

<script>
  import FormBuilder from '~/components/FormBuilder';
  import set from 'lodash/set';
  import { getModelFromFields } from '~/utils/formHelper';

  export default {
    components: {
      FormBuilder
    },
    computed: {
      jsonFields: {
        get() {
          return JSON.stringify(this.fields, null, 2)
        },
        set(value) {
          this.fields = JSON.parse(value);
        }
      }
    },
    data() {

      const fields = [
        { name: 'user.name', ui: 'el-input', },
        { name: 'label2', ui: 'ui-select', default: [], options: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }], attr: { multiple: true,  } },
        { name: 'label3', ui: 'el-date-picker', },
        { name: 'label4', ui: 'el-switch', default: false },
        { name: 'label5', ui: 'ui-checkbox-group', default: [], options: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }] },
        { name: 'label6', ui: 'ui-radio-group', default: '', options: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }] },
        { name: 'label7', ui: 'el-input', type: 'textarea' },
        { name: 'label8', ui: 'ui-upload', default: [], attr: { action: '' } },
        { name: 'label9', ui: 'ui-tag', default: ['tag1', 'tag2'] },
        { 
          name: 'slider', 
          fields: [
            { name: 'title', ui: 'el-input', default: '' }, 
            { name: 'url', ui: 'el-input', default: '' }
          ]
        },
      ];

      return {
        model: getModelFromFields(fields),
        fields
      }
    },
    methods: {
      onSubmit() {
        console.log(this.model);
      }
    }
  }
</script>