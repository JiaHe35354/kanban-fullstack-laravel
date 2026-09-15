export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 overflow-y-auto bg-[var(--light-grey)] py-[2rem]">
            <div className="w-[48rem] max-w-[90%] rounded-xl bg-white p-[2rem] shadow-[0_1rem_2rem_rgba(130,143,163,0.2)] sm:p-[2.4rem]">
                {children}
            </div>
        </div>
    );
}
