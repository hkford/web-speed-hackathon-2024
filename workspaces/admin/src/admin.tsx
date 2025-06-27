import ReactDOM from 'react-dom/client';

import { AdminApp } from './index';

const main = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(<AdminApp />);
  });

  // Service Workerは管理画面では不要なので削除
};

main().catch(console.error);