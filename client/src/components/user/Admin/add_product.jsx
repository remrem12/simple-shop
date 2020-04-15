import React, { Component } from 'react'
import UserLayout from '../../../HOC/user'
import FormField from '../../utils/Form/FormField'
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/FormActions'
import { connect } from 'react-redux'
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/product_action'
import FileUpload from '../../utils/Form/fileupload.jsx'


class AddProduct extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter ur name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brand_input',
          option: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Product shipping',
          name: 'shipping_input',
          option: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available in stock',
          name: 'available_input',
          option: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          option: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          option: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          option: [
            { key: true, value: 'Publish' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  }

  updateFields = (newFormData) => {
    this.setState({
      formData: newFormData
    })
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'products')
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, 'products')
    this.setState({
      formSuccess: true, 
      formData: newFormData
    })

    setTimeout(() => {
      this.setState({
        formSuccess: false
      }, () => {
        this.props.dispatch(clearProduct())
      })
    }, 3000)
  }

  submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(this.state.formData, 'products')
    let formIsvalid = isFormValid(this.state.formData, 'products')
    if(formIsvalid){
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if(this.props.products.addProduct.success){
          this.resetFieldHandler()

        }else{
          this.setState({formError: true})
        }
      })
    }else{
      this.setState({
        formError: true
      })
    }
  }

  componentDidMount() {
    const formdata = this.state.formData
    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionFields(formdata, this.props.products.brands, 'brand')
      this.updateFields(newFormData)
    })
    this.props.dispatch(getWoods()).then(res => {
      const newFormData = populateOptionFields(formdata, this.props.products.woods, 'wood')
      this.updateFields(newFormData)
    })
  }


  imagesHandler = images => {
    const newFormData = {
      ...this.state.formData
    }
    newFormData['images'].value = images
    newFormData['images'].valid = true
    this.setState({
      formData: newFormData
    })
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={event => this.submitForm(event)}>

            <FileUpload
              imagesHandler = {images => this.imagesHandler(images)}
              reset = {this.state.formSuccess}
            />

            <FormField
              id={'name'}
              formdata={this.state.formData.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formdata={this.state.formData.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formdata={this.state.formData.price}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={'brand'}
              formdata={this.state.formData.brand}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formdata={this.state.formData.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formdata={this.state.formData.available}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={'wood'}
              formdata={this.state.formData.wood}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'frets'}
              formdata={this.state.formData.frets}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={'publish'}
              formdata={this.state.formData.publish}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? 
              <div className="form_success">Success ^_^</div>
            : null}

            {
              this.state.formError ?
                <div className="error_label">Pls check ur data</div>
                : null
            }

            <button onClick={(event) => this.submitForm(event)}>Add product</button>

          </form>
        </div>
      </UserLayout>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct)
