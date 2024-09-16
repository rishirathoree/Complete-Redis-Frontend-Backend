import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Mail, EditIcon } from "lucide-react"
import { deleteSelectedCompanies } from "../../../../stores/slices/companies.slice";

interface RowSelectorProp {
  companies: { selected: string[] };
}

const Dock = () => {
  const dispatch = useDispatch();
  const selectedItemsRow = useSelector((state: RowSelectorProp) => state.companies.selected);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "20",
        scale: 0.1,
        visibility: "hidden",
      }}
      animate={{
        opacity: selectedItemsRow.length > 0 ? 1 : 0,
        scale: selectedItemsRow.length > 0 ? 1 : 0.1,
        y: selectedItemsRow.length > 0 ? 0 : 20,
        visibility: selectedItemsRow.length > 0 ? "visible" : "hidden",
        transition: {
          duration: 0.1,
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 20,
        }
      }}
      exit={{ opacity: 0, y: 20 }}
      className="w-min border-[1px] overflow-hidden divide-x flex items-center gap-2 shadow h-min bg-white shadow-slate-50 rounded-full gap-2 px-2 py-1 absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* <p className="whitespace-nowrap text-xs">{selectedItemsRow.length} Selected</p> */}
      <span className="flex items-center gap-2">
        <Trash2 onClick={()=>{dispatch(deleteSelectedCompanies())}} className="p-2" strokeWidth={0.8} size={32} />
        <Mail className="p-2" strokeWidth={0.8} size={32} />
        <EditIcon className="p-2" strokeWidth={0.8} size={32} />
      </span>
    </motion.div>
  );
};

export default Dock;
