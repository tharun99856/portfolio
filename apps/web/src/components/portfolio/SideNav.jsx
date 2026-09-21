import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'writing', label: 'Writing' },
    { id: 'speaking', label: 'Speaking' },
];

const CONTACT_LINKS = [
    { label: 'Mail', href: 'mailto:antonio@vega.studio' },
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Vimeo', href: 'https://vimeo.com/' },
];

const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const ContactLinks = () => (
    <div className="flex items-center gap-4 md:gap-6">
        {CONTACT_LINKS.map((link) => (
            <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm text-white mix-blend-difference hover:opacity-60 transition-opacity"
            >
                {link.label}
            </a>
        ))}
    </div>
);

const SideNav = () => {
    const [active, setActive] = useState('about');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNav = (id) => {
        setMenuOpen(false);
        scrollToSection(id);
    };

    return (
        <>
            {/* Mobile header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start md:hidden">
                <div className="relative">
                    <button
                        type="button"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="text-sm text-white mix-blend-difference"
                    >
                        {menuOpen ? 'Close' : 'Menu'}
                    </button>
                    <div
                        className={`flex flex-col items-start gap-3 mt-6 transition-all duration-300 ${
                            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                    >
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNav(item.id)}
                                className={`text-sm text-white mix-blend-difference transition-all duration-300 relative py-1 hover:opacity-60 ${
                                    active === item.id
                                        ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
                                        : ''
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
                <ContactLinks />
            </div>

            {/* Desktop top-right contact links */}
            <div className="hidden md:block fixed top-0 right-0 z-50 p-6 md:p-10">
                <ContactLinks />
            </div>

            {/* Desktop fixed side navigation */}
            <nav
                aria-label="Section navigation"
                className="hidden md:flex fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-4"
            >
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNav(item.id)}
                        className={`text-sm text-white mix-blend-difference transition-all duration-300 relative py-1 hover:opacity-60 ${
                            active === item.id
                                ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
                                : ''
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </>
    );
};

export default SideNav;
