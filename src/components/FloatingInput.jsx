function FloatingInput({ id, label, type = 'text', isTextArea = false }) {
  if (isTextArea) {
    return (
      <label className="group relative block">
        <textarea
          id={id}
          required
          rows={5}
          placeholder=" "
          data-cursor="interactive"
          className="peer min-h-[150px] w-full rounded-[24px] border border-[#d7e9fb] bg-white/85 px-5 pt-7 text-sm text-neutral-900 outline-none backdrop-blur-xl transition duration-300 placeholder:text-transparent focus:border-[#147be0] focus:bg-white focus:shadow-[0_0_0_6px_rgba(20,123,224,0.12)] sm:text-base"
        />
        <span className="pointer-events-none absolute left-5 top-5 text-sm uppercase tracking-[0.16em] text-neutral-500 transition-all duration-300 peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#147be0] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px]">
          {label}
        </span>
      </label>
    )
  }

  return (
    <label className="group relative block">
      <input
        id={id}
        type={type}
        required
        placeholder=" "
        data-cursor="interactive"
        className="peer h-16 w-full rounded-[24px] border border-[#d7e9fb] bg-white/85 px-5 pt-6 text-sm text-neutral-900 outline-none backdrop-blur-xl transition duration-300 placeholder:text-transparent focus:border-[#147be0] focus:bg-white focus:shadow-[0_0_0_6px_rgba(20,123,224,0.12)] sm:text-base"
      />
      <span className="pointer-events-none absolute left-5 top-5 text-sm uppercase tracking-[0.16em] text-neutral-500 transition-all duration-300 peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#147be0] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </span>
    </label>
  )
}

export default FloatingInput
