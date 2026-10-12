import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.9 },
    { path: '/esg', priority: 0.8 },
    { path: '/approach', priority: 0.7 },
    { path: '/resources', priority: 0.7 },
    { path: '/contact', priority: 0.9 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));
}
