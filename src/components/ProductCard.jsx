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
                    <h2 className="card-title">{Product_Name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions">
                        <button className="btn bg-[#53a8b6] text-white p-3">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;