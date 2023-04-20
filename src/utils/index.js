import chooseFieldsOfObject from './chooseFieldsOfObject';
import createSlug from './createSlug';
import { createLocalStorage, createSessionStorage } from './createStorage';
import { getCurrencyString } from './formatCurency';
import { getStringBackTime, formatDateTime } from './formatTime';
import { getUpdateByUserInSystem } from './getUserInSystem';
import getVietnameseIntonation from './getVietnameseIntonation';
import { makeToast, toastType } from './makeToast';
import isEqualObject from './compareTwoObjects';
import validateEmail from './validateEmail';
import { checkPasswordStrength } from './validatePassword';

export {
  chooseFieldsOfObject,
  createSlug,
  createLocalStorage,
  createSessionStorage,
  getCurrencyString,
  getStringBackTime,
  formatDateTime,
  getUpdateByUserInSystem,
  getVietnameseIntonation,
  makeToast,
  toastType,
  isEqualObject,
  validateEmail,
  checkPasswordStrength
};
