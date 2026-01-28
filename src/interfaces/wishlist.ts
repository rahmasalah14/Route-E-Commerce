import { Brand } from "./brand"
import { Category } from "./category"
import { Subcategory } from "./subcategory"

export interface WishResponse {
  status: string
  count: number
  data: WishItem[]
}

export interface WishItem {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}