
import feather from "feather-icons"
import type { CSSProperties } from "react"

const FeatherIcon = ({
    icon = "",
    fIconColor = "currentColor",
    iconFillColor = "none",
    iconStrokeColor = "currentColor",
    iconStrokeWidth = 2,
    iconWidth = 24,
    iconHeight = 24,
    iconStyle = "",
    className = "",
    parentClass = "",
    parentStyles = {},
}: {
    icon: string
    fIconColor?: string
    iconFillColor?: string
    iconStrokeColor?: string
    iconStrokeWidth?: number
    iconWidth?: number
    iconHeight?: number
    iconStyle?: string
    className?: string
    parentClass?: string
    parentStyles?: CSSProperties
}) => {
    switch (icon) {

        default:
            return (
                <>
                    {feather.icons[icon as keyof typeof feather.icons] ? (
                        <div className={parentClass} style={parentStyles}
                            dangerouslySetInnerHTML={{
                                __html: feather.icons[icon as keyof typeof feather.icons].toSvg({
                                    class: className,
                                    color: fIconColor,
                                    width: iconWidth,
                                    height: iconHeight,
                                    stroke: iconStrokeColor,
                                    fill: iconFillColor,
                                    style: `${iconStyle};background-color:transparent;`,
                                    strokeWidth: iconStrokeWidth,
                                })
                            }}
                        />
                    ) : null}
                </>
            )
    }
}

export default FeatherIcon
