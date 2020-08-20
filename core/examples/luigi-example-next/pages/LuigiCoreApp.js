import { useEffect } from 'react';

export default function LuigiApp() {
  useEffect(() => {
    require('@luigi-project/core/luigi.js');
    require('./luigi-config.js');
  }, []);

  return null;
}
