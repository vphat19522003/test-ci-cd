import { errorMessages } from './errorMessages';

export const otpRegex = /^\d{6}$/;
export const digitRegex = /^\d+$/;
export const userNameRegex = /^[a-zA-Z0-9_]+$/;
export const phoneNumberRegex = /^\d{10,15}$/;
export const passwordMinLength = 7;
export const passwordCriteria = [
  { regex: /[a-z]/, message: errorMessages.passwordLowerCase },
  { regex: /[A-Z]/, message: errorMessages.passwordUpperCase },
  { regex: /\d/, message: errorMessages.passwordDigit },
  { regex: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]/, message: errorMessages.passwordSpecialChar }
];
