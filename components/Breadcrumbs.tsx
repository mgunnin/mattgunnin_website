
import React from 'react';
import Link from './Link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-gray-500 mb-6">
            <Link href="/" className="hover:text-cyber-primary transition-colors">
                <Home size={12} />
            </Link>
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center space-x-2">
                    <ChevronRight size={10} />
                    {index === items.length - 1 ? (
                        <span className="text-cyber-primary" aria-current="page">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
