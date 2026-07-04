import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name, type, image, url, schema }) => {
  const siteName = "Namma Print House";
  
  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      { /* Facebook tags */ }
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url || 'https://nammaprinthouse.com'} />
      {image && <meta property="og:image" content={image} />}
      
      { /* Twitter tags */ }
      <meta name="twitter:creator" content={name || siteName} />
      <meta name="twitter:card" content={type === 'product' ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      { /* Canonical Link */ }
      <link rel="canonical" href={url || 'https://nammaprinthouse.com'} />

      { /* Structured Data (JSON-LD) */ }
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
