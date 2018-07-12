<template>
  <el-autocomplete
    v-model="internalValue"
    v-bind="props"
    @select="onSelect">
  </el-autocomplete>
</template>

<script>
  export default {
    props: ['value', 'props'],
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
    data() {
      return {
        links: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      onSelect(item) {
        if (this.props.onSelect) {
          return this.props.onSelect(item);
        }

        const values = `${this.internalValue}`.split(',');
        values.pop(); 
        this.internalValue = values.concat(item.value).join(',');
      }
    }
  }
</script>