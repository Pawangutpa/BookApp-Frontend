import React from "react";
import "../../App.css";
import bannerimg from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between item-center gap-10">
     <div className="md:w-1/2 w-full  flex items-center md:justify-end">
          <img src={bannerimg} alt="bannerimage" />
        </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl ml-2 font-medium mb-7">
        {/* add ml-2 */}
          new release this week
        </h1>
        <p className='mb-10 ml-4'>it's time to update your reading list with some of the latest and greatest releases in the literary world. from heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
        {/* add ml-4 */}
        <button className="btn-primary ml-3">subscribe</button> 
         {/* add ml-3 */}
      </div>
    </div>
  );
};

export default Banner;
