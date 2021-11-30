import React from 'react'
import { IconProps } from './interfaces'

const SVG = ({ fill = 'currentColor', width = 10, height, viewBox = '0 0 10 17' }: IconProps) => (
    <svg
        width={width}
        height={height || Math.round((width * 17) / 10)}
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.651 8.654a1.145 1.145 0 0 0-.36-.808L2.453 1.157a1.016 1.016 0 0 0-.73-.299c-.588 0-1.045.457-1.045 1.046 0 .282.114.545.316.747l6.152 6.003-6.152 6.003a1.037 1.037 0 0 0-.316.747c0 .59.457 1.046 1.046 1.046.28 0 .527-.105.73-.299L9.29 9.454c.246-.228.36-.492.36-.8Z" />
    </svg>
)

export default SVG
