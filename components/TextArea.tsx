type InputType = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  error?: any;
};

const TextArea: React.FC<InputType> = ({
  inputRegister,
  label,
  htmlFor,
  error,
}) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base font-light" htmlFor={htmlFor}>
        {label} <span className="text-red-400">*</span>
      </label>
      <textarea
        {...inputRegister}
        className="p-3 text-sm border-[1px] border-gray-400 border-solid min-h-[150px] resize-none overflow-y-auto focus:border-[#272829] focus:transition focus:outline-none"
      />
      {error}
    </section>
  );
};

export default TextArea;
