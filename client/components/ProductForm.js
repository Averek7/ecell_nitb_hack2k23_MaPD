import { useState } from 'react';

function ProductForm() {
  const [formFields, setFormFields] = useState([
    { fieldName: '', fieldValue: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      name: '',
      age: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="ProductForm">
      <form className='FormProductDyn' onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div className='Product_form_dyn_fields' key={index}>
              <input
                name='fieldName'
                placeholder='field name'
                onChange={event => handleFormChange(event, index)}
                value={form.fieldName}
              />
              <input
                name='fieldValue'
                placeholder='field value'
                onChange={event => handleFormChange(event, index)}
                value={form.fieldValue}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <div className='product_form_button'>
        <button className='product_form_button' onClick={addFields}>Add More</button>
        <br />
        <button className='product_form_button' onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default ProductForm;