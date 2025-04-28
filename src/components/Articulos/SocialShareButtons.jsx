import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon
} from 'react-share';

const SocialShareButtons = ({ url, title }) => {

  const currentUrl = window.location.href; // Obtiene la URL actual
  const currentTitle = document.title; // Obtiene el título actual de la página
  const quote = `¡Mira este artículo: ${currentTitle}!`;

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <FacebookShareButton url={currentUrl} quote={quote}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      
      <TwitterShareButton url={currentUrl} title={quote}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      
      <LinkedinShareButton url={currentUrl} title={quote}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      
      <WhatsappShareButton url={currentUrl} title={quote}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      
    </div>
  );
};

export default SocialShareButtons;