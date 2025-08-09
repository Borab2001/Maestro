"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules"

interface CarouselProps {
    images: { src: string; alt: string }[]
    autoplayDelay?: number
    showPagination?: boolean
    showNavigation?: boolean
}

export const Carousel: React.FC<CarouselProps> = ({
    images,
    autoplayDelay = 3000,
    showPagination = true,
    showNavigation = true,
}) => {
    const css = `
    .swiper {
        width: 100%;
        padding-bottom: 50px;
    }
    
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 400px;
        /* height: 300px; */
        /* margin: 20px; */
    }
    
    .swiper-slide img {
        display: block;
        width: 100%;
    }
    
    
    .swiper-3d .swiper-slide-shadow-left {
        background-image: none;
    }
    .swiper-3d .swiper-slide-shadow-right{
        background: none;
    }

    .swiper-pagination-bullet {
        display: none;
        background: #ffffff;
        opacity: 0.2;
    }
    .swiper-pagination-bullet-active {
        background: #ffffff;
        opacity: 1;
    }
    `
    return (
        <section className="w-full py-6 md:py-12">
            <style>{css}</style>
            <div className="relative mx-auto flex w-full flex-col">
                <div className="flex w-full items-center justify-center gap-4">
                    <div className="w-full">
                        <Swiper
                            spaceBetween={50}
                            speed={500}
                            autoplay={{
                                delay: autoplayDelay,
                                disableOnInteraction: false,
                            }}
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 2.5,
                            }}
                            pagination={showPagination}
                            navigation={
                            showNavigation
                                ? {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }
                                : undefined
                            }
                            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="size-full rounded-xl aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={image.src}
                                            width={1000}
                                            height={1000}
                                            className="size-full rounded-md object-cover"
                                            alt={image.alt}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="size-full rounded-xl aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={image.src}
                                            width={1000}
                                            height={1000}
                                            className="size-full rounded-md object-cover"
                                            alt={image.alt}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}
