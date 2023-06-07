// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {similar} = props
  console.log(similar)
  const SimData = similar.map(each => ({
    availability: each.availability,
    brand: each.brand,
    description: each.description,
    id: each.id,
    price: each.price,
    imageUrl: each.image_url,
    rating: each.rating,
    title: each.title,
    style: each.style,
    TotalReviews: each.total_reviews,
  }))
  console.log(SimData)
  return (
    <div className="uu">
      <ul className="ul">
        {SimData.map(each => (
          <li key={each.id} className="li">
            <img src={each.imageUrl} alt="similar product" className="im" />
            <p>{each.title}</p>
            <p>by {each.brand}</p>
            <div className="vv">
              <p>Rs {each.price} /- </p>
              <div className="cc">
                <p className="o">{each.rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="st"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarProductItem
