import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    type?: 'website' | 'article';
    name?: string;
    image?: string;
    imageAlt?: string;
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
    imageAlt,
    canonicalUrl,
    keywords,
    noindex = false,
}: SEOProps) {
    const location = useLocation();
    const fullTitle = title.includes('30PX') ? title : `${title} | 30PX - Thirty Pixels Agency`;
    const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');

    const toAbsoluteUrl = (value: string) => {
        if (/^https?:\/\//i.test(value)) return value;
        return `${BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
    };

    const canonical = canonicalUrl ? toAbsoluteUrl(canonicalUrl) : `${BASE_URL}${normalizedPath}`;
    const absoluteImage = toAbsoluteUrl(image);
    const socialImageAlt = imageAlt || fullTitle;
    const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    const defaultKeywords = '30PX, Thirty Pixels Agency, AI 30PX, unlimited design subscription, AI design agency';
    const allKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={allKeywords} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content={robots} />
            <meta name="googlebot" content={robots} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:alt" content={socialImageAlt} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={name} />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:site" content="@30px" />
            <meta name="twitter:creator" content="@30px" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
            <meta name="twitter:image:alt" content={socialImageAlt} />
        </Helmet>
    );
}
