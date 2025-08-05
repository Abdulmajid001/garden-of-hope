"use client"

import { useFormStatus } from "react-dom";

function UpdateButton({pendingLabel,children}) {
    // useFormStatus is used to manage the form submission state and must be used within a form context.
    // It provides information e.g pending state about the form's submission status.
    const {pending} = useFormStatus();

    return (
        <button disabled={pending} className="bg-gold-dark mb-4 px-8 py-4 text-lg sm:text-2xl rounded-full text-gold-lighter font-semibold hover:bg-gold-light hover:text-green-dark transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            {pending ? pendingLabel : children}
        </button>
    )
}

export default UpdateButton