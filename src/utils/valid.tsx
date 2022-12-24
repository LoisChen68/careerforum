interface s {
  role: string
  email: string
  account: string
  password: string
  confirmPassword: string
}

//TODO: 驗證送出的註冊表單 onSignUpSubmitValid
export function isSignUpValid(props: s, data: s, emailRule: RegExp) {
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

  // 驗證是否輸入帳號
  if (!data.account.trim()) {
    props = { ...props, account: '欄位不得為空' }
  } else {
    props = { ...props, account: '' }
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
  if (data.account.includes(' ')) {
    props = { ...props, account: '不能有空白' }
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

//TODO: 驗證註冊表單 onSingUpInputChangeValid
export function signUpValueValid(
  props: s,
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

export function isEmailValue(props: s, value: string) {
  if (!value.trim()) {
    props = { ...props, email: '欄位不得為空' }
  } else {
    props = { ...props, email: '' }
  }
  return props
}

export function isRoleValue(props: s, value: string) {
  if (!value.trim()) {
    props = { ...props, role: '欄位不得為空' }
  } else {
    props = { ...props, role: '' }
  }
  return props
}

export function isAccountValue(props: s, value: string) {
  if (!value.trim()) {
    props = { ...props, account: '欄位不得為空' }
  } else {
    props = { ...props, account: '' }
  }
  return props
}

export function isPasswordValue(
  props: s,
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
  props: s,
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
