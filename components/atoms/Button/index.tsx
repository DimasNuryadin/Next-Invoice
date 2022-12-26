import Image from "next/image";

interface TypeButton {
  buttonType: 'btn-primary' | 'btn-secondary' | 'btn-tertiary' | 'btn-quarternary' | 'btn-inactive';
  label: string;
  icon?: 'pen' | 'people';
  active?: boolean;
}
export default function Button(props: Partial<TypeButton>) {
  const { buttonType, label, icon, active } = props;

  if (icon && active) {
    return (
      <div>
        <button className={`button-icon ${buttonType}`}>
          <Image src={`/icon/${icon}-light.svg`} width={24} height={24} alt={icon} style={{ marginTop: -4 }} /> {label}</button>
      </div>
    )
  }

  if (icon && !active) {
    return (
      <div>
        <button className={`button-icon ${buttonType}`}>
          <Image src={`/icon/${icon}-dark.svg`} width={24} height={24} alt={icon} style={{ marginTop: -4 }} /> {label}</button>
      </div>
    )
  }

  return (
    <div>
      <button className={`button ${buttonType}`}>{label}</button>
    </div>
  )
}
