import logoUrl from "@/assets/logo.png";

export function Logo({ size = 40, withText = false }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoUrl}
        alt="THE NORTH GARDEN"
        width={size}
        height={size}
        className="rounded-full object-contain bg-white shadow-soft"
        style={{ width: size, height: size }}
      />
      {withText && (
        <div className="leading-tight">
          <div className="font-extrabold tracking-tight">THE NORTH GARDEN</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Public Tenders Suite
          </div>
        </div>
      )}
    </div>
  );
}