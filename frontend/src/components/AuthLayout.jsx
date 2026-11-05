import { motion } from "framer-motion";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] overflow-hidden relative px-4 py-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      {/* decorative falling bubbles */}
      {["7 + 5", "9 × 3", "18 ÷ 6", "12 − 4"].map((t, i) => (
        <motion.div
          key={t}
          aria-hidden
          className="absolute top-0 hidden sm:flex size-16 items-center justify-center rounded-full bg-sky-400/15 text-sky-200/60 text-sm"
          style={{ left: `${8 + i * 24}%` }}
          initial={{ y: -100 }}
          animate={{ y: "110vh" }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, delay: i * 2.5, ease: "linear" }}
        >
          {t}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 p-[1.5px] rounded-3xl bg-gradient-to-b from-[#4f27d9] to-transparent shadow-[0_0_50px_-12px_rgba(79,39,217,0.3)]"
      >
        <div className="bg-[#0f121d] rounded-[calc(1.5rem-1px)] p-8 sm:p-10">
          <div className="mb-8 text-center">
            <p className="text-3xl mb-2" aria-hidden>🫧</p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
            <p className="text-gray-400 mt-2 text-sm">{subtitle}</p>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">{label}</span>
      <input
        {...props}
        className="w-full bg-[#161b2a] border border-gray-800 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
      />
    </label>
  );
}

export function ErrorBox({ children }) {
  if (!children) return null;
  return (
    <motion.p
      role="alert"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
    >
      {children}
    </motion.p>
  );
}

export function SubmitButton({ loading, children }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={loading ? {} : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-[#007bff] text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-60 disabled:cursor-wait"
    >
      {loading ? "Please wait…" : children}
    </motion.button>
  );
}
