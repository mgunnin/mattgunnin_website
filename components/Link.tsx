
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
        
        const targetPath = href;

        if (targetPath === '/' || targetPath === '') {
            // Safer home reset using hash for compatibility
            window.location.hash = '/';
            window.scrollTo(0, 0);
        } else if (targetPath.startsWith('/')) {
            // For other internal paths, assume hash routing if needed or just set hash
            // This forces the App router to pick it up via the hash logic
            window.location.hash = targetPath;
        } else if (targetPath.startsWith('#')) {
            const id = targetPath.substring(1);
            if (id.startsWith('/')) {
                 window.location.hash = id;
            } else {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.location.hash = id;
                } else {
                    window.location.hash = id;
                }
            }
        } else {
             window.location.hash = targetPath;
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
