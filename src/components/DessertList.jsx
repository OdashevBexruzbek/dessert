import { useState, useEffect } from 'react';
import waffleThumbnail from '../assets/image-waffle-thumbnail.jpg';
import cremeBruleeThumbnail from '../assets/image-creme-brulee-thumbnail.jpg';
import macaronThumbnail from '../assets/image-macaron-thumbnail.jpg';
import tiramisuThumbnail from '../assets/image-tiramisu-thumbnail.jpg';
import baklavaThumbnail from '../assets/image-baklava-thumbnail.jpg';
import meringueThumbnail from '../assets/image-meringue-thumbnail.jpg';
import cakeThumbnail from '../assets/image-cake-thumbnail.jpg';
import brownieThumbnail from '../assets/image-brownie-thumbnail.jpg';
import pannaCottaThumbnail from '../assets/image-panna-cotta-thumbnail.jpg';
import { SlBasket } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './DessertList.css';
import Cart from '../components/Cart ';

const images = {
  'image-waffle-thumbnail.jpg': waffleThumbnail,
  'image-creme-brulee-thumbnail.jpg': cremeBruleeThumbnail,
  'image-macaron-thumbnail.jpg': macaronThumbnail,
  'image-tiramisu-thumbnail.jpg': tiramisuThumbnail,
  'image-baklava-thumbnail.jpg': baklavaThumbnail,
  'image-meringue-thumbnail.jpg': meringueThumbnail,
  'image-cake-thumbnail.jpg': cakeThumbnail,
  'image-brownie-thumbnail.jpg': brownieThumbnail,
  'image-panna-cotta-thumbnail.jpg': pannaCottaThumbnail,
};

const DessertList = () => {
  const [desserts, setDesserts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      'https://online-json-server-api.up.railway.app/project/66a76bb51d2cd3eb114532cd/desserts'
    )
      .then((response) => response.json())
      .then((data) => setDesserts(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAdd = (dessert) => {
    dispatch(addToCart({ ...dessert, quantity: 1 }));
  };

  return (
    <div className="flex container mx-auto">
      <div className="flex justify-between mx-auto w-full">
        <div className="w-full md:w-3/4 pl-3">
          <h1 className="text-4xl font-bold text-brown-900 mb-8">Desserts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {desserts &&
              desserts.length > 0 &&
              desserts.map((dessert, index) => (
                <div
                  key={index}
                  className="card flex flex-col items-center bg-gray-300"
                >
                  <figure className="w-full flex justify-center">
                    <img
                      src={images[dessert.image.thumbnail.split('/').pop()]}
                      alt={dessert.name}
                      className="image rounded-md w-full h-48 object-cover"
                    />
                  </figure>

                  <div className="mt-3">
                    <p className="categoriya name text-red-600">
                     <span className='text-orange-600'>Category:</span> {dessert.category}
                    </p>
                    <h2 className="mb-2 name text-red-600"><span className='text-orange-600'>Title: </span>{dessert.name}</h2>
                    <p className="text-red-500 font-semibold text-lg mb-4">
                      <span className='text-orange-600'>Price:</span> ${dessert.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAdd(dessert)}
                    className="btn btn-outline btn-error gap-3 items-center flex"
                  >
                    <SlBasket className="text-orange-500" />
                    <p className='text-orange-400'>Add to Cart</p>
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="fixed ">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default DessertList;
