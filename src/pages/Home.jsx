/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
const Home = () => {
  const [item, setItem] = useState([])
  const pages = [1, 2, 3, 4, 5]
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`)
      setItem(data)
      //console.log(item)
    }
    getData()
  }, [item])
  return (
    <div className="container mx-auto flex flex-col justify-center items-center my-10">
      <h3 className="text-center font-semibold my-10 lg:text-6xl text-3xl">Explore Our Products!</h3>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 my-16 '>
        <div>
          <select
            name='category'
            id='category'
            className='border p-4 rounded-lg'
          >
            <option value=''>Filter By Category</option>
            <option value='Web Development'>Web Development</option>
            <option value='Graphics Design'>Graphics Design</option>
            <option value='Digital Marketing'>Digital Marketing</option>
          </select>
        </div>
        <form>
          <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
            <input
              className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
              type='text'
              name='search'
              placeholder='Enter Job Title'
              aria-label='Enter Job Title'
            />
            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#79c2d0] rounded-md   focus:outline-none'>
              Search
            </button>
          </div>
        </form>
        <div>
          <select
            name='category'
            id='category'
            className='border p-4 rounded-md'
          >
            <option value=''>Sort By Deadline</option>
            <option value='dsc'>Descending Order</option>
            <option value='asc'>Ascending Order</option>
          </select>
        </div>
        <button className='btn bg-[#79c2d0] text-white'>Reset</button>
      </div>
      <div className=" grid lg:grid-cols-2  grid-cols-1 gap-8 ">
        {
          item.map(item => <ProductCard
            key={item._id}
            item={item}>
          </ProductCard>)
        }
      </div>
      <div className="flex justify-center mt-12">
        {/* previous button */}
        <button className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* numbers */}
        {pages.map(btnNum => (
          <button
            key={btnNum}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* next button */}
        <button className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Home;