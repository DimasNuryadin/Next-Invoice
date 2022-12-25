interface TypeButton {
  buttonType: 'btn-primary' | 'btn-secondary' | 'btn-tertiary' | 'btn-quarternary';
}
export default function Button(props: TypeButton) {
  const { buttonType } = props;

  return (
    <div>
      <button className={`button ${buttonType}`}>Submit</button>
    </div>
  )
}
