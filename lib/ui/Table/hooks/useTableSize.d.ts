import React from 'react';
export default function useTableSize(target: React.RefObject<HTMLElement | null>): {
    width: number;
};
