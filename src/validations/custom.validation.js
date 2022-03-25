const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Mật khẩu phải chứa ít nhất 8 ký tự');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Mật khẩu phải chứa ít nhất 1 số và 1 chữ');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
