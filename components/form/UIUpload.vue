<template>
  <el-upload
    class="upload-demo"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :file-list="internalValue"
    :auto-upload="false"
    list-type="picture"
    v-bind="props">
    <el-button size="small" type="primary">Click to upload</el-button>
    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
  </el-upload>
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
    methods: {
      handleRemove(file, fileList) {
        this.$emit('input', fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        console.log(fileList);
        this.$emit('input', fileList);
      }
    }
  }
</script>