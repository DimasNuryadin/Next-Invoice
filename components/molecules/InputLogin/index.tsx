import Image from "next/image";

interface InputLoginProps {
  pic: 'email' | 'key';
  type: 'email' | 'password';
  placeholder: string;
}

export default function InputLogin(props: InputLoginProps) {
  const { pic, type, placeholder } = props;
  return (
    <div className="input-login row">
      <Image className="image-login col" src={`/icon/${pic}.svg`} width={24} height={24} alt="mail" />
      <div className="col">
        <input type={type} placeholder={placeholder} required />
      </div>
    </div>
  )
}
