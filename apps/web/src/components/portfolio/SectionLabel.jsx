import React from 'react';
import Reveal from '@/components/Reveal';

const SectionLabel = ({ children }) => (
    <Reveal className="mb-16" y={40}>
        <span className="label-caps text-sm text-faint">{children}</span>
        <div className="w-6 h-px bg-line mt-2" />
    </Reveal>
);

export default SectionLabel;
