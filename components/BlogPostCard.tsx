'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type BlogMetadata = {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
};

type BlogMeta = {
  title?: string;
};

type BlogPage = {
  route: string;
  name: string;
  meta?: BlogMeta;
  frontMatter?: BlogMetadata;
};

type BlogPostCardProps = {
  page: BlogPage;
};

const SQUARE_TOLERANCE = 0.1;

export default function BlogPostCard({ page }: BlogPostCardProps) {
  const coverImage = page.frontMatter?.image;
  const title = page.meta?.title || page.frontMatter?.title || page.name;
  const description = page.frontMatter?.description;
  const date = page.frontMatter?.date;
  const [isSquareish, setIsSquareish] = useState(false);

  useEffect(() => {
    if (!coverImage) return;

    let isMounted = true;
    const image = new Image();

    const handleLoad = () => {
      if (!isMounted) {
        return;
      }
      const { naturalWidth, naturalHeight } = image;
      if (!naturalWidth || !naturalHeight) {
        return;
      }
      const ratio = naturalHeight / naturalWidth;
      setIsSquareish(Math.abs(ratio - 1) <= SQUARE_TOLERANCE);
    };

    image.addEventListener('load', handleLoad);
    image.src = coverImage;

    if (image.complete) {
      handleLoad();
    }

    return () => {
      isMounted = false;
      image.removeEventListener('load', handleLoad);
    };
  }, [coverImage]);

  const articleClassName = isSquareish
    ? 'mb-12 sm:flex sm:items-start sm:gap-8'
    : 'mb-12';

  const imageWrapperClassName = isSquareish
    ? 'block overflow-hidden rounded-xl border border-black/5 dark:border-white/10 sm:w-64 sm:flex-shrink-0'
    : 'block overflow-hidden rounded-xl border border-black/5 dark:border-white/10';

  const imageClassName = isSquareish
    ? 'aspect-square w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]'
    : 'h-56 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03] sm:h-72';

  const titleClassName = coverImage
    ? isSquareish
      ? 'block font-semibold text-2xl mt-8 sm:mt-0'
      : 'block font-semibold mt-8 text-2xl'
    : 'block font-semibold text-2xl';

  const descriptionMarginTop = isSquareish ? '0.75rem' : '.5rem';

  return (
    <article className={articleClassName}>
      {coverImage ? (
        <Link
          href={page.route}
          className={imageWrapperClassName}
          style={{ lineHeight: 0 }}
        >
          <img
            src={coverImage}
            alt={title}
            className={imageClassName}
            loading="lazy"
          />
        </Link>
      ) : null}
      <div className={isSquareish ? 'sm:flex-1' : undefined}>
        <Link
          href={page.route}
          style={{ color: 'inherit', textDecoration: 'none' }}
          className={titleClassName}
        >
          {title}
        </Link>
        {description ? (
          <p className="opacity-80" style={{ marginTop: descriptionMarginTop }}>
            {description}{' '}
            <span className="inline-block">
              <Link href={page.route}>{'Read more →'}</Link>
            </span>
          </p>
        ) : null}
        {date ? <p className="opacity-50 text-sm">{date}</p> : null}
      </div>
    </article>
  );
}
