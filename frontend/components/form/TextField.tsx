type TextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
};

export default function TextField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}: TextFieldProps) {
    return (
    <div>
        <label
            className="
                mb-2
                block
                text-sm
                font-medium
                text-zinc-700
                dark:text-zinc-300
            "
        >
            {label}
        </label>

        <input
            type={type}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="
                w-full
                rounded-xl
                border
                border-zinc-300
                bg-white
                px-4
                py-3
                text-zinc-900
                transition-colors
                placeholder:text-zinc-400
                focus:border-teal-500
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500/20
                dark:border-zinc-700
                dark:bg-zinc-900
                dark:text-zinc-100
                dark:placeholder:text-zinc-500
            "
        />
    </div>
);
}
