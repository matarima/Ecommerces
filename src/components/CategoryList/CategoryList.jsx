import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.css'; // File CSS cho các style

const categories = [
  { name: 'iPhone', imgSrc: require('../../assets/product_1.png') },
  { name: 'Mac', imgSrc: require('../../assets/product_2.png')  },
  { name: 'iPad', imgSrc: require('../../assets/product_3.png')  },
  { name: 'Watch', imgSrc: require('../../assets/product_4.png')  },
  { name: 'AirPods', imgSrc: require('../../assets/product_5.png') },
];

function CategoryList() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate('/shop');
  };

  return (
    <div className="category-list container">
      <h3 className="text-center mb-4">CAREFULLY CREATED COLLECTIONS</h3>
      <h2 className="text-center mb-4">BROWSE OUR CATEGORIES</h2>
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.name} onClick={handleCategoryClick}>
            <div className="category-item">
              <img src={category.imgSrc} alt={category.name} className="img-fluid" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
