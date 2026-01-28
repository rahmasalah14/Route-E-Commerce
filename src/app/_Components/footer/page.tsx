import React from 'react'

function Footer() {
  return (
     <footer className="bg-white text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
  
        <div>
          <div className="flex items-center mb-4 text-start">
            <div className="bg-black  text-white w-8 h-8 flex items-center justify-center font-bold mr-2">
              S
            </div>
            <span className="font-bold text-lg">ShopMart</span>
          </div>
          <p className="text-gray-600 mb-4 text-start">
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>
          <div className="text-gray-600 space-y-2 text-start">
            <div className="flex items-center">
             
              <span>123 Shop Street, October City, DC 12345</span>
            </div>
            <div className="flex items-center">

              <span>(+20) 01093333333</span>
            </div>
            <div className="flex items-center">
             
              <span>support@shopmart.com</span>
            </div>
          </div>
        </div>

 
        <div>
          <h3 className="font-bold mb-4">SHOP</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
            <li>Deals</li>
          </ul>
        </div>

   
        <div>
          <h3 className="font-bold mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-bold mb-4">ABOUT</h3>
          <ul className="space-y-2 text-gray-600">
            <li>About shopmart</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Investor Relations</li>
            <li>Sustainability</li>
          </ul>
        </div>

     
        <div>
          <h3 className="font-bold mb-4">POLICIES</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="text-blue-600 hover:underline cursor-pointer">
              Privacy Policy
            </li>
            <li className="text-blue-600 hover:underline cursor-pointer">
              Terms of Service
            </li>
            <li className="text-blue-600 hover:underline cursor-pointer">
              Cookie Policy
            </li>
            <li>Shipping Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer