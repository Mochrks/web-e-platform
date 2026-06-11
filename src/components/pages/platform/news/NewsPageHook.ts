import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_NEWS = [
  {
    id: 1,
    title: 'Q3 Townhall Meeting Wrap-up',
    date: 'Oct 15, 2026',
    category: 'Company Update',
    excerpt:
      'Key takeaways from our Q3 townhall, including our new strategic direction, revenue milestones, and upcoming Q4 initiatives. Please review the attached slide deck.',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    views: 342,
  },
  {
    id: 2,
    title: 'New Health Benefits Enrollment Open',
    date: 'Oct 12, 2026',
    category: 'HR & Benefits',
    excerpt:
      'Open enrollment for the new comprehensive health and wellness packages is now live until November 1st. Make sure to update your dependents.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop',
    featured: false,
    views: 890,
  },
  {
    id: 3,
    title: 'E-Platform Version 2.0 Launch',
    date: 'Oct 05, 2026',
    category: 'Product Update',
    excerpt:
      'We are thrilled to announce the launch of E-Platform 2.0 featuring AI simulations, advanced productivity tools, and a brand new dark mode interface.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    featured: false,
    views: 1250,
  },
  {
    id: 4,
    title: 'Welcome Our New VP of Engineering',
    date: 'Oct 01, 2026',
    category: 'Company Update',
    excerpt:
      'Please join us in welcoming Sarah Jenkins to the team as our new Vice President of Engineering. Read her introductory letter here.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    featured: false,
    views: 620,
  },
];

export function useNewsPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState('All');

  const filteredNews = DUMMY_NEWS.filter(
    (news) => activeTab === 'All' || news.category === activeTab
  );
  const featuredNews = filteredNews.find((n) => n.featured);
  const regularNews = filteredNews.filter((n) => !n.featured);

  return {
    isAdmin,
    activeTab,
    setActiveTab,
    filteredNews,
    featuredNews,
    regularNews,
  };
}
