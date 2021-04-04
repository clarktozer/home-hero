import { FormikErrors } from "formik";
import { useEffect } from "react";

export function useFocusError<T>(
    errors: FormikErrors<T>,
    isSubmitting: boolean,
    isValidating: boolean
) {
    useEffect(() => {
        if (isSubmitting && !isValidating && errors) {
            const keys = Object.keys(errors);

            if (keys.length > 0) {
                const selector = `[name=${keys[0]}]`;
                const errorElement = document.querySelector<HTMLElement>(
                    selector
                );

                if (errorElement) {
                    errorElement.focus();
                }
            }
        }
    }, [errors, isSubmitting, isValidating]);
}
