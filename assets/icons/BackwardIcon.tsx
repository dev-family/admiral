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
        <path d="M.349 8.654c0 .308.114.572.36.8l6.838 6.697c.193.194.44.3.73.3.58 0 1.045-.458 1.045-1.047 0-.29-.123-.545-.316-.747L2.845 8.654l6.16-6.003a1.09 1.09 0 0 0 .317-.747c0-.589-.466-1.046-1.046-1.046-.29 0-.536.106-.73.3L.71 7.845c-.246.237-.36.5-.36.808Z" />
    </svg>
)

export default SVG
