import * as Yup from 'yup'

const todoSchema = Yup.object().shape({
    Action: Yup.string().max(50, 'Cannot exceed 50 characters.').required('*Please enter a Todo.'),
    Done: Yup.boolean().required('*'),
    CategoryId: Yup.number().required('*Please select a Category.')
})

const catSchema = Yup.object().shape({
    CategoryName: Yup.string().max(50, 'Cannot exceed 50 characters.').required('*Please enter a Category'),
    CategoryDescription: Yup.string().max(100, 'Cannot exceed 100 characters.')
})

export default todoSchema;
export {catSchema}