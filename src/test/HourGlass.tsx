function HourGlassGendutPasirBesar() {
  return (
    <div className="w-full max-w-[120px] sm:max-w-[150px] flex flex-col items-center text-center h-fit xl:h-min-[300px] lg:h-min-[400px] md:h-min-[300px] sm:h-min-[300px]">
      <div className="w-full aspect-[206/300]">
        <svg
          viewBox="0 0 206 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Kerangka atas */}
          <path d="M40 10 C 60 100, 90 140, 103 150" stroke="#6B5F52" strokeWidth="4" fill="none" />
          <path d="M166 10 C 146 100, 116 140, 103 150" stroke="#6B5F52" strokeWidth="4" fill="none" />
          <line x1="40" y1="10" x2="166" y2="10" stroke="#6B5F52" strokeWidth="6" strokeLinecap="square" />

          {/* Kerangka bawah */}
          <path d="M40 290 C 60 200, 90 160, 103 150" stroke="#6B5F52" strokeWidth="4" fill="none" />
          <path d="M166 290 C 146 200, 116 160, 103 150" stroke="#6B5F52" strokeWidth="4" fill="none" />
          <line x1="40" y1="290" x2="166" y2="290" stroke="#6B5F52" strokeWidth="6" strokeLinecap="square" />

          {/* Lubang pasir */}
          <circle cx="103" cy="150" r="3" fill="#6B5F52" />

          {/* Partikel pasir besar */}
          {[0, 0.5, 1].map((delay, index) => (
            <circle key={index} r="4" fill="#D2B48C">
              <animate attributeName="cy" from="40" to="260" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values="102; 104; 103" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      <h1 className="mt-2 text-xs text-muted-foreground text-center leading-tight">
        This feature is under development
      </h1>
    </div>
  );
}

export default HourGlassGendutPasirBesar;
