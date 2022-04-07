import React from 'react'
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../../Utilities/validationSchemas'
import axios from 'axios'

export default function CatForm(props) {

    const cancelSubmit = () => props.setShowCreate(false);

    const handleSubmit = (values) => {
        if(!props.cat){
            const catToCreate = {
                CategoryName: values.CategoryName,
                CategoryDescription: values.CategoryDescription
            }
            axios.post('http://localhost:64779/api/categories', catToCreate).then(() => {
                props.getCategories();
                props.setShowCreate(false);
            })
        }
        else {
            console.log('Edit Mode!');
        }
    }

  return (
    <Formik
        initialValues={{
            CategoryName: props.cat ? props.cat.CategoryName : '',
            CategoryDescription: props.cat? props.cat.CategoryDescription : ''
        }}
        validationSchema={catSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
    {({errors, touched}) => (
        <Form>
            <Field name="CategoryName" className="form-control my-2 w-75 mx-auto" placeholder="Category"/>
            {errors.CategoryName && touched.CategoryName ?
            <div className="alert alert-danger w-50 mx-auto py-1">{errors.CategoryName}</div> : null }
            <Field name="CategoryDescription" className="form-control my-2 w-75 mx-auto" placeholder="Description"/>
            {errors.CategoryDescription && touched.CategoryDescription ?
            <div className="alert alert-danger w-50 mx-auto">{errors.CategoryDescription}</div> : null }
            <div className="form-group d-flex justify-content-end my-3">
                <button className="btn btn-secondary mx-2" onClick={() => cancelSubmit()}>Cancel</button>
                <button type="submit" className="btn btn-success mx-2">Submit</button>
            </div>
        </Form>
    )}
    </Formik>
  )
}
