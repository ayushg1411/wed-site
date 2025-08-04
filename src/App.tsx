import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { VideoGrid } from './components/VideoGrid';
import { AuthProvider } from './contexts/AuthContext';

const sampleVideos = [
  {
    id: '1',
    vimeoId: '1107234012',
    title: 'Getting Started Guide',
    description: 'Learn how to create your first digital wedding invitation',
    duration: '3:45'
  },
  {
    id: '2',
    vimeoId: '1107234012',
    title: 'Advanced Features Overview',
    description: 'Discover powerful tools to grow your business',
    duration: '5:20'
  },
  {
    id: '3',
    vimeoId: '1107224531',
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
        
       
          <section className="hero">
            <h1>Welcome to Gathbandhan</h1>
            <p>Because Every Love Story Deserves a Beautiful Beginning</p>
          </section>
          
          <VideoGrid 
            videos={sampleVideos}
            title="Digital Wedding Invitations"
          />
          
     

        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
