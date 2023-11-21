import EditProduct from '../../../components/Products/EditProduct';
import { useState } from 'react';
import products from '../../page';


function edit({ params }: { params: any }) {

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
      <hr />
      {params.productId}
      <EditProduct
        product={params}
      />

    </div>
  );
}

export default edit;
