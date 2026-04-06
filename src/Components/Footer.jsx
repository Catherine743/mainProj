import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <div>
      <div className="bg-blue-950 text-white py-12">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

          <div>
            <h3 className="font-semibold mb-4">ABOUT US</h3>
            <p className="text-gray-300">
              Our bookstore offers a wide range of books from fiction, education,
              biographies and more. Discover your next favorite book today.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-gray-300 mb-3">
              Stay updated with our latest trends
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email ID"
                className="px-3 py-2 w-full text-black"
              />

              <button className="bg-yellow-400 px-4">
                Subscribe
              </button>
            </div>

          </div>

          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <p className="text-gray-300 mb-3">Let us be social</p>

            <div className="flex space-x-4 text-xl">
              <FaInstagram />
              <FaTwitter />
              <FaFacebookF />
              <FaLinkedin />
            </div>

          </div>

        </div>

        <p className="text-center text-gray-400 mt-10 text-sm">
          Copyright © 2023 All rights reserved | This website is made by ❤️ Amiya Kiran
        </p>

      </div>
    </div>
  )
}

export default Footer
