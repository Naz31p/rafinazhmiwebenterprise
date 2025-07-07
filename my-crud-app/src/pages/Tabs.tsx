import { ReactNode, createContext, useContext } from "react";

type TabsContextType = {
  currentValue: string;
  setValue: (val: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (val: string) => void;
  children: ReactNode;
}) => (
  <TabsContext.Provider value={{ currentValue: value, setValue: onValueChange }}>
    <div>{children}</div>
  </TabsContext.Provider>
);

export const TabsList = ({ children }: { children: ReactNode }) => (
  <div className="flex space-x-2 mb-4">{children}</div>
);

export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used inside Tabs');

  const { currentValue, setValue } = context;

  return (
    <button
      className={`px-4 py-2 rounded ${
        currentValue === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used inside Tabs');

  return context.currentValue === value ? <div>{children}</div> : null;
};
