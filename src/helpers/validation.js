import * as Yup from 'yup'
import validator from 'validator'

const fileValidation = (size, allowed) =>
  Yup.mixed()
    .required('No file selected!')
    .test(
      'fileSize',
      `File Size is too large <= ${size}mb allowed!`,
      value => value && value.size <= 1024 * 1024 * size
    )
    .test(
      'fileType',
      'Unsupported File Format',
      value => value && allowed.includes(value.type)
    )

export const ChangePassword = Yup.object().shape({
  oldPassword: Yup.string().required('This field is required*'),
  newPassword: Yup.string().required('This field is required*')
})

export const TextFormSchema = Yup.object().shape({
  text: Yup.string()
    .required('This field is required*')
    .min(5, 'Text should at least be 5 characters long!')
    .max(30, 'Text should at most be 30 characters long!')
})

export const FileFormSchema = Yup.object().shape({
  file: fileValidation(2, ['image/jpg', 'image/jpeg', 'image/png'])
})

export const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required*'),
  lastName: Yup.string().required('This field is required*'),
  dateOfBirth: Yup.date().required('This field is required*'),
  email: Yup.string()
    .email('Invalid email!')
    .required('This field is required*'),
  phoneNumber: Yup.string()
    .test(
      'valid',
      'Invalid phone number, exclude country code!',
      value =>
        value && validator.isMobilePhone(value, 'any', { strictMode: true })
    )
    .required('Phone number is required!'),
  address: Yup.object({
    state: Yup.string().required('This field is required*'),
    street: Yup.string().required('This field is required*'),
    country: Yup.string().required('This field is required*')
  })
})

export const BankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required('This field is required*'),
  bankBranch: Yup.string().required('This field is required*'),
  branchCountry: Yup.string().required('This field is required*'),
  currency: Yup.string().required('This field is required*'),
  swiftCode: Yup.string().required('This field is required*'),
  accountName: Yup.string().required('This field is required*'),
  accountNumber: Yup.number().required('This field is required*'),
  branchAddress: Yup.string().required('This field is required*'),
  iban: Yup.number().required('This field is required*')
})
