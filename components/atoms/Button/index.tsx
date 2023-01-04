import Image from "next/image";

interface TypeButton {
  buttonType: 'btn-primary' | 'btn-secondary' | 'btn-tertiary' | 'btn-quaternary' | 'btn-inactive';
  label: string;
  icon?: 'pen' | 'people' | 'plus';
  active?: boolean;
  size?: 'medium' | 'large'
}
export default function Button(props: Partial<TypeButton>) {
  const { buttonType, label, icon, active, size } = props;
  let sizeIcon = 0;
  if (size === 'large') {
    sizeIcon = 24
  } else if (size === 'medium') {
    sizeIcon = 16
  }

  if (icon && active) {
    return (
      <div>
        <button className={`button-icon ${buttonType}`}>
          <Image src={`/icon/${icon}-light.svg`} width={sizeIcon} height={sizeIcon} alt={icon} style={{ marginTop: -4 }} /> {label}</button>
      </div>
    )
  }

  if (icon && !active) {
    return (
      <div>
        <button className={`button-icon ${buttonType}`}>
          <Image src={`/icon/${icon}-dark.svg`} width={sizeIcon} height={sizeIcon} alt={icon} style={{ marginTop: -4 }} /> {label}</button>
      </div>
    )
  }

  return (
    <div>
      <button className={`button ${buttonType}`}>{label}</button>
    </div>
  )
}
