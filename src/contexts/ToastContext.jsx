import { useState } from 'react';
import PropTypes from 'prop-types';

import { ToastContext } from '../hooks/toast-hook';

const TOAST_TIMEOUT = 3000; // 3 seconds

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const addToast = (toast) => {
    const id = Date.now();
    setToast({ ...toast, id });
    setTimeout(() => setToast(null), TOAST_TIMEOUT);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toast && (
          <div
            key={toast.id}
            className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-start space-x-4 w-80 animate-slide-in"
          >
            <div className="flex-1">
              <p className="font-semibold">{toast.title}</p>
              <p className="text-sm text-gray-300">{toast.description}</p>
            </div>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
