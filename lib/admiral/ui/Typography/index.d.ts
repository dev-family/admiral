import OriginTypography from './Typography';
import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';
export declare type TypographyProps = typeof OriginTypography & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
};
export declare const Typography: TypographyProps;
