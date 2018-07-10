<template>
  <el-row :gutter="20">
    <el-col :md="12">
      <el-card>
        <FormBuilder v-model="model" :fields="fields" @submit.native.prevent>
          <el-button type="primary" @click="onSubmit">Create</el-button>
        </FormBuilder>
      </el-card>
    </el-col>
    <el-col :md="12">
      <el-card>
        <h1>Model</h1>
        <el-input type="textarea" v-model="jsonModel" :prop="{ style:'height: 200px;' }"></el-input>
      </el-card>
      <el-card>
        <h1>Fields</h1>
        <pre>{{fields}}</pre>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import FormBuilder from '~/components/FormBuilder';
  import set from 'lodash/set';
  import { getModelFromFields } from '~/utils/formHelper';

  export default {
    components: {
      FormBuilder
    },
    updated() {
      console.log(arguments)
    },
    data() {

      const fields = [
        { name: 'user.name', label: '用戶名稱', ui: 'el-input' },
        { name: 'label2', label: '性別', ui: 'ui-select', default: [], options: [{ label: '男生', value: 'M' }, { label: '女生', value: 'F' }], attr: { multiple: false,  } },
        { name: 'label3', label: '生日', ui: 'el-date-picker', },
        { name: 'label4', label: '是否有養過寵物', ui: 'el-switch', default: false },
        { name: 'label5', ui: 'ui-checkbox-group', default: [], options: [{ label: '貓', value: 'cat' }, { label: '狗', value: 'dog' }] },
        { name: 'label6', ui: 'el-input', label: '養寵物的心得', type: 'textarea', hide: { name: 'label4', value: false } },
        { name: 'label7', ui: 'ui-upload', default: [], attr: { action: '' } },
        { name: 'label8', ui: 'ui-radio-group', label: '顯示Tag', default: '', options: [{ label: '不使用', value: false }, { label: '使用', value: true }] },
        { name: 'label9', ui: 'ui-tag', default: ['tag1', 'tag2'], show: { name: 'label8', value: true } },
        { 
          name: 'slider', 
          fields: [
            { name: 'title', ui: 'el-input', default: '' }, 
            { name: 'url', ui: 'el-input', default: '' }
          ]
        },
        { 
          name: 'tree', 
          ui: 'ui-tree',
          attr: {
            showCheckbox: true,
            highlightCurrent: true,
            data: [
              {
                id: 1,
                label: "Level one 1",
                children: [{
                  id: 4,
                  label: "Level two 1-1",
                  children: [{
                    id: 9,
                    label: "Level three 1-1-1"
                  }, {
                    id: 10,
                    label: "Level three 1-1-2"
                  }]
                }]
              }, {
                id: 2,
                label: "Level one 2",
                children: [{
                  id: 5,
                  label: "Level two 2-1"
                }, {
                  id: 6,
                  label: "Level two 2-2"
                }]
              }, {
                id: 3,
                label: "Level one 3",
                children: [{
                  id: 7,
                  label: "Level two 3-1"
                }, {
                  id: 8,
                  label: "Level two 3-2"
                }]
              }
            ]
         }
        },
      ];

      return {
        model: getModelFromFields(fields),
        fields
      }
    },
    computed: {
      jsonModel: {
        get() {
          return JSON.stringify(this.model, null, 2);
        },
        set(value) {
          try {
            this.model = JSON.parse(value);
          } catch (e) {
            console.log(e);
          }
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.model);
      }
    }
  }
</script>