import * as yup from 'yup';

export const schema = yup.object().shape({
    userName: yup
        .string()
        .transform(value => (value ? value.trim() : ''))
        .min(2, 'User name must be between 2 and 16 characters.')
        .max(30, 'User name must be between 2 and 16 characters.')
        .matches(/^[a-zA-Z0-9 ]{2,16}$/, 'User name must be between 2 and 16 characters.')
        .test(
            'not-only-spaces',
            'User name cannot consist of spaces only.',
            value => value && value.trim() !== ''
        )
})

export const formFields = {
    userName: {
        general: 'Name',
        type: 'text',
        label: 'Name',
    },
    userLastname: {
        general: 'Lastname',
        type: 'text',
        label: 'Lastname',
    },
    userJobTitle: {
        general: 'Job Title',
        type: 'text',
        label: 'Job Title',
    },
    userPhone: {
        general: 'Phone',
        type: 'phone',
        label: 'Phone',
    },
    userEmail: {
        general: 'Email',
        type: 'email',
        label: 'Email',
    },
    userAddress: {
        general: 'Address',
        type: 'text',
        label: 'Address',
    },
    userPich: {
        general: 'Pitch',
        type: 'text',
        label: 'Pitch',
    },
}