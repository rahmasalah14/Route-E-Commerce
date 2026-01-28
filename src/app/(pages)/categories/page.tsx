import Loading from '@/app/loading'
import { Category } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

async function Categories() {
  const res= await fetch('https://ecommerce.routemisr.com/api/v1/categories')
    const {data:categories}:{data:Category[]} = await res.json()
    console.log(categories)
  return (
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
          <div>
    {
      categories?.length ===0
       ?   <Loading/>
      :
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map(category => (
         <Link href={'/categories/'+category._id}>
          <div
          key={category._id}
          className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
          >
          <img src={category.image} alt={category.name} className="mx-auto h-16 object-contain mb-2" />
          <p className="text-center font-medium">{category.name}</p>
          </div>
       </Link>
          ))}
          </div>
     
    }
      </div>
      </div> 
  )
}

export default Categories