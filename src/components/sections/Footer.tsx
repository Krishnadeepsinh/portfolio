const Footer = () => {
  return (
    <footer className="relative border-t border-primary/10 px-6 py-10">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Krishnadeepsinh Chudasama
        </div>
      </div>
    </footer>
  );
};
export default Footer;
