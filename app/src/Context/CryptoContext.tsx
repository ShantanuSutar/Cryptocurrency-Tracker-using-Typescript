import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type userContextTypes = {
  currency: "INR" | "USD";
  symbol: "₹" | "$";
  setCurrency: React.Dispatch<React.SetStateAction<"INR" | "USD">>;
};

export const CryptoContext = createContext({} as userContextTypes);

export const CryptoProvider = ({ children }: Props) => {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [symbol, setSymbol] = useState<"₹" | "$">("₹");

  useEffect(() => {
    currency === "INR" ? setSymbol("₹") : setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};
