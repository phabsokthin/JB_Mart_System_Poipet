import { motion } from "framer-motion";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaSpinner } from "react-icons/fa"; // Importing spinner icon for loading

function ToggleStatusActive({
    onClose,
    onConfirm,
    displayName,
    isLoading,
}: {
    onClose: () => void;
    onConfirm: () => void;
    displayName: string;
    isLoading: boolean;
}) {
    return (
        <div className="fixed inset-0 top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <motion.div
                className="bg-white w-[90%] md:w-[60%] lg:w-[50%] shadow-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2 my-4 font-NotoSansKhmer">
                    <MdOutlineAddCircle className="text-xl" />
                    <h2 className="text-lg font-bold">លុបទិន្នន័យ</h2>
                </div>
                <p className="mb-6 text-lg text-gray-700 font-NotoSansKhmer">
                    គណនីនេះ
                    <span className="mx-1 font-bold text-red-500">{displayName}</span>
                    និងត្រូវបានបិទបណ្ណោះអាសន្ន?
                </p>
                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="button_only_close">
                        បោះបង់
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`button_only_submit ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading} // Disable the button when loading
                    >
                        {isLoading ? (
                            <FaSpinner className="animate-spin" /> // Show loading spinner when in progress
                        ) : (
                            "បិទ"
                        )}
                    </button>
                    {isLoading && (
                        <button type="button" className="opacity-50 cursor-not-allowed button_only_submit" disabled>
                            កំពុងបិទ...
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default ToggleStatusActive;
