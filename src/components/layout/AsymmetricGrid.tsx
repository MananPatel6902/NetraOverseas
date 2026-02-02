import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AsymmetricGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Asymmetric grid layout for brutalist designs
 * Creates intentional visual tension with varied column spans
 *
 * @param children - Grid items
 * @param columns - Number of columns on desktop (default: 3)
 * @param gap - Gap between items (default: 'md')
 * @param className - Additional CSS classes
 *
 * @example
 * <AsymmetricGrid columns={3}>
 *   <div className="col-span-1">Item 1</div>
 *   <div className="col-span-2">Item 2 (wider)</div>
 *   <div className="col-span-1">Item 3</div>
 * </AsymmetricGrid>
 */
export function AsymmetricGrid({
  children,
  columns = 3,
  gap = 'md',
  className,
}: AsymmetricGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapSizes = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        gridCols[columns],
        gapSizes[gap],
        'w-full',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Asymmetric grid item with custom span
 */
export function AsymmetricGridItem({
  children,
  span = 1,
  className,
}: {
  children: ReactNode;
  span?: 1 | 2 | 3;
  className?: string;
}) {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
  };

  return (
    <div className={cn(spanClasses[span], className)}>
      {children}
    </div>
  );
}

/**
 * Brutalist mosaic grid for images
 * Creates asymmetric image layout with varied sizes
 */
export function BrutalistMosaicGrid({
  images,
  className,
}: {
  images: {
    src: string;
    alt: string;
    span?: 1 | 2;
  }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 gap-4',
        className
      )}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'relative overflow-hidden border-4 border-charcoal bg-stone',
            image.span === 2 ? 'col-span-2' : 'col-span-1',
            'aspect-square'
          )}
          style={{ borderRadius: 0 }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
