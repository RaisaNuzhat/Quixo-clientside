/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
const Home = () => {
  const [item, setItem] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
    //  handle pagination button
    const handlePaginationButton = value => {
      console.log(value)
      setCurrentPage(value)
    }
    const handleReset = () => {
      setFilter('')
      setSort('')
      setSearch('')
      setSearchText('')
    }
  
    const handleSearch = e => {
      e.preventDefault()
      setSearch(searchText)
    }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`)
      setItem(data)   
    }
    getData()
  }, [currentPage,itemsPerPage,filter,search,sort])
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/productcount?filter=${filter}&search=${search}`)
      setCount(data.count)
      console.log(filter)
    }
    getCount()
  }, [filter,search])
  return (
    <div className="container mx-auto flex flex-col justify-center items-center my-10">
      <h3 className="text-center font-semibold my-10 lg:text-6xl text-3xl">Explore Our Products!</h3>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 my-16 '>
        <div>
          <select
           onChange={e => {
            setFilter(e.target.value)
            setCurrentPage(1)
          }}
            value={filter}
            name='category'
            id='category'
            className='border p-4 rounded-lg'
          >
            <option value=''>Filter By Category</option>
            <option value='Makeup'>Makeup</option>
            <option value='Skincare'>Skincare</option>
          </select>
        </div>
        <form onSubmit={handleSearch}>
          <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
            <input
              className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
              type='text'
              name='search'
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
              placeholder='Enter product name'
              aria-label='Enter product name'
            />
            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#79c2d0] rounded-md   focus:outline-none'>
              Search
            </button>
          </div>
        </form>
        <div>
          <select
             onChange={e => {
              setSort(e.target.value)
              setCurrentPage(1)
            }}
            value={sort}
            name='sort'
            id='sort'
            className='border p-4 rounded-md'
          >
            <option value=''>Sort By Price</option>
            <option value='dsc'>Descending Order</option>
            <option value='asc'>Ascending Order</option>
          </select>
        </div>
        <button onClick={handleReset} className='btn bg-[#79c2d0] text-white'>Reset</button>
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
        <button 
        disabled={currentPage === 1}
        onClick={() => handlePaginationButton(currentPage - 1)}
        className='px-4 py-2 mx-1 text-white disabled:text-[#bbe4e9] capitalize bg-[#5585b5] rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
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
          onClick={() => handlePaginationButton(btnNum)}
          key={btnNum}
          className={`hidden ${
            currentPage === btnNum ? 'bg-[#5585b5] text-white' : ''
          } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#5585b5]  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* next button */}
        <button
           disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
         className='px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-[#5585b5] rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
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