import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SplitScreenContainerProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  ratio?: '50-50' | '60-40' | '40-60';
  reverse?: boolean;
  gap?: 'default' | 'wide' | 'narrow';
  verticalAlign?: 'start' | 'center' | 'end';
  className?: string;
  id?: string;
}

/**
 * Reusable split-screen container for brutalist layouts
 * Displays content side-by-side on desktop, stacks on mobile
 *
 * @param leftContent - Content for the left pane (or top on mobile)
 * @param rightContent - Content for the right pane (or bottom on mobile)
 * @param ratio - Column ratio (default: '50-50')
 * @param reverse - Swap order on mobile (default: false)
 * @param gap - Gap between panes (default: 'default' = 4rem)
 * @param verticalAlign - Vertical alignment of content (default: 'center')
 * @param className - Additional CSS classes
 * @param id - Section ID for navigation
 */
export function SplitScreenContainer({
  leftContent,
  rightContent,
  ratio = '50-50',
  reverse = false,
  gap = 'default',
  verticalAlign = 'center',
  className,
  id,
}: SplitScreenContainerProps) {
  // Define grid template columns based on ratio
  const gridCols = {
    '50-50': 'lg:grid-cols-2',
    '60-40': 'lg:grid-cols-[1.5fr_1fr]',
    '40-60': 'lg:grid-cols-[1fr_1.5fr]',
  };

  // Define gap sizes
  const gapSizes = {
    default: 'gap-16 lg:gap-16',
    wide: 'gap-20 lg:gap-24',
    narrow: 'gap-12 lg:gap-12',
  };

  // Define vertical alignment
  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <section
      id={id}
      className={cn(
        'min-h-screen w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24',
        'bg-cream',
        className
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto',
          'grid grid-cols-1',
          gridCols[ratio],
          gapSizes[gap],
          alignItems[verticalAlign],
          reverse && 'lg:flex-row-reverse'
        )}
      >
        {/* Left Pane */}
        <div
          className={cn(
            'w-full',
            reverse && 'lg:order-2'
          )}
        >
          {leftContent}
        </div>

        {/* Right Pane */}
        <div
          className={cn(
            'w-full',
            reverse && 'lg:order-1'
          )}
        >
          {rightContent}
        </div>
      </div>
    </section>
  );
}
