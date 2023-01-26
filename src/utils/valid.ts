interface signUpData {
  role: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

interface loginData {
  email: string
  password: string
}

//TODO: 驗證送出的註冊表單 onSignUpSubmitValid
export function isSignUpValid(
  props: signUpData,
  data: signUpData,
  emailRule: RegExp
) {

  // 驗證是否輸入身分
  if (!data.role.trim()) {
    props = { ...props, role: '欄位不得為空' }
  } else {
    props = { ...props, role: '' }
  }

  // 驗證是否輸入Email
  if (!data.email.trim()) {
    props = { ...props, email: '欄位不得為空' }
  } else {
    props = { ...props, email: '' }
  }

  // 驗證Email格式是否正確
  if (data.email.trim() && !emailRule.test(data.email)) {
    props = { ...props, email: 'Email格式不合法' }
  }
  if (data.email.trim() && emailRule.test(data.email)) {
    props = { ...props, email: '' }
  }

  // 驗證是否輸入名稱
  if (!data.name.trim()) {
    props = { ...props, name: '欄位不得為空' }
  }

  // 驗證輸入名稱長度是否大於 20 字
  if (data.name.trim() && data.name.trim().length > 20) {
    props = { ...props, name: 'Name 長度不得超過20字' }
  } else if (data.name.trim() && data.name.trim().length <= 20) {
    props = { ...props, name: '' }
  }

  // 驗證密碼與確認密碼是否相符
  if (data.password.trim() !== data.confirmPassword.trim()) {
    props = {
      ...props,
      password: '密碼與確認密碼不符',
      confirmPassword: '密碼與確認密碼不符',
    }
  } else {
    props = { ...props, password: '', confirmPassword: '' }
  }

  // 驗證是否輸入密碼
  if (!data.password.trim()) {
    props = { ...props, password: '欄位不得為空' }
  }

  // 驗證是否輸入確認密碼
  if (!data.confirmPassword.trim()) {
    props = { ...props, confirmPassword: '欄位不得為空' }
  }

  //驗證帳號不得有空白鍵
  if (data.name.includes(' ')) {
    props = { ...props, name: '不能有空白' }
  }

  //驗證密碼不得有空白鍵
  if (data.password.includes(' ')) {
    props = { ...props, password: '不能有空白' }
  }

  //驗證確認密碼不得有空白鍵
  if (data.confirmPassword.includes(' ')) {
    props = { ...props, confirmPassword: '不能有空白' }
  }

  return props
}

//TODO: 驗證登入表單 onLoginSubmitValid
export function isLoginValid(
  props: signUpData,
  data: loginData,
  emailRule: RegExp
) {
  // 驗證是否輸入Email
  if (!data.email.trim()) {
    props = { ...props, email: '欄位不得為空' }
  }

  // 驗證Email格式是否正確
  if (data.email.trim() && !emailRule.test(data.email)) {
    props = { ...props, email: 'Email格式不合法' }
  }
  if (data.email.trim() && emailRule.test(data.email)) {
    props = { ...props, email: '' }
  }

  //驗證是否輸入密碼
  if (!data.password.trim()) {
    props = { ...props, password: '欄位不得為空' }
  }

  //驗證密碼不得有空白鍵
  if (data.password.includes(' ')) {
    props = { ...props, password: '不能有空白' }
  }

  return props
}

//TODO: 驗證註冊表單輸入 onSingUpInputChangeValid
export function signUpValueValid(
  props: signUpData,
  inputName: string,
  value: string,
  password: string,
  confirmPassword: string
) {
  if (!value.trim()) {
    props = {
      ...props,
      [inputName]: '欄位不得為空',
    }
  } else {
    props = { ...props, [inputName]: '' }
  }

  if (inputName === 'name' && value.trim().length > 20) {
    props = { ...props, ['name']: 'Name 長度不得超過20字' }
  }

  if (inputName === 'password' && value && value !== confirmPassword) {
    props = {
      ...props,
      ['password']: '密碼與確認密碼不符',
      ['confirmPassword']: '密碼與確認密碼不符',
    }
  }

  if (inputName === 'password' && !value && !confirmPassword) {
    props = {
      ...props,
      ['password']: '欄位不得為空',
      ['confirmPassword']: '欄位不得為空',
    }
  }

  if (inputName === 'password' && value && value === confirmPassword) {
    props = {
      ...props,
      ['password']: '',
      ['confirmPassword']: '',
    }
  }

  if (inputName === 'confirmPassword' && value && value !== password) {
    props = {
      ...props,
      ['password']: '密碼與確認密碼不符',
      ['confirmPassword']: '密碼與確認密碼不符',
    }
  }

  if (inputName === 'confirmPassword' && !value && !password) {
    props = {
      ...props,
      ['password']: '欄位不得為空',
      ['confirmPassword']: '欄位不得為空',
    }
  }

  if (inputName === 'confirmPassword' && value && value === password) {
    props = {
      ...props,
      ['password']: '',
      ['confirmPassword']: '',
    }
  }

  return props
}

//TODO: 驗證登入表單輸入 onLoginInputChangeValid
export function loginValueValid(
  props: signUpData,
  inputName: string,
  value: string
) {
  if (!value.trim()) {
    props = {
      ...props,
      [inputName]: '欄位不得為空',
    }
  } else {
    props = { ...props, [inputName]: '' }
  }
  return props
}

export function isEmailValue(props: signUpData, value: string) {
  if (!value.trim()) {
    props = { ...props, email: '欄位不得為空' }
  } else {
    props = { ...props, email: '' }
  }
  return props
}

export function isRoleValue(props: signUpData, value: string) {
  if (!value.trim()) {
    props = { ...props, role: '欄位不得為空' }
  } else {
    props = { ...props, role: '' }
  }
  return props
}

export function isNameValue(props: signUpData, value: string) {
  if (!value.trim()) {
    props = { ...props, name: '欄位不得為空' }
  } else {
    props = { ...props, name: '' }
  }
  return props
}

export function isPasswordValue(
  props: signUpData,
  value: string,
  confirmPassword: string
) {
  if (value && value !== confirmPassword) {
    props = {
      ...props,
      password: '密碼與確認密碼不符',
      confirmPassword: '密碼與確認密碼不符',
    }
  } else {
    props = { ...props, password: '', confirmPassword: '' }
  }
  if (!value.trim() && !confirmPassword) {
    props = {
      ...props,
      password: '欄位不得為空',
      confirmPassword: '欄位不得為空',
    }
  }
  if (!value.trim()) {
    props = { ...props, password: '欄位不得為空' }
  }
  if (value && value === confirmPassword) {
    props = { ...props, password: '', confirmPassword: '' }
  }
  return props
}

export function isConfirmPasswordValue(
  props: signUpData,
  value: string,
  password: string
) {
  if (value && value !== password) {
    props = {
      ...props,
      password: '密碼與確認密碼不符',
      confirmPassword: '密碼與確認密碼不符',
    }
  }
  if (!value.trim() && !password) {
    props = {
      ...props,
      password: '欄位不得為空',
      confirmPassword: '欄位不得為空',
    }
  }
  if (!value.trim()) {
    props = { ...props, confirmPassword: '欄位不得為空' }
  }
  if (value && value === password) {
    props = { ...props, password: '', confirmPassword: '' }
  }
  return props
}
