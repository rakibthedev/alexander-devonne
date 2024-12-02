"use client"; // Ensure this is a client-side component

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page({ searchParams }) {
  const { orderby, order, productCategory } = searchParams;
  const router = useRouter();
  
    const newUrl = `/products/${productCategory}?orderby=${orderby}&order=${order}`;

    router.push(newUrl);


  return (
    <div>
      
    </div>
  );
}
