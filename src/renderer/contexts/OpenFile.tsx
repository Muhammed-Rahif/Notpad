import { createContext, ReactNode, useState } from 'react';

export type OpenFileType = {
  fileName: string;
  filePath: string;
};

export type OpenFileContextType = {
  setOpenFile: React.Dispatch<React.SetStateAction<OpenFileType>>;
  openFile: OpenFileType;
};

export const OpenFileContext = createContext<OpenFileContextType>(
  {} as OpenFileContextType
);

function OpenFileProvider({ children }: { children: ReactNode }) {
  const [openFile, setOpenFile] = useState<OpenFileType>({} as OpenFileType);

  return (
    <OpenFileContext.Provider value={{ openFile, setOpenFile }}>
      {children}
    </OpenFileContext.Provider>
  );
}

export default OpenFileProvider;
