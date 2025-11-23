export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTaxId = (taxId: string): boolean => {
  const taxIdRegex = /^\d{2}-\d{7}$/;
  return taxIdRegex.test(taxId);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

export const validatePositiveNumber = (value: string | number): boolean => {
  if (typeof value === "number") return value > 0;
  return !isNaN(parseFloat(value)) && parseFloat(value) > 0;
};

export const validateRequired = (value: string | number): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};
