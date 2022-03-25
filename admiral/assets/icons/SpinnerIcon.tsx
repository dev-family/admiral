import React from 'react'
import { IconProps } from './interfaces'

const duration = '360ms'

const SVG = ({
    fill = 'currentColor',
    width = 64,
    height = 64,
    viewBox = '0 0 64 64',
}: IconProps) => (
    <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g strokeWidth="0">
            <circle cx="24" cy="0" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="8;7;6;5;4;3;2;1;8"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="16.970562748477143" cy="16.97056274847714" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="1;8;7;6;5;4;3;2;1"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="1.4695761589768238e-15" cy="24" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="2;1;8;7;6;5;4;3;2"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="-16.97056274847714" cy="16.970562748477143" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="3;2;1;8;7;6;5;4;3"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="-24" cy="2.9391523179536475e-15" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="4;3;2;1;8;7;6;5;4"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="-16.970562748477143" cy="-16.97056274847714" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur={duration}
                    values="5;4;3;2;1;8;7;6;5"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="-4.408728476930472e-15" cy="-24" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur="750ms"
                    values="6;5;4;3;2;1;8;7;6"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="16.970562748477136" cy="-16.970562748477143" transform="translate(32,32)">
                <animate
                    attributeName="r"
                    dur="750ms"
                    values="7;6;5;4;3;2;1;8;7"
                    repeatCount="indefinite"
                />
            </circle>
        </g>
    </svg>
)

export default SVG
