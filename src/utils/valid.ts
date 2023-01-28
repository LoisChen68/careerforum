import { passwordStrength } from 'check-password-strength'

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
  const pwdStrength = passwordStrength(data.password).value
  const confirmPwdStrength = passwordStrength(data.confirmPassword).value

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

  // 驗證密碼有值時
  if (data.password.trim()) {
    if (pwdStrength === 'Too weak') {
      props = {
        ...props,
        ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (pwdStrength === 'Weak') {
      props = {
        ...props,
        ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
      props = {
        ...props,
        ['password']: ''
      }
    }
  }

  // 驗證確認密碼有值時
  if (data.confirmPassword.trim()) {
    if (confirmPwdStrength === 'Too weak') {
      props = {
        ...props,
        ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (confirmPwdStrength === 'Weak') {
      props = {
        ...props,
        ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (confirmPwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
      props = {
        ...props,
        ['confirmPassword']: ''
      }
    }
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
  const pwdStrength = passwordStrength(value).value

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

  // 輸入「密碼」欄位時
  if (inputName === 'password') {
    const passwordValue = value

    //若密碼欄有值時
    if (passwordValue) {

      if (pwdStrength === 'Too weak') {
        props = {
          ...props,
          ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength === 'Weak') {
        props = {
          ...props,
          ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
        props = {
          ...props,
          ['password']: ''
        }
      }

      // 密碼與確認密碼不符
      if (confirmPassword && passwordValue !== confirmPassword) {
        props = {
          ...props,
          ['password']: '密碼與確認密碼不符',
          ['confirmPassword']: '密碼與確認密碼不符',
        }
      }

      // 若密碼與確認密碼相同
      if (passwordValue === confirmPassword) {
        if (pwdStrength === 'Too weak') {
          props = {
            ...props,
            ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
            ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
          }
        }
        if (pwdStrength === 'Weak') {
          props = {
            ...props,
            ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
            ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
          }
        }
        if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
          props = {
            ...props,
            ['password']: '',
            ['confirmPassword']: ''
          }
        }
      }

      // 確認密碼為空值
      if (!confirmPassword) {
        props = {
          ...props,
          ['confirmPassword']: '密碼與確認密碼不符',
        }
      }
    }

    // 若密碼與確認密碼皆為空值
    if (!passwordValue && !confirmPassword) {
      props = {
        ...props,
        ['password']: '欄位不得為空',
        ['confirmPassword']: '欄位不得為空',
      }
    }
  }

  // 輸入「確認密碼」欄位時
  if (inputName === 'confirmPassword') {
    const confirmPasswordValue = value

    //若確認密碼欄有值時
    if (confirmPasswordValue) {

      if (pwdStrength === 'Too weak') {
        props = {
          ...props,
          ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength === 'Weak') {
        props = {
          ...props,
          ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
        props = {
          ...props,
          ['confirmPassword']: ''
        }
      }

      // 若密碼有值且確認密碼與密碼不符
      if (password && confirmPasswordValue !== password) {
        props = {
          ...props,
          ['password']: '密碼與確認密碼不符',
          ['confirmPassword']: '密碼與確認密碼不符',
        }
      }

      // 若確認密碼與密碼相同
      if (confirmPasswordValue === password) {
        if (pwdStrength === 'Too weak') {
          props = {
            ...props,
            ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
            ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
          }
        }
        if (pwdStrength === 'Weak') {
          props = {
            ...props,
            ['password']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
            ['confirmPassword']: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
          }
        }
        if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
          props = {
            ...props,
            ['password']: '',
            ['confirmPassword']: ''
          }
        }
      }

      // 若密碼為空值
      if (!password) {
        props = {
          ...props,
          ['confirmPassword']: '密碼與確認密碼不符',
        }
      }
    }

    // 若確認密碼與密碼皆為空值
    if (!confirmPasswordValue && !password) {
      props = {
        ...props,
        ['password']: '欄位不得為空',
        ['confirmPassword']: '欄位不得為空',
      }
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

interface settingData {
  avatar: string
  role: string
  name: string
  password: string
  confirmPassword: string
}

export function isNameValue(props: settingData, value: string) {
  if (!value.trim()) {
    props = { ...props, name: '欄位不得為空' }
  } else {
    props = { ...props, name: '' }
  }
  if (value.length > 20) {
    props = { ...props, name: 'Name 長度不得超過20字' }
  } else {
    props = { ...props, name: '' }
  }
  return props
}

export function isPasswordValue(
  props: settingData,
  passwordValue: string,
  confirmPassword: string
) {
  const pwdStrength = passwordStrength(passwordValue).value
  //若密碼欄有值時
  if (passwordValue) {

    if (pwdStrength === 'Too weak') {
      props = {
        ...props,
        password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (pwdStrength === 'Weak') {
      props = {
        ...props,
        password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
      props = {
        ...props,
        password: ''
      }
    }

    // 密碼與確認密碼不符
    if (confirmPassword && passwordValue !== confirmPassword) {
      props = {
        ...props,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符',
      }
    }

    // 若密碼與確認密碼相同
    if (passwordValue === confirmPassword) {
      if (pwdStrength === 'Too weak') {
        props = {
          ...props,
          password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
          confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength === 'Weak') {
        props = {
          ...props,
          password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
          confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (pwdStrength !== 'Weak' && pwdStrength !== 'Too weak') {
        props = {
          ...props,
          password: '',
          confirmPassword: ''
        }
      }
    }

    // 確認密碼為空值
    if (!confirmPassword) {
      props = {
        ...props,
        confirmPassword: '密碼與確認密碼不符',
      }
    }
  }

  // 若密碼與確認密碼皆為空值
  if (!passwordValue && !confirmPassword) {
    props = {
      ...props,
      password: '欄位不得為空',
      confirmPassword: '欄位不得為空',
    }
  }
  return props
}

export function isConfirmPasswordValue(
  props: settingData,
  confirmPasswordValue: string,
  password: string
) {
  const confirmPasswordStrength = passwordStrength(confirmPasswordValue).value
  //若確認密碼欄有值時
  if (confirmPasswordValue) {

    if (confirmPasswordStrength === 'Too weak') {
      props = {
        ...props,
        confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (confirmPasswordStrength === 'Weak') {
      props = {
        ...props,
        confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
      }
    }
    if (confirmPasswordStrength !== 'Weak' && confirmPasswordStrength !== 'Too weak') {
      props = {
        ...props,
        confirmPassword: ''
      }
    }

    // 若密碼有值且確認密碼與密碼不符
    if (password && confirmPasswordValue !== password) {
      props = {
        ...props,
        password: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符',
      }
    }

    // 若確認密碼與密碼相同
    if (confirmPasswordValue === password) {
      if (confirmPasswordStrength === 'Too weak') {
        props = {
          ...props,
          password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
          confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (confirmPasswordStrength === 'Weak') {
        props = {
          ...props,
          password: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號',
          confirmPassword: '密碼太簡單，請至少 6 碼並包含英文大小寫及特殊符號'
        }
      }
      if (confirmPasswordStrength !== 'Weak' && confirmPasswordStrength !== 'Too weak') {
        props = {
          ...props,
          password: '',
          confirmPassword: ''
        }
      }
    }

    // 若密碼為空值
    if (!password) {
      props = {
        ...props,
        confirmPassword: '密碼與確認密碼不符',
      }
    }
  }

  // 若確認密碼與密碼皆為空值
  if (!confirmPasswordValue && !password) {
    props = {
      ...props,
      password: '欄位不得為空',
      confirmPassword: '欄位不得為空',
    }
  }
  return props
}