import Loading from '@/app/loading'
import { Category } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

async function subCategory() {
    const res= await fetch('https://ecommerce.routemisr.com/api/v1/subcategories')
        const {data:subcategories}:{data:Category[]} = await res.json()
        console.log(subcategories)
  return (
      <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
          <div>
    {
      subcategories?.length ===0
       ?   <Loading/>
      :
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {subcategories.map(subcategory => (
         <Link href={'/subcategories/'+subcategory._id}>
          <div
          key={subcategory._id}
          className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
          >
          <p className="text-center font-medium">{subcategory.name}</p>
          </div>
       </Link>
          ))}
          </div>
     
    }
      </div>
      </div> 
  )
}

export default subCategory