import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    type?: 'website' | 'article';
    name?: string;
    image?: string;
    url?: string;
}

export function SEO({
    title,
    description,
    type = 'website',
    name = '30PX',
    image = 'https://thirtypixels.com/30px-logo.webp', // Default fallback image
    url = 'https://thirtypixels.com',
}: SEOProps) {
    // Ensure the title includes the brand name for better branding in SERPs unless it's already there
    const fullTitle = title.includes('30PX') ? title : `${title} | 30PX`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph tags for Facebook, LinkedIn, etc. */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter Card tags */}
            <meta name="twitter:creator" content="@30px" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
