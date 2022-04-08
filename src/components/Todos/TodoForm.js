import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import todoSchema from '../../Utilities/validationSchemas'
import axios from 'axios'

export default function TodoForm(props) {

    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        axios.get('http://localhost:64779/api/categories').then(response => {
            setCategories(response.data)
        })
    }
    useEffect(() => {
        getCategories();
    }, []);

    const cancelSubmit = () => {props.todo ? props.setShowEdit(false) : props.setShowCreate(false)};

    const handleSubmit = (values) => {
        if(!props.todo) {
            const todoToCreate = {
                Action: values.Action,
                Done: values.Done,
                CategoryId: values.CategoryId
            }
            axios.post('http://localhost:64779/api/todos', todoToCreate).then(() => {
                props.getTodos();
                props.setShowCreate(false);
            })
        }
        else {
            const todoToEdit = {
                TodoId: props.todo.TodoId,
                Action: values.Action,
                Done: values.Done,
                CategoryId: values.CategoryId
            }
            axios.put('http://localhost:64779/api/todos', todoToEdit).then(() => {
                props.getTodos();
                props.setShowEdit(false);
            })

        }
    }
  return (
    <Formik
        initialValues={{
            Action: props.todo ? props.todo.Action : '',
            Done: props.todo ? props.todo.Done : false,
            CategoryId: props.todo ? props.todo.CategoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}
        >
        {({errors, touched}) => (
            <Form>
                <Field name="Action" className="form-control my-2" placeholder="Todo"/>
                {errors.Action && touched.Action ?
                <div className="alert alert-danger py-1 my-2">{errors.Action}</div> : null}
                <div className="form-group">
                    <Field name="CategoryId" as="select" className="form-control">
                    <option value="" disabled>--Category--</option>
                    {categories.map(cat => 
                    <option key={cat.CategoryId} value={cat.CategoryId}>{cat.CategoryName}</option>
                    )}
                    </Field>
                    {errors.CategoryId && touched.CategoryId ? 
                    <div className="alert alert-danger py-1 my-2">{errors.CategoryId}</div> : null}
                </div>
                <div className="form-group d-flex justify-content-end my-3">
                    <button className="btn btn-secondary mx-2" onClick={() => cancelSubmit()}>Cancel</button>
                    <button className="btn btn-success mx-2" type="submit">Submit</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
