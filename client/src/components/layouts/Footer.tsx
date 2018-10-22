import * as React from "react";

export const Footer: React.SFC = () => {
  return (
    <footer className="bg-dark text-white text-center footer">
      Copyright &copy; {new Date().getFullYear()} WeConnect
    </footer>
  );
};
