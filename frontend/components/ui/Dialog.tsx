"use client";

type DialogProps = {
    open: boolean;
    title: string;
    message: string;
    buttonText?: string;
    onClose: () => void;
};

export default function Dialog({
    open,
    title,
    message,
    buttonText = "OK",
    onClose,
}: DialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-5
                backdrop-blur-sm
                dark:bg-black/60
            "
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="
                    w-full
                    max-w-md
                    border
                    border-zinc-200
                    bg-white
                    p-6
                    shadow-2xl
                    dark:border-zinc-800
                    dark:bg-zinc-900
                    sm:p-7
                "
            >
                {/* Header */}
                <div className="flex items-start gap-3">

                    <div className="
                        mt-1
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-teal-500
                    " />

                    <div>
                        <h2
                            id="dialog-title"
                            className="
                                text-xl
                                font-semibold
                                text-zinc-950
                                dark:text-zinc-100
                            "
                        >
                            {title}
                        </h2>

                        <p className="
                            mt-3
                            leading-7
                            text-zinc-600
                            dark:text-zinc-400
                        ">
                            {message}
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="
                    mt-7
                    flex
                    justify-end
                    border-t
                    border-zinc-200
                    pt-5
                    dark:border-zinc-800
                ">
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            min-w-20
                            border
                            border-teal-500
                            bg-teal-500
                            px-5
                            py-2.5
                            font-medium
                            text-zinc-950
                            transition-colors
                            hover:bg-teal-400
                            focus:outline-none
                            focus:ring-2
                            focus:ring-teal-500
                            focus:ring-offset-2
                            focus:ring-offset-white
                            dark:focus:ring-offset-zinc-900
                        "
                    >
                        {buttonText}
                    </button>
                </div>

            </div>
        </div>
    );
}


/*

Usage:
const [dialogOpen, setDialogOpen] = useState(false);


Show it:
setDialogOpen(true);

Render:
<Dialog
    open={dialogOpen}
    title="Exaample title"
    message="khi khi khi..."
    onClose={() => setDialogOpen(false)}
/>

*/

