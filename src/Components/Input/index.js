export const Input = ({
  type,
  name,
  value,
  inputId,
  defaultValue,
  label,
  onChange,
  helperText,
  error,
}) => {
  return (
    <div>
      {label && (
        <label className="black text-sm text-gray-600 font-bold mb-2">
          {label}
        </label>
      )}
      {helperText && (
        <label className="black text-sm text-gray-600">{helperText}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        id={inputId}
        onChange={onChange}
        defaultValue={defaultValue}
        className={
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        }
      />
      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};
