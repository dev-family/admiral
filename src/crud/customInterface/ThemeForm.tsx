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
                <Title level={2}>Basic colors</Title>

                <div className={styles.settings}>
                    <div>
                        <Color title="Main" name="color_typo_primary" />
                        <Color title="Secondary" name="color_typo_secondary" />
                        <Color title="Accent" name="color_typo_alert" />
                        <Color title="Button color" name="color_control_bg_system" />
                        <Color title="Button text color" name="color_control_typo_system" />
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
                <Title level={2}>Configuring Components</Title>
                <div className={styles.childBlock}>
                    <Title level={3}>Header</Title>
                    <div className={styles.settings}>
                        <div>
                            <div className={styles.container}>
                                <Text strong className={styles.label}>
                                    Upload the logo:
                                </Text>
                                <FilePictureInput name="logo" accept="image/*" maxCount={1} />
                            </div>

                            <Color title="Logo color" name="color_logo" />
                            <Color title="Header color" name="color_header" />
                            <Color title="Button color" name="color_header_control_bg" />
                            <Color title="Button text color" name="color_header_control_typo" />
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
                    <Title level={3}>Modals</Title>
                    <div className={styles.settings}>
                        <div>
                            <Color title="Header color" name="color_modal_header_bg" />
                            <Color title="Header text color" name="color_modal_header_typo" />
                            <Color title="Button color" name="color_control_bg_primary" />
                            <Color title="Button text color" name="color_control_typo_primary" />
                        </div>

                        <div className={styles.image}>
                            <div className={styles.imageStickyContent}>
                                <ModalImage
                                    headerTypo={values['color_modal_header_typo']}
                                    headerBg={values['color_modal_header_bg']}
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
