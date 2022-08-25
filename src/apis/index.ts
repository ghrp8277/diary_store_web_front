import store from './store';

interface Api {
  [Key: string]: string;
}

export default () => {
  const version = 'v1';
  const api: Api = {
    storeURI: `/${version}/store`,
  };

  const { storeApiModule } = store(api.storeURI);

  const apiModule = {
    storeApiModule,
  };

  return {
    apiModule,
  };
};
