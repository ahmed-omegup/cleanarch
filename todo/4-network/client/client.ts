import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../shared/api';
import { API } from '../../5-main/config';

const { host, port } = API;
const HOST = `http://${host}:${port}`;



export const client = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: HOST, })] });
