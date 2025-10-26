import { motion } from "framer-motion";

const SportTypeSelect = ({ selectedSport = "", sports = [], onSelect }) => {
  return (
    <motion.div transition={{ duration: 0.2 }}>
      <label className="block font-semibold text-gray-700 mb-1">Sport</label>
      {sports.length > 0 ? (
        <select
          value={selectedSport}
          onChange={(e) => onSelect(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 w-full text-gray-900 bg-white"
        >
          <option value="">All Sports</option>
          {sports.map(({ name, id }) => (
            <option key={id} value={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        <p className="pl-4 rounded-lg bg-gray-100 text-gray-500">No sports available</p>
      )}
    </motion.div>
  );
};

export default SportTypeSelect;

