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
        <pre>{{model}}</pre>
        <!-- <el-input type="textarea" v-model="jsonModel"></el-input> -->
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
    data() {

      const fields = [
        { name: 'autocomplete', ui: 'ui-autocomplete', debounce: 400, fetchSuggestions: this.onAutocompleteFetchSuggestions },
        { name: 'user.name', label: '用戶名稱', ui: 'el-input' },
        { name: 'slider.normal', ui: 'el-slider', default: 0 },
        { name: 'slider.range', ui: 'el-slider', range: true, default: [25, 75] },
        { name: 'slider.stop', ui: 'el-slider', range: true, default: [50, 75], step: 10, showStops: true },
        { name: 'color', label: '選擇顏色', ui: 'el-color-picker' },
        { name: 'user.count', label: '數量', ui: 'el-input-number', default: 3, min: 1, max: 5  },
        { name: 'user.ratings', label: '評分', ui: 'el-rate', default: 3.6,  },
        { name: 'label2', label: '性別', ui: 'ui-select', default: 'M', options: [{ label: '男生', value: 'M' }, { label: '女生', value: 'F' }], multiple: false },
        { name: 'date', label: '生日', ui: 'el-date-picker', default: '1987-03-31', type: 'date' },
        { name: 'datetimerange', label: '日期區間', ui: 'el-date-picker', type: 'datetimerange', default: ['1987-03-31', '1987-04-01'] },
        { name: 'label4', label: '是否有養過寵物', ui: 'el-switch', default: false },
        { name: 'label5', ui: 'ui-checkbox-group', default: [], options: [{ label: '貓', value: 'cat' }, { label: '狗', value: 'dog' }] },
        { name: 'label6', ui: 'el-input', label: '養寵物的心得', type: 'textarea', hide: { name: 'label4', value: false } },
        { name: 'label7', ui: 'ui-upload', default: [], action: '' },
        { name: 'label8', ui: 'ui-radio-group', label: '顯示Tag', default: '', options: [{ label: '不顯示', value: false }, { label: '顯示', value: true }] },
        { name: 'label9', ui: 'ui-tag', default: ['tag1', 'tag2'], show: { name: 'label8', value: true } },
        { 
          name: 'cards', 
          fields: [
            { name: 'title', ui: 'el-input', default: '' }, 
            { name: 'url', ui: 'el-input', default: '' }
          ]
        },
        { name: 'githubFollwing', ui: 'ui-tag', default: [] },
        { 
          name: 'tree', 
          ui: 'ui-tree',
          showCheckbox: true,
          highlightCurrent: true,
          data: []
        },
      ];

      return {
        githubFallowing: [],
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
    async created(){

      //async data
      const [
        following,
        treeData,
      ] = [
        await this.fetchGithubFollowing(),
        await this.fetchTreeData(),
      ];

      //tags
      const tags = following.map(({ login }) => login);
      set(this.model, 'githubFollwing', tags);

      //tree
      set(this.fields.find(({ name }) => name === 'tree'), 'data', treeData);
      set(this.model, 'tree', { checkedKeys: [8] });


    },
    methods: {
      onSubmit() {
        console.log(this.model);
      },
      async onAutocompleteFetchSuggestions(search, cb) {
        const q = search.split(',').pop();
        
        if (!q) {
          cb();
        }
  
        const { items } = await this.$axios.$get(`https://api.github.com/search/repositories?q=${q}`);
        cb(items ? items.map(({ name }) => ({ value: name })) : []);
      },
      async fetchGithubFollowing() {
        return await this.$axios.$get('https://api.github.com/users/walter0331/following');
      },
      async fetchTreeData() {
        //wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        return [
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
        ];
      }
    }
  }
</script>