/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
