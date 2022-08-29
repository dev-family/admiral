import React from 'react'

type ModalImageProps = {
    headerTypo: string
    headerBg: string
    typoPrimary: string
    controlBgPrimary: string
    controlTypoPrimary: string
}

const ModalImage = ({
    headerTypo = '#2d255e',
    headerBg = '#e3e1d8',
    typoPrimary = '#2d255e',
    controlTypoPrimary = '#ffffff',
    controlBgPrimary = '#5357AE',
}: Partial<ModalImageProps>) => {
    return (
        <svg
            width="674"
            height="428"
            viewBox="0 0 674 428"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="674" height="428" rx="32" fill="#fff" />
            <path
                d="M0 32C0 14.327 14.327 0 32 0h610c17.673 0 32 14.327 32 32v40H0V32Z"
                fill={headerBg}
            />
            <path
                d="M257.744 44.11c-1.129 0-2.149-.22-3.058-.66a7.414 7.414 0 0 1-2.354-1.782 8.728 8.728 0 0 1-1.54-2.552 8.385 8.385 0 0 1-.528-2.926c0-1.041.191-2.031.572-2.97a8.184 8.184 0 0 1 1.584-2.53 7.386 7.386 0 0 1 2.376-1.76 6.869 6.869 0 0 1 2.992-.66c1.115 0 2.127.227 3.036.682a7.217 7.217 0 0 1 2.354 1.826 8.353 8.353 0 0 1 1.518 2.552c.367.939.55 1.9.55 2.882a7.989 7.989 0 0 1-.572 2.992 8.203 8.203 0 0 1-1.562 2.53 7.466 7.466 0 0 1-2.398 1.738c-.909.425-1.899.638-2.97.638Zm-4.972-7.92c0 .733.117 1.445.352 2.134.235.69.565 1.305.99 1.848.44.528.968.946 1.584 1.254.616.308 1.305.462 2.068.462.792 0 1.496-.161 2.112-.484a4.558 4.558 0 0 0 1.54-1.298 6.19 6.19 0 0 0 .968-1.848c.22-.69.33-1.379.33-2.068 0-.733-.117-1.437-.352-2.112a5.37 5.37 0 0 0-.99-1.826 4.759 4.759 0 0 0-1.584-1.276c-.601-.308-1.276-.462-2.024-.462-.792 0-1.496.161-2.112.484a4.775 4.775 0 0 0-1.562 1.298 6.297 6.297 0 0 0-.99 1.826 6.63 6.63 0 0 0-.33 2.068ZM270.217 44v-9.372h-3.806v-2.134h10.054v2.134h-3.828V44h-2.42Zm7.133.11v-2.156c.367 0 .697-.088.99-.264.294-.19.55-.499.77-.924.22-.44.396-1.049.528-1.826.132-.777.22-1.767.264-2.97l.154-3.476h8.206V44h-2.42v-9.372h-3.652l-.044 1.562c-.058 1.54-.198 2.823-.418 3.85-.22 1.012-.528 1.819-.924 2.42-.381.587-.865 1.012-1.452 1.276-.572.25-1.239.374-2.002.374Zm18.985.11c-.909 0-1.723-.154-2.442-.462a5.843 5.843 0 0 1-1.87-1.32 6.076 6.076 0 0 1-1.188-1.892 6.266 6.266 0 0 1-.418-2.288c0-.807.139-1.57.418-2.288a5.756 5.756 0 0 1 1.188-1.892 5.565 5.565 0 0 1 1.87-1.298c.733-.323 1.547-.484 2.442-.484.895 0 1.701.161 2.42.484.733.308 1.357.74 1.87 1.298a5.577 5.577 0 0 1 1.21 1.892c.279.719.418 1.481.418 2.288 0 .807-.139 1.57-.418 2.288a5.875 5.875 0 0 1-1.21 1.892 5.541 5.541 0 0 1-1.87 1.32c-.719.308-1.525.462-2.42.462Zm-3.432-5.94c0 .733.154 1.393.462 1.98a3.653 3.653 0 0 0 1.232 1.386 3.095 3.095 0 0 0 1.738.506c.631 0 1.203-.169 1.716-.506a3.758 3.758 0 0 0 1.254-1.408 4.279 4.279 0 0 0 .462-1.98c0-.733-.154-1.393-.462-1.98a3.585 3.585 0 0 0-1.254-1.386 2.965 2.965 0 0 0-1.716-.528c-.645 0-1.225.176-1.738.528a3.835 3.835 0 0 0-1.232 1.408c-.308.572-.462 1.232-.462 1.98ZM303.585 44l4.136-5.94-3.806-5.566h2.706l3.124 4.576h1.078v-4.576h2.486v4.576h1.122l3.08-4.576h2.706l-3.806 5.566 4.158 5.94h-2.75l-3.388-4.818h-1.122V44h-2.486v-4.818h-1.078L306.335 44h-2.75Zm19.076 0V32.516h2.42v8.25l5.83-8.272h2.2V44h-2.42v-8.074L324.927 44h-2.266Zm16.07 0v-9.372h-3.806v-2.134h10.054v2.134h-3.828V44h-2.42Zm8.057 0V32.494h2.42v3.784h2.75c1.364 0 2.398.345 3.102 1.034.719.69 1.078 1.599 1.078 2.728 0 .763-.154 1.445-.462 2.046a3.324 3.324 0 0 1-1.364 1.408c-.587.337-1.32.506-2.2.506h-5.324Zm2.42-1.87h2.53c.484 0 .873-.088 1.166-.264.293-.19.513-.44.66-.748.147-.323.22-.667.22-1.034s-.066-.697-.198-.99a1.506 1.506 0 0 0-.66-.726c-.293-.19-.697-.286-1.21-.286h-2.508v4.048ZM366.274 44v-9.372h-3.806v-2.134h10.054v2.134h-3.828V44h-2.42Zm7.199-3.366c0-.733.206-1.371.616-1.914.426-.557 1.005-.983 1.738-1.276.734-.308 1.584-.462 2.552-.462.514 0 1.034.037 1.562.11a6.17 6.17 0 0 1 1.43.352v-.726c0-.807-.242-1.437-.726-1.892-.484-.455-1.18-.682-2.09-.682-.645 0-1.254.117-1.826.352-.572.22-1.18.535-1.826.946l-.814-1.628a9.288 9.288 0 0 1 2.288-1.144 7.953 7.953 0 0 1 2.442-.374c1.54 0 2.75.41 3.63 1.232.895.807 1.342 1.958 1.342 3.454v4.29c0 .279.044.477.132.594.103.117.272.183.506.198V44a5.319 5.319 0 0 1-1.034.11c-.513 0-.902-.125-1.166-.374a1.44 1.44 0 0 1-.462-.88l-.066-.66a4.95 4.95 0 0 1-1.914 1.496 5.658 5.658 0 0 1-2.354.528c-.762 0-1.444-.154-2.046-.462a3.658 3.658 0 0 1-1.408-1.298 3.391 3.391 0 0 1-.506-1.826Zm7.326.704c.176-.19.316-.381.418-.572.103-.19.154-.36.154-.506v-1.32a6.251 6.251 0 0 0-1.298-.352 7.046 7.046 0 0 0-1.342-.132c-.88 0-1.598.176-2.156.528-.542.352-.814.836-.814 1.452 0 .337.088.66.264.968.191.308.455.557.792.748.352.19.785.286 1.298.286.528 0 1.034-.103 1.518-.308.484-.205.873-.47 1.166-.792Zm5.004 2.772v-2.156c.367 0 .697-.088.99-.264.294-.19.55-.499.77-.924.22-.44.396-1.049.528-1.826.132-.777.22-1.767.264-2.97l.154-3.476h8.206V44h-2.42v-9.372h-3.652l-.044 1.562c-.058 1.54-.198 2.823-.418 3.85-.22 1.012-.528 1.819-.924 2.42-.381.587-.865 1.012-1.452 1.276-.572.25-1.239.374-2.002.374Zm18.985.11c-.909 0-1.723-.154-2.442-.462a5.843 5.843 0 0 1-1.87-1.32 6.076 6.076 0 0 1-1.188-1.892 6.266 6.266 0 0 1-.418-2.288c0-.807.139-1.57.418-2.288a5.756 5.756 0 0 1 1.188-1.892 5.565 5.565 0 0 1 1.87-1.298c.733-.323 1.547-.484 2.442-.484.895 0 1.701.161 2.42.484.733.308 1.357.74 1.87 1.298a5.577 5.577 0 0 1 1.21 1.892c.279.719.418 1.481.418 2.288 0 .807-.139 1.57-.418 2.288a5.875 5.875 0 0 1-1.21 1.892 5.541 5.541 0 0 1-1.87 1.32c-.719.308-1.525.462-2.42.462Zm-3.432-5.94c0 .733.154 1.393.462 1.98a3.653 3.653 0 0 0 1.232 1.386 3.095 3.095 0 0 0 1.738.506c.631 0 1.203-.169 1.716-.506a3.758 3.758 0 0 0 1.254-1.408 4.279 4.279 0 0 0 .462-1.98c0-.733-.154-1.393-.462-1.98a3.585 3.585 0 0 0-1.254-1.386 2.965 2.965 0 0 0-1.716-.528c-.645 0-1.225.176-1.738.528a3.835 3.835 0 0 0-1.232 1.408c-.308.572-.462 1.232-.462 1.98ZM412.852 44V32.494h2.42v4.576h5.346v-4.576h2.42V44h-2.42v-4.84h-5.346V44h-2.42Z"
                fill={headerTypo}
            />
            <rect x="618" y="20" width="32" height="32" rx="8" fill="#F5F4F1" />
            <path
                d="M627.867 42.492c.461.453 1.242.446 1.664.016l4.461-4.461 4.461 4.46c.438.438 1.211.438 1.656-.015.453-.46.461-1.219.016-1.664l-4.453-4.46 4.453-4.454a1.189 1.189 0 0 0-.016-1.664c-.453-.453-1.218-.453-1.656-.016l-4.461 4.461-4.461-4.46c-.422-.43-1.211-.446-1.664.015-.453.453-.437 1.234-.015 1.664l4.468 4.453-4.468 4.469c-.422.422-.438 1.21.015 1.656Z"
                fill={typoPrimary}
            />
            <rect x="24" y="96" width="626" height="196" rx="12" fill="#F5F4F1" />
            <path
                d="M56.76 127.34c0 .76-.2 1.413-.6 1.96-.387.547-.913.967-1.58 1.26-.667.293-1.4.44-2.2.44H45.6v-14.2h7.32c.667 0 1.24.18 1.72.54.493.347.867.8 1.12 1.36.267.547.4 1.12.4 1.72a3.81 3.81 0 0 1-.54 1.96 3.194 3.194 0 0 1-1.5 1.34c.813.24 1.453.68 1.92 1.32.48.627.72 1.393.72 2.3Zm-2.3-.42c0-.4-.087-.76-.26-1.08-.16-.333-.387-.6-.68-.8a1.604 1.604 0 0 0-1-.32h-4.68v4.34h4.54c.4 0 .753-.093 1.06-.28.32-.2.567-.46.74-.78.187-.333.28-.693.28-1.08Zm-6.62-8.18v4.18h4.12c.373 0 .707-.087 1-.26a2.07 2.07 0 0 0 .7-.74c.173-.32.26-.68.26-1.08 0-.413-.08-.773-.24-1.08-.16-.32-.38-.567-.66-.74a1.595 1.595 0 0 0-.94-.28h-4.24ZM58.816 131v-10.44h2.2v7.5l5.3-7.52h2V131h-2.2v-7.34l-5.24 7.34h-2.06Zm11.129 2.5v-4.44h.24c.28 0 .54-.08.78-.24.24-.16.453-.433.64-.82.187-.4.34-.947.46-1.64.12-.707.193-1.593.22-2.66l.12-3.16h7.46v8.52h1.44v4.44h-1.94V131h-7.5v2.5h-1.92Zm3.14-4.44h4.58v-6.62h-3.32l-.06 1.46c-.04 1.013-.113 1.867-.22 2.56-.093.693-.227 1.247-.4 1.66-.16.413-.353.727-.58.94Zm19.728 2.14c-.827 0-1.567-.14-2.22-.42a5.303 5.303 0 0 1-1.7-1.2 5.515 5.515 0 0 1-1.08-1.72 5.701 5.701 0 0 1-.38-2.08c0-.733.127-1.427.38-2.08a5.222 5.222 0 0 1 1.08-1.72c.48-.507 1.047-.9 1.7-1.18.667-.293 1.407-.44 2.22-.44.813 0 1.547.147 2.2.44.667.28 1.233.673 1.7 1.18.48.493.847 1.067 1.1 1.72.253.653.38 1.347.38 2.08 0 .733-.127 1.427-.38 2.08a5.341 5.341 0 0 1-1.1 1.72 5.029 5.029 0 0 1-1.7 1.2c-.653.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.467.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.697 2.697 0 0 0-1.56-.48c-.587 0-1.113.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm16.331 5.2v-3.98c-.4.187-.813.327-1.24.42-.426.08-.906.12-1.44.12-1.12 0-1.986-.293-2.6-.88-.6-.6-.9-1.487-.9-2.66v-3.48h2.2v3.2c0 .733.154 1.273.46 1.62.307.333.8.5 1.48.5.374 0 .747-.04 1.12-.12.374-.08.68-.187.92-.32v-4.88h2.22V131h-2.22Zm9.622.2c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.204 5.204 0 0 1 1.9-1.98c.813-.507 1.767-.76 2.86-.76s2.033.253 2.82.76c.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 8.296 8.296 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62.307.453.693.813 1.16 1.08.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.533-.293.893-.68 1.08-1.16l1.88.54a4.053 4.053 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.95 5.95 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4-.547 0-1.053.133-1.52.4a3.093 3.093 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm16.234 6.16c-.84 0-1.58-.2-2.22-.6-.64-.4-1.146-.92-1.52-1.56v6.22h-2.2v-14.72h1.94v1.88c.4-.627.92-1.127 1.56-1.5a4.174 4.174 0 0 1 2.14-.56c.72 0 1.38.147 1.98.44.6.28 1.12.673 1.56 1.18a5.55 5.55 0 0 1 1.02 1.74c.254.64.38 1.32.38 2.04 0 1-.2 1.913-.6 2.74a4.872 4.872 0 0 1-1.64 1.98c-.693.48-1.493.72-2.4.72Zm-.72-1.88c.467 0 .887-.1 1.26-.3.387-.2.714-.467.98-.8.28-.333.494-.713.64-1.14.147-.427.22-.867.22-1.32 0-.48-.08-.933-.24-1.36a3.24 3.24 0 0 0-.7-1.12 3.275 3.275 0 0 0-1.04-.76 2.898 2.898 0 0 0-1.28-.28c-.28 0-.573.053-.88.16a3.512 3.512 0 0 0-.86.44c-.266.187-.5.407-.7.66-.2.253-.34.52-.42.8v2.74c.187.427.434.813.74 1.16.307.333.66.607 1.06.82.4.2.807.3 1.22.3Zm12.079 1.88c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.204 5.204 0 0 1 1.9-1.98c.813-.507 1.767-.76 2.86-.76s2.033.253 2.82.76c.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 8.296 8.296 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62.307.453.693.813 1.16 1.08.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.533-.293.893-.68 1.08-1.16l1.88.54a4.053 4.053 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.95 5.95 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4-.547 0-1.053.133-1.52.4a3.093 3.093 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm9.295 8.46v-4.44h.24c.28 0 .54-.08.78-.24.24-.16.453-.433.64-.82.186-.4.34-.947.46-1.64.12-.707.193-1.593.22-2.66l.12-3.16h7.46v8.52h1.44v4.44h-1.94V131h-7.5v2.5h-1.92Zm3.14-4.44h4.58v-6.62h-3.32l-.06 1.46a23.444 23.444 0 0 1-.22 2.56c-.094.693-.227 1.247-.4 1.66-.16.413-.354.727-.58.94ZM159.48 131v-10.44h2.2v7.5l5.3-7.52h2V131h-2.2v-7.34l-5.24 7.34h-2.06Z"
                fill={typoPrimary}
            />
            <path
                d="M44 164c0-6.627 5.373-12 12-12h562c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12H56c-6.627 0-12-5.373-12-12v-32Z"
                fill="#fff"
            />
            <path
                d="M76.76 183.34c0 .76-.2 1.413-.6 1.96-.387.547-.913.967-1.58 1.26-.667.293-1.4.44-2.2.44H65.6v-14.2h7.32c.667 0 1.24.18 1.72.54.493.347.867.8 1.12 1.36.267.547.4 1.12.4 1.72a3.81 3.81 0 0 1-.54 1.96 3.194 3.194 0 0 1-1.5 1.34c.813.24 1.453.68 1.92 1.32.48.627.72 1.393.72 2.3Zm-2.3-.42c0-.4-.087-.76-.26-1.08-.16-.333-.387-.6-.68-.8a1.604 1.604 0 0 0-1-.32h-4.68v4.34h4.54c.4 0 .753-.093 1.06-.28.32-.2.567-.46.74-.78.187-.333.28-.693.28-1.08Zm-6.62-8.18v4.18h4.12c.373 0 .707-.087 1-.26a2.07 2.07 0 0 0 .7-.74c.173-.32.26-.68.26-1.08 0-.413-.08-.773-.24-1.08-.16-.32-.38-.567-.66-.74a1.595 1.595 0 0 0-.94-.28h-4.24ZM83.757 187v-10.46h2.28l3.6 6.46 3.62-6.46h2.24V187h-2.1v-7.36l-3.08 5.5h-1.38l-3.1-5.5V187h-2.08Zm19.076.2c-.827 0-1.567-.14-2.22-.42a5.3 5.3 0 0 1-1.7-1.2 5.515 5.515 0 0 1-1.08-1.72 5.703 5.703 0 0 1-.38-2.08c0-.733.126-1.427.38-2.08a5.222 5.222 0 0 1 1.08-1.72c.48-.507 1.046-.9 1.7-1.18.666-.293 1.406-.44 2.22-.44.813 0 1.546.147 2.2.44.666.28 1.233.673 1.7 1.18.48.493.846 1.067 1.099 1.72a5.69 5.69 0 0 1 .381 2.08 5.69 5.69 0 0 1-.381 2.08 5.332 5.332 0 0 1-1.099 1.72 5.037 5.037 0 0 1-1.7 1.2c-.654.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.466.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.698 2.698 0 0 0-1.56-.48c-.587 0-1.114.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm19.451 5.4c-.92 0-1.74-.193-2.46-.58a4.773 4.773 0 0 1-1.72-1.58 5.786 5.786 0 0 1-.82-2.3h-1.8V187h-2.2v-10.46h2.2v4.28h1.8c.12-.88.4-1.653.84-2.32a4.7 4.7 0 0 1 1.74-1.58c.706-.373 1.513-.56 2.42-.56 1.093 0 2.026.247 2.8.74a4.95 4.95 0 0 1 1.78 1.96c.413.813.62 1.72.62 2.72 0 1.027-.214 1.947-.64 2.76a4.77 4.77 0 0 1-1.8 1.94c-.774.48-1.694.72-2.76.72Zm0-1.88c.586 0 1.1-.147 1.54-.44.44-.307.786-.72 1.04-1.24.253-.533.38-1.153.38-1.86 0-.72-.127-1.34-.38-1.86-.254-.533-.607-.947-1.06-1.24a2.743 2.743 0 0 0-1.52-.44c-.56 0-1.06.147-1.5.44-.427.293-.76.707-1 1.24s-.36 1.153-.36 1.86c0 .72.12 1.347.36 1.88.253.533.593.947 1.02 1.24.44.28.933.42 1.48.42Zm16.813 1.88c-.827 0-1.567-.14-2.22-.42a5.307 5.307 0 0 1-1.7-1.2 5.504 5.504 0 0 1-1.08-1.72 5.71 5.71 0 0 1-.38-2.08c0-.733.127-1.427.38-2.08a5.212 5.212 0 0 1 1.08-1.72 5.06 5.06 0 0 1 1.7-1.18c.667-.293 1.407-.44 2.22-.44.813 0 1.547.147 2.2.44.667.28 1.233.673 1.7 1.18a5.06 5.06 0 0 1 1.1 1.72 5.71 5.71 0 0 1 .38 2.08 5.71 5.71 0 0 1-.38 2.08 5.335 5.335 0 0 1-1.1 1.72 5.028 5.028 0 0 1-1.7 1.2c-.653.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.467.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.698 2.698 0 0 0-1.56-.48c-.587 0-1.113.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm16.331 5.2v-3.98c-.4.187-.813.327-1.24.42-.426.08-.906.12-1.44.12-1.12 0-1.986-.293-2.6-.88-.6-.6-.9-1.487-.9-2.66v-3.48h2.2v3.2c0 .733.154 1.273.46 1.62.307.333.8.5 1.48.5.374 0 .747-.04 1.12-.12.374-.08.68-.187.92-.32v-4.88h2.22V187h-2.22Zm9.622.2c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.204 5.204 0 0 1 1.9-1.98c.813-.507 1.767-.76 2.86-.76s2.033.253 2.82.76c.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 8.296 8.296 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62.307.453.693.813 1.16 1.08.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.533-.293.893-.68 1.08-1.16l1.88.54a4.053 4.053 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.95 5.95 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4-.547 0-1.053.133-1.52.4a3.093 3.093 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm16.235 6.16c-.84 0-1.58-.2-2.22-.6-.64-.4-1.147-.92-1.52-1.56v6.22h-2.2v-14.72h1.94v1.88c.4-.627.92-1.127 1.56-1.5a4.171 4.171 0 0 1 2.14-.56c.72 0 1.38.147 1.98.44.6.28 1.12.673 1.56 1.18a5.55 5.55 0 0 1 1.02 1.74c.253.64.38 1.32.38 2.04 0 1-.2 1.913-.6 2.74-.387.827-.934 1.487-1.64 1.98-.694.48-1.494.72-2.4.72Zm-.72-1.88c.466 0 .886-.1 1.26-.3.386-.2.713-.467.98-.8.28-.333.493-.713.64-1.14.146-.427.22-.867.22-1.32 0-.48-.08-.933-.24-1.36-.16-.427-.394-.8-.7-1.12a3.287 3.287 0 0 0-1.04-.76 2.904 2.904 0 0 0-1.28-.28c-.28 0-.574.053-.88.16a3.477 3.477 0 0 0-.86.44 3.3 3.3 0 0 0-.7.66c-.2.253-.34.52-.42.8v2.74c.186.427.433.813.74 1.16.306.333.66.607 1.06.82.4.2.806.3 1.22.3Zm12.078 1.88c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.204 5.204 0 0 1 1.9-1.98c.813-.507 1.767-.76 2.86-.76s2.033.253 2.82.76c.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 8.296 8.296 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62.307.453.693.813 1.16 1.08.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.533-.293.893-.68 1.08-1.16l1.88.54a4.053 4.053 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.95 5.95 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4-.547 0-1.053.133-1.52.4a3.093 3.093 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm9.295 8.46v-4.44h.24c.28 0 .54-.08.78-.24.24-.16.453-.433.64-.82.186-.4.34-.947.46-1.64.12-.707.193-1.593.22-2.66l.12-3.16h7.46v8.52h1.44v4.44h-1.94V187h-7.5v2.5h-1.92Zm3.14-4.44h4.58v-6.62h-3.32l-.06 1.46a23.444 23.444 0 0 1-.22 2.56c-.094.693-.227 1.247-.4 1.66-.16.413-.354.727-.58.94Zm10.086 1.94v-10.46h2.2v3.44h2.5c1.24 0 2.18.313 2.82.94.654.627.98 1.453.98 2.48 0 .693-.14 1.313-.42 1.86-.28.547-.693.973-1.24 1.28-.533.307-1.2.46-2 .46h-4.84Zm2.2-1.7h2.3c.44 0 .794-.08 1.06-.24.267-.173.467-.4.6-.68.134-.293.2-.607.2-.94 0-.333-.06-.633-.18-.9-.12-.28-.32-.5-.6-.66-.266-.173-.633-.26-1.1-.26h-2.28v3.68Z"
                fill={typoPrimary}
            />
            <rect x="590" y="170" width="20" height="20" rx="10" fill={typoPrimary} />
            <path
                d="M598.811 185.084c.398 0 .709-.152.919-.475l5.461-8.349c.153-.235.217-.451.217-.656 0-.551-.41-.95-.972-.95-.387 0-.627.141-.862.51l-4.793 7.559-2.431-3.018c-.217-.258-.452-.375-.78-.375-.568 0-.978.404-.978.955 0 .246.076.463.287.703l3.023 3.662c.252.299.534.434.909.434ZM44 228c0-6.627 5.373-12 12-12h562c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12H56c-6.627 0-12-5.373-12-12v-32Z"
                fill="#fff"
            />
            <path
                d="M76.76 247.34c0 .76-.2 1.413-.6 1.96-.387.547-.913.967-1.58 1.26-.667.293-1.4.44-2.2.44H65.6v-14.2h7.32c.667 0 1.24.18 1.72.54.493.347.867.8 1.12 1.36.267.547.4 1.12.4 1.72a3.81 3.81 0 0 1-.54 1.96 3.194 3.194 0 0 1-1.5 1.34c.813.24 1.453.68 1.92 1.32.48.627.72 1.393.72 2.3Zm-2.3-.42c0-.4-.087-.76-.26-1.08-.16-.333-.387-.6-.68-.8a1.604 1.604 0 0 0-1-.32h-4.68v4.34h4.54c.4 0 .753-.093 1.06-.28.32-.2.567-.46.74-.78.187-.333.28-.693.28-1.08Zm-6.62-8.18v4.18h4.12c.373 0 .707-.087 1-.26a2.07 2.07 0 0 0 .7-.74c.173-.32.26-.68.26-1.08 0-.413-.08-.773-.24-1.08-.16-.32-.38-.567-.66-.74a1.595 1.595 0 0 0-.94-.28h-4.24Zm20.617 12.46c-.826 0-1.566-.14-2.22-.42a5.304 5.304 0 0 1-1.7-1.2 5.515 5.515 0 0 1-1.08-1.72 5.703 5.703 0 0 1-.38-2.08c0-.733.127-1.427.38-2.08a5.222 5.222 0 0 1 1.08-1.72c.48-.507 1.047-.9 1.7-1.18.667-.293 1.407-.44 2.22-.44.814 0 1.547.147 2.2.44.667.28 1.234.673 1.7 1.18.48.493.847 1.067 1.1 1.72.254.653.38 1.347.38 2.08 0 .733-.126 1.427-.38 2.08a5.34 5.34 0 0 1-1.1 1.72 5.028 5.028 0 0 1-1.7 1.2c-.653.28-1.386.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.654.953 1.12 1.26.467.307.994.46 1.58.46.574 0 1.094-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.697 2.697 0 0 0-1.56-.48c-.586 0-1.113.16-1.58.48-.466.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm15.512 5.4c-1.747 0-3.074-.527-3.98-1.58-.907-1.053-1.36-2.56-1.36-4.52 0-1.28.106-2.36.32-3.24.226-.893.553-1.627.98-2.2a5.29 5.29 0 0 1 1.62-1.4 9.43 9.43 0 0 1 2.26-.9l4.46-1.24.08 1.84-4.38 1.24c-.694.213-1.287.493-1.78.84-.48.347-.86.8-1.14 1.36-.28.547-.467 1.24-.56 2.08a4.018 4.018 0 0 1 1.6-1.6c.693-.387 1.513-.58 2.46-.58.973 0 1.813.207 2.52.62.706.4 1.253.96 1.64 1.68.386.72.58 1.547.58 2.48 0 1.013-.207 1.907-.62 2.68-.4.76-1 1.36-1.8 1.8-.787.427-1.754.64-2.9.64Zm0-1.88c.973 0 1.726-.287 2.26-.86.546-.573.82-1.333.82-2.28 0-.907-.274-1.647-.82-2.22-.534-.587-1.287-.88-2.26-.88-.574 0-1.094.127-1.56.38a2.63 2.63 0 0 0-1.1 1.06c-.267.453-.4 1.007-.4 1.66 0 .613.12 1.16.36 1.64.24.467.586.833 1.04 1.1.453.267 1.006.4 1.66.4Zm20.903 4.18V251h-13.6v-10.46h2.2v8.52h3.74v-8.52h2.22v8.52h3.72v-8.52h2.2v8.52h1.46v4.44h-1.94Zm5.222 1.94c-.24 0-.493-.033-.76-.1a5.03 5.03 0 0 1-.84-.3l.56-1.64c.16.08.314.14.46.18.147.04.28.06.4.06.334 0 .634-.14.9-.42.28-.267.527-.673.74-1.22l.4-1.08-4.42-10.38h2.3l3.2 8.22 2.84-8.22h2.12l-4.6 12.06c-.226.627-.513 1.147-.86 1.56a3.506 3.506 0 0 1-1.12.94c-.413.227-.853.34-1.32.34Zm18.518-4.24c-.92 0-1.74-.193-2.46-.58a4.773 4.773 0 0 1-1.72-1.58 5.786 5.786 0 0 1-.82-2.3h-1.8V251h-2.2v-10.46h2.2v4.28h1.8c.12-.88.4-1.653.84-2.32a4.7 4.7 0 0 1 1.74-1.58c.707-.373 1.513-.56 2.42-.56 1.093 0 2.027.247 2.8.74a4.942 4.942 0 0 1 1.78 1.96c.413.813.62 1.72.62 2.72 0 1.027-.213 1.947-.64 2.76a4.757 4.757 0 0 1-1.8 1.94c-.773.48-1.693.72-2.76.72Zm0-1.88c.587 0 1.1-.147 1.54-.44.44-.307.787-.72 1.04-1.24.253-.533.38-1.153.38-1.86 0-.72-.127-1.34-.38-1.86a2.936 2.936 0 0 0-1.06-1.24 2.74 2.74 0 0 0-1.52-.44c-.56 0-1.06.147-1.5.44-.427.293-.76.707-1 1.24s-.36 1.153-.36 1.86c0 .72.12 1.347.36 1.88.253.533.593.947 1.02 1.24.44.28.933.42 1.48.42Zm16.813 1.88c-.827 0-1.567-.14-2.22-.42a5.307 5.307 0 0 1-1.7-1.2 5.504 5.504 0 0 1-1.08-1.72 5.71 5.71 0 0 1-.38-2.08c0-.733.127-1.427.38-2.08a5.212 5.212 0 0 1 1.08-1.72 5.06 5.06 0 0 1 1.7-1.18c.667-.293 1.407-.44 2.22-.44.813 0 1.547.147 2.2.44.667.28 1.233.673 1.7 1.18a5.06 5.06 0 0 1 1.1 1.72 5.71 5.71 0 0 1 .38 2.08 5.71 5.71 0 0 1-.38 2.08 5.335 5.335 0 0 1-1.1 1.72 5.028 5.028 0 0 1-1.7 1.2c-.653.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.467.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.698 2.698 0 0 0-1.56-.48c-.587 0-1.113.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm16.331 5.2v-3.98c-.4.187-.813.327-1.24.42-.426.08-.906.12-1.44.12-1.12 0-1.986-.293-2.6-.88-.6-.6-.9-1.487-.9-2.66v-3.48h2.2v3.2c0 .733.154 1.273.46 1.62.307.333.8.5 1.48.5.374 0 .747-.04 1.12-.12.374-.08.68-.187.92-.32v-4.88h2.22V251h-2.22Zm9.622.2c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.204 5.204 0 0 1 1.9-1.98c.813-.507 1.767-.76 2.86-.76s2.033.253 2.82.76c.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 8.296 8.296 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62.307.453.693.813 1.16 1.08.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.533-.293.893-.68 1.08-1.16l1.88.54a4.053 4.053 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.95 5.95 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4-.547 0-1.053.133-1.52.4a3.093 3.093 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm16.235 6.16c-.84 0-1.58-.2-2.22-.6-.64-.4-1.147-.92-1.52-1.56v6.22h-2.2v-14.72h1.94v1.88c.4-.627.92-1.127 1.56-1.5a4.171 4.171 0 0 1 2.14-.56c.72 0 1.38.147 1.98.44.6.28 1.12.673 1.56 1.18a5.55 5.55 0 0 1 1.02 1.74c.253.64.38 1.32.38 2.04 0 1-.2 1.913-.6 2.74-.387.827-.934 1.487-1.64 1.98-.694.48-1.494.72-2.4.72Zm-.72-1.88c.466 0 .886-.1 1.26-.3.386-.2.713-.467.98-.8.28-.333.493-.713.64-1.14.146-.427.22-.867.22-1.32 0-.48-.08-.933-.24-1.36-.16-.427-.394-.8-.7-1.12a3.287 3.287 0 0 0-1.04-.76 2.904 2.904 0 0 0-1.28-.28c-.28 0-.574.053-.88.16a3.477 3.477 0 0 0-.86.44 3.3 3.3 0 0 0-.7.66c-.2.253-.34.52-.42.8v2.74c.186.427.433.813.74 1.16.306.333.66.607 1.06.82.4.2.806.3 1.22.3Zm12.078 1.88c-.813 0-1.553-.14-2.22-.42a5.477 5.477 0 0 1-1.7-1.18 5.64 5.64 0 0 1-1.12-1.72 5.71 5.71 0 0 1-.38-2.08c0-.987.227-1.887.68-2.7a5.212 5.212 0 0 1 1.9-1.98c.814-.507 1.767-.76 2.86-.76 1.094 0 2.034.253 2.82.76.8.493 1.42 1.147 1.86 1.96a5.422 5.422 0 0 1 .64 3.08 6.843 6.843 0 0 1-.04.34h-8.38c.04.613.207 1.153.5 1.62a3.47 3.47 0 0 0 1.16 1.08c.467.253.967.38 1.5.38.587 0 1.14-.147 1.66-.44.534-.293.894-.68 1.08-1.16l1.88.54a4.04 4.04 0 0 1-1.04 1.38c-.453.4-.993.72-1.62.96a5.941 5.941 0 0 1-2.04.34Zm-3.14-6.16h6.32c-.04-.6-.213-1.127-.52-1.58a3.04 3.04 0 0 0-1.14-1.08c-.453-.267-.96-.4-1.52-.4a3.01 3.01 0 0 0-1.52.4 3.1 3.1 0 0 0-1.12 1.08c-.293.453-.46.98-.5 1.58Zm9.295 8.46v-4.44h.24c.28 0 .54-.08.78-.24.24-.16.453-.433.64-.82.186-.4.34-.947.46-1.64.12-.707.193-1.593.22-2.66l.12-3.16h7.46v8.52h1.44v4.44h-1.94V251h-7.5v2.5h-1.92Zm3.14-4.44h4.58v-6.62h-3.32l-.06 1.46a23.444 23.444 0 0 1-.22 2.56c-.094.693-.227 1.247-.4 1.66-.16.413-.354.727-.58.94Zm10.086 1.94v-10.46h2.2v3.44h2.5c1.24 0 2.18.313 2.82.94.654.627.98 1.453.98 2.48 0 .693-.14 1.313-.42 1.86-.28.547-.693.973-1.24 1.28-.533.307-1.2.46-2 .46h-4.84Zm2.2-1.7h2.3c.44 0 .794-.08 1.06-.24.267-.173.467-.4.6-.68.134-.293.2-.607.2-.94 0-.333-.06-.633-.18-.9-.12-.28-.32-.5-.6-.66-.266-.173-.633-.26-1.1-.26h-2.28v3.68Z"
                fill={typoPrimary}
            />
            <rect
                x="591"
                y="235"
                width="18"
                height="18"
                rx="9"
                stroke={typoPrimary}
                strokeWidth="2"
            />
            <path
                d="M24 352c0-6.627 5.373-12 12-12h602c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12v-32Z"
                fill={controlBgPrimary}
            />
            <path
                d="M276.696 375v-14.2h11.22V375h-2.26v-12.22h-6.72V375h-2.24Zm20.093.2c-.84 0-1.58-.2-2.22-.6-.64-.4-1.146-.92-1.52-1.56v6.22h-2.2v-14.72h1.94v1.88c.4-.627.92-1.127 1.56-1.5a4.174 4.174 0 0 1 2.14-.56c.72 0 1.38.147 1.98.44.6.28 1.12.673 1.56 1.18a5.55 5.55 0 0 1 1.02 1.74c.254.64.38 1.32.38 2.04 0 1-.2 1.913-.6 2.74a4.872 4.872 0 0 1-1.64 1.98c-.693.48-1.493.72-2.4.72Zm-.72-1.88c.467 0 .887-.1 1.26-.3.387-.2.714-.467.98-.8.28-.333.494-.713.64-1.14.147-.427.22-.867.22-1.32 0-.48-.08-.933-.24-1.36a3.24 3.24 0 0 0-.7-1.12 3.275 3.275 0 0 0-1.04-.76 2.898 2.898 0 0 0-1.28-.28c-.28 0-.573.053-.88.16a3.512 3.512 0 0 0-.86.44c-.266.187-.5.407-.7.66-.2.253-.34.52-.42.8v2.74c.187.427.434.813.74 1.16.307.333.66.607 1.06.82.4.2.807.3 1.22.3Zm12.039 1.88c-.827 0-1.567-.14-2.22-.42a5.307 5.307 0 0 1-1.7-1.2 5.504 5.504 0 0 1-1.08-1.72 5.71 5.71 0 0 1-.38-2.08c0-.733.127-1.427.38-2.08a5.212 5.212 0 0 1 1.08-1.72 5.06 5.06 0 0 1 1.7-1.18c.667-.293 1.407-.44 2.22-.44.813 0 1.547.147 2.2.44.667.28 1.233.673 1.7 1.18a5.06 5.06 0 0 1 1.1 1.72 5.71 5.71 0 0 1 .38 2.08 5.71 5.71 0 0 1-.38 2.08 5.335 5.335 0 0 1-1.1 1.72 5.028 5.028 0 0 1-1.7 1.2c-.653.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.467.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.698 2.698 0 0 0-1.56-.48c-.587 0-1.113.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm9.451 7.7v-4.44h.24c.28 0 .54-.08.78-.24.24-.16.453-.433.64-.82.187-.4.34-.947.46-1.64.12-.707.193-1.593.22-2.66l.12-3.16h7.46v8.52h1.44v4.44h-1.94V375h-7.5v2.5h-1.92Zm3.14-4.44h4.58v-6.62h-3.32l-.06 1.46c-.04 1.013-.113 1.867-.22 2.56-.093.693-.227 1.247-.4 1.66-.16.413-.353.727-.58.94Zm14.787 2.14c-.827 0-1.567-.14-2.22-.42a5.297 5.297 0 0 1-1.7-1.2 5.504 5.504 0 0 1-1.08-1.72 5.689 5.689 0 0 1-.38-2.08c0-.733.126-1.427.38-2.08a5.212 5.212 0 0 1 1.08-1.72 5.05 5.05 0 0 1 1.7-1.18c.666-.293 1.406-.44 2.22-.44.813 0 1.546.147 2.2.44.666.28 1.233.673 1.7 1.18.48.493.846 1.067 1.1 1.72a5.71 5.71 0 0 1 .38 2.08 5.71 5.71 0 0 1-.38 2.08 5.351 5.351 0 0 1-1.1 1.72 5.037 5.037 0 0 1-1.7 1.2c-.654.28-1.387.42-2.2.42Zm-3.12-5.4c0 .667.14 1.267.42 1.8.28.533.653.953 1.12 1.26.466.307.993.46 1.58.46.573 0 1.093-.153 1.56-.46.48-.32.86-.747 1.14-1.28.28-.547.42-1.147.42-1.8 0-.667-.14-1.267-.42-1.8a3.264 3.264 0 0 0-1.14-1.26 2.698 2.698 0 0 0-1.56-.48c-.587 0-1.114.16-1.58.48-.467.32-.84.747-1.12 1.28-.28.52-.42 1.12-.42 1.8Zm9.611 5.3v-1.96c.333 0 .633-.08.9-.24.267-.173.5-.453.7-.84.2-.4.36-.953.48-1.66s.2-1.607.24-2.7l.14-3.16h7.46V375h-2.2v-8.52h-3.32l-.04 1.42c-.053 1.4-.18 2.567-.38 3.5-.2.92-.48 1.653-.84 2.2-.347.533-.787.92-1.32 1.16-.52.227-1.127.34-1.82.34Zm11.819-.1 3.76-5.4-3.46-5.06h2.46l2.84 4.16h.98v-4.16h2.26v4.16h1.02l2.8-4.16h2.46l-3.46 5.06 3.78 5.4h-2.5l-3.08-4.38h-1.02V375h-2.26v-4.38h-.98l-3.1 4.38h-2.5Zm17.341 0v-10.44h2.2v7.5l5.3-7.52h2V375h-2.2v-7.34l-5.24 7.34h-2.06Zm14.609 0v-8.52h-3.46v-1.94h9.14v1.94h-3.48V375h-2.2Zm7.325 0v-10.46h2.2v3.44h2.5c1.24 0 2.18.313 2.82.94.653.627.98 1.453.98 2.48 0 .693-.14 1.313-.42 1.86-.28.547-.693.973-1.24 1.28-.533.307-1.2.46-2 .46h-4.84Zm2.2-1.7h2.3c.44 0 .793-.08 1.06-.24.267-.173.467-.4.6-.68.133-.293.2-.607.2-.94 0-.333-.06-.633-.18-.9-.12-.28-.32-.5-.6-.66-.267-.173-.633-.26-1.1-.26h-2.28v3.68Z"
                fill={controlTypoPrimary}
            />
        </svg>
    )
}

export default ModalImage
