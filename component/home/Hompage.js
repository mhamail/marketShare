import React from 'react';
import Featured from './components/Featured';
import Project from './components/Project';
import Banner from './components/Banner';
import Category from './components/Category';
import BannerBody from './components/BannerBody';
import OurPages from './components/OurPages';

const Homepage = () => (
    <>
        <Banner />
        <div className='pt-5'></div>
        <Category />
        <div className='pt-5'></div>
        <Featured />
        <div className='pt-5'></div>
        <BannerBody />
        <div className='pt-5'></div>
        <Project />
        <div className='pt-5'></div>
        <OurPages />
    </>

);
export default Homepage;