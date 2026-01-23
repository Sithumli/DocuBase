import { getCollection } from 'astro:content';
import type { BottomNavData, NavTarget } from '@/types';

function getCleanSlug(id: string) {
  return id.replace(/\/index$/, '');
}

/**
 * Get navigation data for docs pages
 * Sequential navigation based on order field
 */
export async function getDocsNavigation(currentSlug: string): Promise<BottomNavData> {
  const allDocs = await getCollection('docs', ({ data }) => !data.draft);
  const sortedDocs = allDocs
    .filter((doc) => doc.id !== 'index')
    .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));

  const currentIndex = sortedDocs.findIndex((doc) => getCleanSlug(doc.id) === currentSlug);
  
  if (currentIndex === -1) {
    return {
      context: {
        type: 'docs',
        isMultiPage: true,
        currentIndex: 0,
        totalInBlock: sortedDocs.length,
      },
    };
  }

  const prev = currentIndex > 0 ? sortedDocs[currentIndex - 1] : undefined;
  const next = currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : undefined;

  const result: BottomNavData = {
    context: {
      type: 'docs',
      isMultiPage: true,
      currentIndex: currentIndex + 1,
      totalInBlock: sortedDocs.length,
    },
  };

  if (prev) {
    result.prev = {
      title: prev.data.title,
      description: prev.data.description,
      href: `/docs/${getCleanSlug(prev.id)}`,
    };
  }

  if (next) {
    result.next = {
      title: next.data.title,
      description: next.data.description,
      href: `/docs/${getCleanSlug(next.id)}`,
    };
  } else {
    // At the end of docs, suggest tutorials
    result.nextBlock = {
      title: 'Start Tutorials',
      description: 'Learn how to build with DocuBase',
      href: '/tutorials',
    };
  }

  return result;
}

/**
 * Get navigation data for blog posts
 * Series-aware navigation if post belongs to a series
 */
export async function getBlogNavigation(
  currentSlug: string,
  series?: string
): Promise<BottomNavData> {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);

  if (series) {
    // Series navigation
    const seriesPosts = allPosts
      .filter(({ data }) => data.series === series)
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));

    const currentIndex = seriesPosts.findIndex((post) => getCleanSlug(post.id) === currentSlug);

    if (currentIndex === -1) {
      return {
        context: {
          type: 'blog',
          isMultiPage: true,
          blockTitle: series,
          currentIndex: 0,
          totalInBlock: seriesPosts.length,
        },
      };
    }

    const prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : undefined;
    const next = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : undefined;

    const result: BottomNavData = {
      context: {
        type: 'blog',
        isMultiPage: true,
        blockTitle: series,
        currentIndex: currentIndex + 1,
        totalInBlock: seriesPosts.length,
      },
    };

    if (prev) {
      result.prev = {
        title: prev.data.title,
        description: prev.data.description,
        href: `/blog/${getCleanSlug(prev.id)}`,
      };
    }

    if (next) {
      result.next = {
        title: next.data.title,
        description: next.data.description,
        href: `/blog/${getCleanSlug(next.id)}`,
      };
    } else {
      // At the end of series, suggest other blog content
      result.nextBlock = {
        title: 'Explore More Blog Posts',
        description: 'Continue reading other articles',
        href: '/blog',
      };
    }

    return result;
  } else {
    // Standalone post - chronological navigation
    const sortedPosts = allPosts.sort(
      (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );

    const currentIndex = sortedPosts.findIndex((post) => getCleanSlug(post.id) === currentSlug);

    if (currentIndex === -1) {
      return {
        context: {
          type: 'blog',
          isMultiPage: false,
          currentIndex: 0,
          totalInBlock: 1,
        },
      };
    }

    const prev = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : undefined;
    const next = currentIndex > 0 ? sortedPosts[currentIndex - 1] : undefined;

    const result: BottomNavData = {
      context: {
        type: 'blog',
        isMultiPage: false,
        currentIndex: 1,
        totalInBlock: 1,
      },
    };

    if (prev) {
      result.prev = {
        title: prev.data.title,
        description: prev.data.description,
        href: `/blog/${getCleanSlug(prev.id)}`,
      };
    }

    if (next) {
      result.next = {
        title: next.data.title,
        description: next.data.description,
        href: `/blog/${getCleanSlug(next.id)}`,
      };
    }

    return result;
  }
}

/**
 * Get navigation data for tutorial pages
 * Sequential navigation based on order field
 */
export async function getTutorialsNavigation(currentSlug: string): Promise<BottomNavData> {
  const allTutorials = await getCollection('tutorials', ({ data }) => !data.draft);
  const sortedTutorials = allTutorials
    .filter((t) => t.id !== 'index')
    .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));

  const currentIndex = sortedTutorials.findIndex((t) => getCleanSlug(t.id) === currentSlug);

  if (currentIndex === -1) {
    return {
      context: {
        type: 'tutorials',
        isMultiPage: true,
        currentIndex: 0,
        totalInBlock: sortedTutorials.length,
      },
    };
  }

  const prev = currentIndex > 0 ? sortedTutorials[currentIndex - 1] : undefined;
  const next = currentIndex < sortedTutorials.length - 1 ? sortedTutorials[currentIndex + 1] : undefined;

  const result: BottomNavData = {
    context: {
      type: 'tutorials',
      isMultiPage: true,
      currentIndex: currentIndex + 1,
      totalInBlock: sortedTutorials.length,
    },
  };

  if (prev) {
    result.prev = {
      title: prev.data.title,
      description: prev.data.description,
      href: `/tutorials/${getCleanSlug(prev.id)}`,
    };
  }

  if (next) {
    result.next = {
      title: next.data.title,
      description: next.data.description,
      href: `/tutorials/${getCleanSlug(next.id)}`,
    };
  } else {
    // At the end of tutorials, suggest blog
    result.nextBlock = {
      title: 'Read the Blog',
      description: 'Explore our latest articles and guides',
      href: '/blog',
    };
  }

  return result;
}
