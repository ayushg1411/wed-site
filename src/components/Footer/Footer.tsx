import React, { useState } from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
const whatsappNumber =7017835443


  return (
    <footer className="footer">
      {/* Newsletter Section */}

      {/* Main Footer */}
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__section">
              <h3 className="footer__section-title">Gathbandhan</h3>
              <p className="footer__section-text">
                Because Every Love Story Deserves a Beautiful Beginning
              </p>
              <div className="footer__social">
                <a href="https://www.instagram.com/gathbandhan.invites" className="footer__social-link" aria-label="Facebook">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1306C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
  <path d="M16 11.37a4 4 0 1 1-7.93 1.12 4 4 0 0 1 7.93-1.12z"></path>
  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
</svg>

                </a>
                <a href="/" className="footer__social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
</svg>

                </a>
                <a href={ `https://wa.me/${whatsappNumber}`} className="footer__social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>

                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h4 className="footer__section-title">Quick Links</h4>
              <ul className="footer__links">
                {/* <li><a href="/features" className="footer__link">Features</a></li> */}
                {/* <li><a href="/pricing" className="footer__link">Pricing</a></li> */}
                <li><a href="/reviews" className="footer__link">Reviews</a></li>
                {/* <li><a href="/templates" className="footer__link">Templates</a></li> */}
              </ul>
            </div>

            {/* Support */}
            <div className="footer__section">
              <h4 className="footer__section-title">Support</h4>
              <ul className="footer__links">
                <li><a href="/contact" className="footer__link">Contact Us</a></li>
                <li><a href="/faq" className="footer__link">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer__section">
              <h4 className="footer__section-title">Legal</h4>
              <ul className="footer__links">
                {/* <li><a href="/privacy" className="footer__link">Privacy Policy</a></li> */}
                <li><a href="/terms" className="footer__link">Terms of Service</a></li>
               
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2025 Gathbandhan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
