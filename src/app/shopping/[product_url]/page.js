import React from 'react';

export default function Page({ params }) {
  // Access the productCategory from params
  return (
    <div>
      <h1>Product: {params.product_url}</h1>
    </div>
  );
}

