import { MetadataRoute } from 'next'
import artists from '@/data/artists.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.maestroconcerts.com'

    // Static pages
    const staticPages = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/album`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/artists`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/collaborations`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/concerts`,
            lastModified: new Date(),
        },
    ]

    // Dynamic pages (artists)
    const artistPages = artists.map((artist) => ({
        url: `${baseUrl}/artists/${artist.id}`,
        lastModified: new Date(),
    }))

    return [...staticPages, ...artistPages]
}