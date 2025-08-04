import React from 'react';
import { Header } from './components/Header/Header';
import { VideoGrid } from './components/VideoGrid';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// Sample Vimeo video data
const sampleVideos = [
  {
    id: '1',
    vimeoId: '1107224531', // Sample Vimeo video ID
   
    title: 'Advanced Features Overview',
    description: 'Discover powerful tools to grow your business',
    duration: '5:20'
  },
  {
    id: '2',
    vimeoId: '1107224531', // Sample Vimeo video ID
   
    title: 'Advanced Features Overview',
    description: 'Discover powerful tools to grow your business',
    duration: '5:20'
  },

  
  {
    id: '3',
    vimeoId: '1107224531', // Sample Vimeo video ID
    
    title: 'Success Stories',
    description: 'See how other businesses thrive with our platform',
    duration: '4:15'
  }
];

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <section className="hero">
            <h1>Welcome to Gathbandhan</h1>
            <p>Because Every Love Story Deserves a Beautiful Beginning</p>
          </section>
          
          <VideoGrid 
            videos={sampleVideos}
            title="See How It Works"
          />
          
          <section className="content">
            <div className="content-block">
              <h2>About Us</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
            
            <div className="content-block">
              <h2>Features</h2>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
            
            <div className="content-block">
              <h2>Pricing</h2>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco...</p>
            </div>
          </section>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
