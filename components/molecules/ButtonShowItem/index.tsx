import Image from "next/image";

interface ButtonShowItemProps {
  label: string;
}

export default function ButtonShowItem(props: ButtonShowItemProps) {
  const { label } = props;
  return (
    <>
      <button className="btn-show-item">
        <Image src="/icon/plus-green.svg" width={11} height={11} alt="Plus Green" style={{ marginTop: -2 }} /> {label}
      </button>
    </>
  )
}
