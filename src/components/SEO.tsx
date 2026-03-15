import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    type?: 'website' | 'article';
    name?: string;
    image?: string;
    canonicalUrl?: string;
    keywords?: string;
    noindex?: boolean;
}

const BASE_URL = 'https://thirtypixels.com';

export function SEO({
    title,
    description,
    type = 'website',
    name = '30PX',
    image = 'https://thirtypixels.com/30px-logo.webp',
    canonicalUrl,
    keywords,
    noindex = false,
}: SEOProps) {
    const location = useLocation();

    // Ensure the title includes the brand name for better branding in SERPs
    const fullTitle = title.includes('30PX') ? title : `${title} | 30PX — Thirty Pixels Agency`;

    // Auto-generate canonical URL from current route if not explicitly provided
    const canonical = canonicalUrl || `${BASE_URL}${location.pathname === '/' ? '/' : location.pathname}`;

    // Default keywords that should always be present
    const defaultKeywords = '30PX, Thirty Pixels Agency, AI 30PX, unlimited design subscription, AI design agency';
    const allKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={allKeywords} />

            {/* Canonical URL — critical for avoiding duplicate content */}
            <link rel="canonical" href={canonical} />

            {/* Robots directive */}
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

            {/* Open Graph tags for Facebook, LinkedIn, etc. */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={name} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card tags */}
            <meta name="twitter:creator" content="@30px" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
