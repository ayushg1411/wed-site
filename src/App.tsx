import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { VideoGrid } from './components/VideoGrid';
import { OrderPage } from './pages/OrderPage';
import { AuthProvider } from './contexts/AuthContext';
import SaveDate from './categories/SaveDate';
import { ImageCarousel } from './components/ImageCarousel/ImageCarousel';

import { sampleVideos } from './constatnts/VideosData';
import { carouselImages } from './constants/CarouselData';

function HomePage() {
  return (
    <>
      <ImageCarousel 
        images={carouselImages}
        autoScrollInterval={5000}
        showDots={true}
        showArrows={false}
      />
      
     
      
      <VideoGrid 
        videos={sampleVideos}
        title="Digital Wedding Invitations"
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order/:videoId" element={<OrderPage />} />
               <Route path="/wedding/:category" element={<SaveDate />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
