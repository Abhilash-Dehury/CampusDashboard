import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Card from "./Card.jsx";
import resourceList from "../assets/ResourceList.json";

export default function Resources() {
  return (
    <div id="resources" className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
      <h1 className="font-bold text-2xl py-3">Free Offered Resources</h1>
      <p className="text-gray-500 mb-6">
        Explore our curated collection of free resources — comprehensive guides,
        tutorials, articles, and practical tools to empower your learning journey.
      </p>
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          0:    { slidesPerView: 1, slidesPerGroup: 1 },
          480:  { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {resourceList.map((item) => (
          <SwiperSlide key={item.id}>
            <a href={item.url}><Card item={item} /></a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
