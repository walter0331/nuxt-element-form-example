<template>
  <el-tree ref="tree" node-key="id" v-model="internalValue" v-bind="props" @check="onCheck"></el-tree>
</template>

<script>
  import get from 'lodash/get';
  import difference from 'lodash/difference';

  export default {
    props: ['value', 'props'],
    watch: {
      value(newValue, oldValue) {
        const newCheckedKeys = get(newValue, 'checkedKeys');
        const oldCheckedKeys = get(oldValue, 'checkedKeys');
        const diff = difference(newCheckedKeys, oldCheckedKeys);

        if (diff.length && this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(newCheckedKeys);
        }
      }
    },
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    methods: {
      onCheck(current, { halfCheckedKeys, checkedKeys }) {
        this.internalValue = { halfCheckedKeys, checkedKeys };
      }
    }
  }
</script>