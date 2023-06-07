// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Cookie from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    inside: '',
    quantity: 1,
    similar: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPro()
  }

  getSuccess = data => {
    const Details = {
      id: data.id,
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      title: data.title,
      TotalReviews: data.total_reviews,
    }
    console.log(Details)
    this.setState({
      inside: Details,
      similar: data.similar_products,
      apiStatus: apiStatusConstants.success,
    })
  }

  getPro = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwt = Cookie.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/products/${id}`
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.getSuccess(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.initial})
    }
  }

  plus = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  minus = () => {
    const {quantity} = this.state
    if (quantity >= 2) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  //   Return = () => {
  //     console.log('return')
  //     const {history} = this.props
  //     history.replace('/products')
  //   }

  FailureView = () => (
    <div className="cd">
      <img
        className="in"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button className="bv" type="button">
          continue Shopping
        </button>
      </Link>
    </div>
  )

  Loading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  successView = () => {
    const {inside, quantity, similar} = this.state
    return (
      <div>
        <Header />
        <div className="hlo">
          <img className="iii" src={inside.imageUrl} alt="product" />
          <div className="down">
            <h1>{inside.title}</h1>
            <p>Rs {inside.price}/- </p>
            <div className="cen">
              <div className="col">
                <p className="p">{inside.rating}</p>
                <img
                  className="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{inside.TotalReviews} Reviews</p>
            </div>
            <p className="l">{inside.description}</p>
            <p>Available: {inside.availability}</p>
            <p>Brand: {inside.brand}</p>
            <hr />
            <div className="jar">
              <button
                type="button"
                className="y"
                data-testid="minus"
                onClick={this.minus}
              >
                <BsDashSquare className="min m" />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="y"
                data-testid="plus"
                onClick={this.plus}
              >
                <BsPlusSquare className="min pp" />
              </button>
            </div>
            <button type="button" className="but">
              ADD TO CART
            </button>
          </div>
        </div>
        <SimilarProductItem similar={similar} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.initial:
        return this.FailureView()
      case apiStatusConstants.inProgress:
        return this.Loading()
      default:
        return null
    }
  }
}
export default ProductItemDetails
