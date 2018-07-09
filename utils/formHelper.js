import set from 'lodash/set';

export const getModelFromFields = (fields = []) => {
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