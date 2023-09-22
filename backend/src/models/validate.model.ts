import * as yup from 'yup';

export const newCommentSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup
        .string()
        .min(3, 'Content must contain at least 3 characters.')
        .max(1000, 'Content cannot exceed 1000 characters')
        .required('Content is required.'),
    createdAt: yup.date().default(() => new Date()),
    score: yup.number().default(0),
    user: yup
        .object()
        .shape({
            image: yup.object().shape({
                png: yup.string().required(),
                webp: yup.string().required(),
            }),
            username: yup.string().required('Username is required'),
        })
        .required('User is required'),
    replies: yup.array().default([]),
});

export const newReplySchema = yup.object().shape({
    id: yup.string().required(),
    content: yup
        .string()
        .min(3, 'Content must contain at least 3 characters.')
        .max(1000, 'Content cannot exceed 1000 characters')
        .required('Content is required.'),
    createdAt: yup.date().default(() => new Date()),
    score: yup.number().default(0),
    replyingTo: yup.string().required(),
    user: yup
        .object()
        .shape({
            image: yup.object().shape({
                png: yup.string().required(),
                webp: yup.string().required(),
            }),
            username: yup.string().required('Username is required'),
        })
        .required('User is required'),
});

export const editSchema = yup.object().shape({
    content: yup
        .string()
        .min(3, 'Content must contain at least 3 characters.')
        .max(1000, 'Content cannot exceed 1000 characters')
        .required('Content is required.'),
});
