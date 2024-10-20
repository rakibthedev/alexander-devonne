import React from 'react'
import Link from 'next/link'

export default function FooterBottom() {
    const currentYear = new Date().getFullYear();
  return (
    <div className="px-2 lg:px-5 pt-3 pb-4">
        <p className='text-[10px]'>
            © {currentYear} Alexander Devonne. All rights reserved. <Link className="underline" href="#">Privacy Policy</Link>.
        </p>
    </div>
  )
}
