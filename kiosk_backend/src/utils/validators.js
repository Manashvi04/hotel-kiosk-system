export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidMobile = (mobile) => {
  return /^[0-9]{10}$/.test(mobile);
};

export const isValidRating = (rating) => {
  return (
    Number.isInteger(Number(rating)) &&
    Number(rating) >= 1 &&
    Number(rating) <= 5
  );
};

export const isRequired = (...fields) => {
  return fields.every(
    (field) =>
      field !== undefined && field !== null && String(field).trim() !== "",
  );
};
