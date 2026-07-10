import React from 'react';
import { ListItemProps } from '../interfaces.js';
declare function ListItem({ ref, locale, listType, file, items, itemRender, isImgUrl, showRemoveIcon, showPreviewIcon, showDownloadIcon, onClose, onPreview, onDownload, dragListeners, showDragHandle, }: ListItemProps & {
    ref?: React.Ref<HTMLDivElement>;
}): import("react/jsx-runtime").JSX.Element;
export default ListItem;
