import store from './store';

interface Api {
  [Key: string]: string;
}

export default () => {
  const baseUrl = 'http://192.168.0.212';
  const basePort = '3000';
  const version = 'v1';
  const apis: Api = {
    storeURL: `${baseUrl}:${basePort}/${version}/store`,
  };

  const { storeApiModule } = store(apis.storeURL);

  const apiModule = {
    storeApiModule,
  };

  return {
    apiModule,
  };
};
