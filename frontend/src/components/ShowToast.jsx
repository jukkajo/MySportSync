import { toast } from "react-toastify";

// To show custom toast with an image, title, and opt. subtitle.
/*
 image: Image url
 title: Main toast title text
 subtitle: Optional secondary text
*/
const ShowToast = ({ image, title, subtitle, options = {} }) => {
  toast(
    <div className="flex items-center space-x-3">
      {image && <img src={image} alt="Toast" className="w-10 h-10 rounded-full" />}
      <div>
        <p className="font-bold text-white">{title}</p>
        {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ShowToast;
