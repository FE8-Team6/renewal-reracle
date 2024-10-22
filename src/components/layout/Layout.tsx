import Header from "@/components/Header";
import Nav from "@/components/Nav/Nav";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Nav />
    </>
  );
};
