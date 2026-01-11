import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('aspect-square overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
    </div>
  );
}

function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
}

function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3 className={cn('font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
}

function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('text-sm text-gray-600', className)}>
      {children}
    </p>
  );
}

export { Card, CardImage, CardContent, CardTitle, CardDescription };
