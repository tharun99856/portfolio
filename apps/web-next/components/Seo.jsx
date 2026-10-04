import React from 'react';
import { Helmet } from 'react-helmet';

// Social and canonical tags for the portfolio page.
const Seo = ({ title, description, image, url, siteName, type = 'website' }) => {
  const canonical = url || `${window.location.origin}${window.location.pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {siteName && <meta property="og:site_name" content={siteName} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default Seo;

export { Seo };
