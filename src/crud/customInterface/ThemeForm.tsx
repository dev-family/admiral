import React from 'react'
import { FilePictureInput, TextInput, Typography, Spin, useForm } from '../../../admiral'
import { BaseImage, HeaderImage, ModalImage } from './images'
import Color from './Color'
import useImageUrl from './useImageUrl'
import styles from './Theme.module.scss'

const { Title, Text } = Typography

export default function ThemeForm() {
    const { values, isFetching } = useForm()
    const logo = values['logo'] as unknown as Blob
    const logoURL = useImageUrl(logo)

    return (
        <Spin spinning={isFetching}>
            <div className={styles.block}>
                <Title level={2}>Базовые цвета</Title>

                <div className={styles.settings}>
                    <div>
                        <Color title="Основной" name="color_typo_primary" />
                        <Color title="Второстепенный" name="color_typo_secondary" />
                        <Color title="Акцентный" name="color_typo_alert" />
                        <Color title="Цвет кнопок" name="color_control_bg_system" />
                        <Color title="Цвет текста кнопок" name="color_control_typo_system" />
                    </div>

                    <div className={styles.image}>
                        <div className={styles.imageStickyContent}>
                            <BaseImage
                                typoPrimary={values['color_typo_primary']}
                                typoSecondary={values['color_typo_secondary']}
                                typoAlert={values['color_typo_alert']}
                                controlBgSystem={values['color_control_bg_system']}
                                controlTypoSystem={values['color_control_typo_system']}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <Title level={2}>Настройка компонентов</Title>
                <div className={styles.childBlock}>
                    <Title level={3}>Шапка</Title>
                    <div className={styles.settings}>
                        <div>
                            <div className={styles.container}>
                                <Text strong className={styles.label}>
                                    Загрузите логотип:
                                </Text>
                                <FilePictureInput name="logo" accept="image/*" maxCount={1} />
                                <TextInput name="logo_text" placeholder="И/или введите текст" />
                            </div>

                            <Color title="Цвет логотипа" name="color_logo" />
                            <Color title="Цвет шапки" name="color_header" />
                            <Color title="Цвет кнопок" name="color_header_control_bg" />
                            <Color title="Цвет текста кнопок" name="color_header_control_typo" />
                        </div>

                        <div className={styles.image}>
                            <div className={styles.imageStickyContent}>
                                <div className={styles.contentImage}>
                                    <div
                                        className={styles.contentImage_Logo}
                                        style={{
                                            backgroundImage: `url("${logoURL}")`,
                                        }}
                                    />

                                    <HeaderImage
                                        hideLogo={!!logoURL}
                                        logo={values['color_logo']}
                                        bg={values['color_header']}
                                        controlBg={values['color_header_control_bg']}
                                        controlTypo={values['color_header_control_typo']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.childBlock}>
                    <Title level={3}>Всплывающие окна</Title>
                    <div className={styles.settings}>
                        <div>
                            <Color title="Цвет шапки" name="color_modal_header_bg" />
                            <Color title="Цвет текста шапки" name="color_modal_header_typo" />
                            <Color title="Цвет кнопок" name="color_control_bg_primary" />
                            <Color title="Цвет текста кнопок" name="color_control_typo_primary" />
                        </div>

                        <div className={styles.image}>
                            <div className={styles.imageStickyContent}>
                                <ModalImage
                                    headerTypo={values['color_modal_header_typo']}
                                    headerBg={values['color_modal_header_bg']}
                                    typoPrimary={values['color_typo_primary']}
                                    controlTypoPrimary={values['color_control_typo_primary']}
                                    controlBgPrimary={values['color_control_bg_primary']}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}
