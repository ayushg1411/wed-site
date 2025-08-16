import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { VideoGrid } from './components/VideoGrid';
import { OrderPage } from './pages/OrderPage';
import { AuthProvider } from './contexts/AuthContext';

const sampleVideos = [
  {
    id: '1',
    vimeoId: '1107234012',
    title: 'Getting Started Guide',
    description: 'Learn how to create your first digital wedding invitation',
    duration: '3:45',
    pages: 3,
    price: '699'
  },
  {
    id: '2',
    vimeoId: '1107234012',
    title: 'Advanced Features Overview',
    description: 'Discover powerful tools to grow your business',
    duration: '5:20',
      pages: 3,
    price: '699'
  },
  {
    id: '3',
    vimeoId: '1107224531',
    title: 'Success Stories',
    description: 'See how other businesses thrive with our platform',
    duration: '4:15',
      pages: 3,
    price: '699'
  }
];

function HomePage() {
  return (
    <>
      <section className="hero">
        
        <h1>Welcome to Gathbandhan</h1>
        <p>Because Every Love Story Deserves a Beautiful Beginning</p>
      </section>
      
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
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
