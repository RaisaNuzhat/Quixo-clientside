/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const ProductCard = ({item}) => {
    const {Price,Category,Product_Creation_date_and_time,Description,Product_Image,Ratings,Product_Name} = item
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={Product_Image}
                        alt="Shoes"
                        className="rounded-xl w-[304px] h-[304px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-xl text-[#5585b5]">{Product_Name}</h2>
                    <p > <span className="font-medium text-[16px] text-[#53a8b6]">Product Detail:</span> {Description}</p>
                    <p className=""> <span className="text-[#5585b5] font-medium">Category:</span> {Category}</p>
                    <p ><span className="text-[#5585b5] font-medium">Price:</span> {Price}</p>
                    <p ><span className="text-[#5585b5] font-medium">Review: </span>{Ratings}</p>
                    <p > <span className="text-[#5585b5] font-medium">Manufacturing Date:</span> {Product_Creation_date_and_time}</p>
                    <div className="card-actions">
                        <button className="btn bg-[#53a8b6] text-white p-3">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;