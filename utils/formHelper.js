import set from 'lodash/set';

export const getModelFromFields = (fields = []) => {
  console.log(fields);
  return fields.reduce((result, item) => {
    return item.fields
      ? set(result, item.name, [getModelFromFields(item.fields)])
      : set(result, item.name, typeof item.default !== 'undefined' ? item.default : '');
  }, {});
}