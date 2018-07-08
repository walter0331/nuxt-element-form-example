<template>
  <div>
    <FormBuilder v-model="model" :fields="fields" @submit.native.prevent>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </FormBuilder>
    {{model}}
  </div>
</template>

<script>
  import FormBuilder from '~/components/FormBuilder';
  import set from 'lodash/set';

  const getModelFromFields = (fields = []) => {
    return fields.reduce((result, item) => {
      if (item.fields) {
        const nestedItemDefault = item.fields.reduce((r, nestedItem) => {
          return set(r, nestedItem.name, typeof nestedItem.default !== 'undefined' ? nestedItem.default : '')
        }, {});

        return set(result, item.name, [nestedItemDefault]);
      }
      return set(result, item.name, typeof item.default !== 'undefined' ? item.default : '');
    }, {});
  }

  export default {
    components: {
      FormBuilder
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