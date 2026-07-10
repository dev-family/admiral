import OriginTypography from './Typography.js';
import Text from './Text.js';
import Title from './Title.js';
import Paragraph from './Paragraph.js';
export type TypographyProps = typeof OriginTypography & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
};
export declare const Typography: TypographyProps;
