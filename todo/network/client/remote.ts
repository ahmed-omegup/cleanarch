import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/main';
import { API } from '../shared/config';

const { host, port } = API;
const HOST = `http://${host}:${port}`;

export const client = createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: HOST, })] });
