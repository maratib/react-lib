type Props = {
  // name?: string;
  children?: React.ReactNode
};

const MyButton = ({ children }: Props) => {
  return (
    <div>
      <h1>MyButton</h1>
      <h2>{children}</h2>
    </div>
  );
};

export default MyButton;