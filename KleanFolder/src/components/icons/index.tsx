import React from 'react';

export const FolderIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75A1.75 1.75 0 015.5 8h4.086a1.75 1.75 0 011.237.513l1.414 1.414a1.75 1.75 0 001.237.513H18.5a1.75 1.75 0 011.75 1.75v6.5a1.75 1.75 0 01-1.75 1.75H5.5a1.75 1.75 0 01-1.75-1.75v-8.5z" />
  </svg>
);
