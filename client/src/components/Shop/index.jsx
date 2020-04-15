import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageTop from '../utils/page_top.jsx'
import { getBrands, getWoods, getProductsToShop } from '../../actions/product_action'
import CollapseCheckbox from '../utils/collapseCheckbox.jsx'
import {frets, price} from '../utils/Form/fix_categories'
import CollapseRadio from '../utils/Form/collapseRadio.jsx'
import LoadmoreCards from './loadmoreCards.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'


class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  }


  componentDidMount(){
    this.props.dispatch(getBrands())
    this.props.dispatch(getWoods())
    this.props.dispatch(getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    ))
  }

  // handlePrice = (value) => {
  //   const data = price
  //   let array = []
  //   for(let key in data){
  //     if(data[key]._id === parseInt(value, 10)){
  //       array = data[key].array
  //     }
  //   }
  //   return array
  // }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] =  filters
    if(category === 'price'){
      // let priceValue = this.handlePrice(filters)
      let priceValue = price[filters].array
      newFilters[category] = priceValue
    }
    this.showFilteredResult(newFilters)
    this.setState({
      filters: newFilters
    })
  }

  showFilteredResult = (filters) => {
    this.props.dispatch(getProductsToShop(
      0,
      this.state.limit,
      filters
    )).then(() => {
      this.setState({
        skip: 0
      })
    })
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    })
  }

  loadMoreCard = () => {  
    let skip = this.state.skip + this.state.limit
    this.props.dispatch(getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.toShop
    )).then(() => {
      this.setState({skip})
    })
  }

  render() {
    
    const products = this.props.products
    return (
      <div>
        <PageTop
          title = 'Browse Products'
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState = {true}
                title = 'Brands'
                list = {products.brands}
                handleFilters = { (filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState = {false}
                title = 'Frets'
                list = {frets}
                handleFilters = { (filters) => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initState = {false}
                title = 'Wood'
                list = {products.brands}
                handleFilters = { (filters) => this.handleFilters(filters, 'wood')}
              />
              <CollapseRadio
                initState = {true}
                title = 'Price'
                list = {price}
                handleFilters = { (filters) => this.handleFilters(filters, 'price')}
              />
              
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className = {`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick = {() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon = {faTh}/>
                  </div>
                  <div
                    className = {`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick = {() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon = {faBars}/>
                  </div>
                </div>
              </div>
              <div>
                <LoadmoreCards
                  grid = {this.state.grid}
                  limit = {this.state.limit}
                  size = {products.toShopSize}
                  products = {products.toShop}
                  loadMore = {() => this.loadMoreCard()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop)