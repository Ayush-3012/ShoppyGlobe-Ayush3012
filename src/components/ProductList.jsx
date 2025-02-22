/* eslint-disable react/prop-types */

import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <div className="py-8  bg-gray-950 mx-0.5 rounded-xl">
      <div className=" grid sm:grid-cols-2 px-4 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center">
        {products?.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
