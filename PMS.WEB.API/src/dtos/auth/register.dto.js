module.exports = (data) => {
  return {
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    middle_name: data.middle_name || null,
    last_name: data.last_name,
    address: data.address || null,
    phone_number: data.phone_number || null,
    license_number: data.license_number || null,
  };
};
