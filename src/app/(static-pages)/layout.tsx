export default function StaticLayout({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto max-w-xl text-justify">{children}</div>;
}
