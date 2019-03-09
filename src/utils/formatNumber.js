export default (value, name, config) => {
  if (config[name]) {
    const {
      locale, options, prefix, suffix,
    } = config[name];

    const num = new Intl.NumberFormat(locale, options).format(value);
    return prefix + num + suffix;
  }
  return value;
};
