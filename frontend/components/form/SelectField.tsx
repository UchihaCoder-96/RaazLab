type SelectOption<T extends string> = {
    label: string;
    value: T;
};

type SelectFieldProps<T extends string> = {
    label: string;
    value: T;
    options: readonly (T | SelectOption<T>)[];
    onChange: (value: T) => void;
};

export default function SelectField<T extends string>({
    label,
    value,
    options,
    onChange,
}: SelectFieldProps<T>) {
    return (
        <div>
            <label className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-700
            dark:text-zinc-300
        ">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
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
                focus:border-teal-500
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500/20
                dark:border-zinc-700
                dark:bg-zinc-900
                dark:text-zinc-100
            "
            >
                {options.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        );
                    }

                    return (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
