
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
  schema?: object;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, type = 'website', url, schema, breadcrumbs }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Tags Helper
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    if (image) updateMeta('og:image', image);
    updateMeta('og:type', type);
    if (url) updateMeta('og:url', url);
    
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || window.location.href);

    // JSON-LD Schema
    const existingScript = document.getElementById('json-ld-seo');
    if (existingScript) existingScript.remove();

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-seo';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    
    // Breadcrumbs JSON-LD
    const existingBreadcrumbScript = document.getElementById('json-ld-breadcrumbs');
    if (existingBreadcrumbScript) existingBreadcrumbScript.remove();

    if (breadcrumbs) {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": crumb.item.startsWith('/') ? `https://mattgunnin.com${crumb.item}` : crumb.item
            }))
        };
        const script = document.createElement('script');
        script.id = 'json-ld-breadcrumbs';
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);
    }

  }, [title, description, image, type, url, schema, breadcrumbs]);

  return null;
};

export default SEO;
