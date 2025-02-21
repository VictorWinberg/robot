import { createContext, useContext } from 'react';

/**
 * @typedef {Object} Toast
 * @property {string} title - The title of the toast.
 * @property {string} description - The description of the toast.
 */

export const ToastContext = createContext(
  /** @type {(toast: Toast) => void} */ (null)
);

/**
 * Custom hook to access the toast context.
 *
 * @returns {(toast: Toast) => void} A function to add a toast.
 * @throws {Error} If used outside of a `ToastProvider`.
 *
 * @example
 * const setToast = useToast();
 * setToast({ title: "Success", description: "Your action was successful!" });
 */
export function useToast() {
  return useContext(ToastContext);
}
