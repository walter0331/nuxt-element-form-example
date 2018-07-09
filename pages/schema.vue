<template>
  <div>
    <h1>Schema builder</h1>
    <SchemaBuilder v-model="model" :fields="fields" @submit.native.prevent>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </SchemaBuilder>
    <pre>
      {{model}}
    </pre>
    <h1>FORM</h1>
    <FormBuilder :fields="model.fields" />
  </div>
</template>

<script>
  import SchemaBuilder from '~/components/SchemaBuilder';
  import FormBuilder from '~/components/FormBuilder';
  import set from 'lodash/set';
  import { getModelFromFields } from '~/utils/formHelper';

  export default {
    components: {
      SchemaBuilder,
      FormBuilder
    },
    data() {

      const result = [
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

      const fields = [
        {
          name: 'fields',
          fields: [
            { name: 'label', ui: 'el-input', },
            { name: 'name', ui: 'el-input', },
            { 
              name: 'ui', 
              ui: 'ui-select', 
              default: '', 
              options: [
                { label: '單行文字', value: 'el-input' },
                { label: '選單', value: 'value-select' },
                { label: '日期', value: 'el-date-picker' },
                { label: '標籤', value: 'ui-tag' },
                { label: '多選', value: 'ui-checkbox-group' },
              ] 
            }
          ]
        }
      ];

      return {
        model: getModelFromFields(fields),
        fields: fields
      }
    },
    methods: {
      onSubmit() {
        console.log(this.model);
      }
    }
  }
</script>