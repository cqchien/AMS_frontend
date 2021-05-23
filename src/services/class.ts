import request from '@/utils/request';

export type GetClassesParamsType = {
  order: string;
  page: number;
  take: number;
  q?: string;
  isFinish: boolean;
};

export async function getAllClasses(params: GetClassesParamsType): Promise<any> {
  return request('class', {
    method: 'GET',
    data: params,
  });
}
