import { toast } from "react-toastify";

const ShowToast = ({ image, title, subtitle, options = {} }) => {
  // Create fallback toastId, unless user provides one
  const toastId = options.toastId || `${title}-${subtitle || ""}`;

  // To prevent duplicate toasts
  if (toast.isActive(toastId)) return;

  toast(
    <div className="flex items-center space-x-3">
      {image && (
        <img
          src={image}
          alt="Toast"
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <p className="font-bold text-white">{title}</p>
        {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
      </div>
    </div>,
    {
      toastId,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 3000,
      ...options,
    }
  );
};

export default ShowToast;

