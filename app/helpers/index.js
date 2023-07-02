const helpers = {
  removeProperties: (obj, props) => {
    const newObj = { ...obj };
    props.forEach((prop) => {
      delete newObj[prop];
    });
    return newObj;
  },
};

module.exports = helpers;
