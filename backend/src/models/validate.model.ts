import * as yup from 'yup';

export const validateContentSchema = yup.object().shape({
    content: yup
        .string()
        .min(3, 'Content must contain at least 3 characters.')
        .max(1000, 'Content cannot exceed 1000 characters')
        .required('Content is required.'),
});
