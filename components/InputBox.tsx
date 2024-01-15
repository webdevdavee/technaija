type InputType = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  inputType: string;
  error?: any;
};

const InputBox = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
}: InputType) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base font-light" htmlFor={htmlFor}>
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        {...inputRegister}
        className="p-3 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
        type={inputType}
        id={htmlFor}
      />
      {error}
    </section>
  );
};

export default InputBox;
