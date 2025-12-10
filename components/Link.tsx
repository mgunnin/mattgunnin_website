
import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className, onClick, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        
        // Allow default behavior for external links or if modifier keys are pressed
        if (e.metaKey || e.ctrlKey || href.startsWith('http') || href.startsWith('mailto')) return;

        e.preventDefault();
        
        if (href.startsWith('#')) {
            const id = href.substring(1);
            // Special handling for route-based hashes
            if (id.startsWith('/')) {
                 window.history.pushState(null, '', href);
                 window.dispatchEvent(new PopStateEvent('popstate'));
            } else {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
            }
        } else {
            window.history.pushState(null, '', href);
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo(0, 0);
        }
    };

    const isExternal = href.startsWith('http');

    return (
        <a 
            href={href} 
            className={className} 
            onClick={handleClick}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            {...props}
        >
            {children}
        </a>
    );
};

export default Link;
