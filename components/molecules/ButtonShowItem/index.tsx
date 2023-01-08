import Image from "next/image";

interface ButtonShowItemProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonShowItem(props: ButtonShowItemProps) {
  const { label, onClick } = props;
  return (
    <>
      <button className="btn-show-item ps-3" onClick={onClick}>
        <Image src="/icon/plus-green.svg" width={11} height={11} alt="Plus Green" style={{ marginTop: -2 }} /> {label}
      </button>
    </>
  )
}
